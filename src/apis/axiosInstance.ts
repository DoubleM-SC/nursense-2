import axios from "axios";
import { refreshAccessToken } from "../refreshToken";
import Cookies from "universal-cookie";
import store from "../store/store";
import { logout } from "../store/actions";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: "https://www.neusenseback.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      console.log(`호출 부: ${config.headers["Authorization"]}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(`에러에러: ${error.response.data.err}`);

    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        cookies.set("accessToken", newAccessToken, { path: "/" });
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        console.log(`리프레쉬 짱짱맨: ${newAccessToken}`);
        console.log(`리프레쉬 리퀘스트: ${originalRequest.headers}`);

        return axiosInstance(originalRequest);
      } catch (e) {
        console.log("리프레쉬 짱짱맨2");
        console.log(`토큰 갱신 오류 URL: ${originalRequest.url}`);
        console.log(`토큰 갱신 오류 헤더쓰: ${originalRequest.headers}`);
        console.error("토큰 갱신 오류:", e);
        store.dispatch(logout());
        window.location.href = "/login";
        window.alert("세션이 만료되었으므로 다시 로그인해주시기 바랍니다.");
        return Promise.reject(error);
      }
    } else if (error.response && error.response.status === 401) {
      store.dispatch(logout());
      // window.alert("세션이 만료되었으므로 다시 로그인해주시기 바랍니다.");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
