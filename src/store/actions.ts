import Cookies from "universal-cookie";

export interface UserData {
  token: string;
  refreshToken: string | null;
  id: string | null;
  name: string | null;
  professor: boolean;
}

export const login = (userData: UserData) => ({
  type: "LOGIN",
  payload: userData,
});

export const logout = () => {
  const cookies = new Cookies();
  cookies.remove("token");
  cookies.remove("refreshToken");
  cookies.remove("id");
  cookies.remove("name");
  cookies.remove("professor");
  return {
    type: "LOGOUT",
  };
};

export const setUserData = (userData: UserData) => ({
  type: "SET_USER_DATA",
  payload: userData,
});

const cookies = new Cookies();

export const loginSuccess = (userData: UserData) => {
  const { token, id, name, professor, refreshToken } = userData;

  cookies.set("token", token, { path: "/" });
  if (refreshToken) {
    cookies.set("refreshToken", refreshToken, { path: "/" });
  }
  if (id) {
    cookies.set("id", id, { path: "/" });
  }
  if (name) {
    cookies.set("name", name, { path: "/" });
  }
  if (professor) {
    cookies.set("professor", professor, { path: "/" });
  }

  return {
    type: "LOGIN_SUCCESS",
    payload: { token, id, name, professor, refreshToken }, //수정된 부분
  };
};
