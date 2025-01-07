import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getTokenFromCookie = (name: string): string | null | boolean => {
  const token = cookies.get(name);
  console.log(`쿠키에서 가져온 ${name}:`, token);
  if (!token) {
    return null;
  }
  if (name === "professor") {
    return token === true;
  }
  return token;
};

export const setTokenCookie = (
  accessToken: string,
  refreshToken: string,
  nickname: string
): void => {
  console.log("setTokenCookie 호출됨");
  console.log("전달받은 Access Token:", accessToken);
  console.log("전달받은 Refresh Token:", refreshToken);

  cookies.set("accessToken", accessToken, {
    path: "/",
    secure: true,
    sameSite: "strict",
  });
  cookies.set("refreshToken", refreshToken, {
    path: "/",
    secure: true,
    sameSite: "strict",
  });
  cookies.set("nickname", nickname, {
    path: "/",
    secure: true,
    sameSite: "strict",
  });
};

export const removeTokenCookie = (): void => {
  cookies.remove("accessToken", { path: "/" });
  cookies.remove("refreshToken", { path: "/" });
};

interface UserData {
  token: string;
  refreshToken: string;
  id: string;
  name: string;
  professor: boolean;
  nickname: string;
}

export const getUserDataFromCookie = (): UserData | null => {
  const token = getTokenFromCookie("accessToken") as string;
  const refreshToken = getTokenFromCookie("refreshToken") as string;
  const id = getTokenFromCookie("id") as string;
  const name = getTokenFromCookie("name") as string;
  const nickname = getTokenFromCookie("nickname") as string;
  const professor = getTokenFromCookie("professor") as boolean;

  console.log("쿠키에서 유저 데이터 가져오기: ", {
    token,
    refreshToken,
    id,
    name,
    professor,
    nickname,
  });

  if (token && refreshToken && id && name && nickname) {
    return { token, refreshToken, id, name, professor, nickname };
  } else {
    return null;
  }
};
