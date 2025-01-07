import axios from "axios";
import Cookies from "universal-cookie";
import { logout } from "./store/actions";
import store from "./store/store";
import axiosInstance from "./apis/axiosInstance";

const cookies = new Cookies();

export const refreshAccessToken = async (): Promise<string> => {
  console.log("Refresh Method");
  const refreshToken = cookies.get("refreshToken");

  if (!refreshToken) {
    store.dispatch(logout());
    throw new Error("리프레시 토큰이 없습니다.");
  }

  console.log(`refresh: ${refreshToken}`);

  const response = await axios.get(
    "https://www.neusenseback.com/api/user/refresh",
    {
      headers: {
        Authorization: `Bearer ${cookies.get("accessToken")}`,
        "x-refresh-token": refreshToken,
        Accept: "application/json",
      },
    }
  );
  console.log("리프레시 토큰 API 호출 완료");
  const { accessToken } = response.data.response;
  // cookies.set("refreshToken", newRefreshToken, { path: "/" }); //바뀐 부분
  return accessToken;
};
