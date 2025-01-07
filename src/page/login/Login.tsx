import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/actions";
import Header from "../../layouts/Header";
import FindId from "../../components/FindId";
import FindPw from "../../components/FindPw";
import LoginFooter from "../../layouts/LoginFooter";
import IsPhoneNumModal from "../../components/modal/isPhoneNumModal";
import ErrorIDModal from "../../components/modal/ErrorIDmodal";
import ErrorPWModal from "../../components/modal/ErrorPWModal";
import { useLanguage } from "../../context/LanguageContext";
import { setTokenCookie } from "../cookies";
import * as S from "./Login.style";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedLanguage, changeLanguage } = useLanguage();

  const [loginData, setLoginData] = useState({
    id: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFindIdModalOpen, setFindIdModalOpen] = useState(false);
  const [isFindPwModalOpen, setFindPwModalOpen] = useState(false);
  const [isPhoneNumModalOpen, setPhoneNumModalOpen] = useState(false);
  const [isErrorIDModalOpen, setErrorIDModalOpen] = useState(false);
  const [isErrorPWModalOpen, setErrorPWModalOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://www.neusenseback.com/login",
        loginData
      );
      if (response.status === 200 && response.data.success) {
        console.log("로그인 성공, 응답 데이터:", response.data);
        dispatch(loginSuccess(response.data));

        setTokenCookie(
          response.data.token,
          response.data.refreshToke,
          response.data.nickname
        );

        console.log("Access Token 저장:", response.data.token);
        console.log("Refresh Token 저장:", response.data.refreshToken);

        if (!response.data.professor && !response.data.phone_number) {
          setPhoneNumModalOpen(true);
        } else {
          navigate("/");
        }
      } else {
        if (response.data.error === "Invalid ID") {
          setErrorIDModalOpen(true);
        } else if (response.data.error === "Invalid Password") {
          setErrorPWModalOpen(true);
        } else {
          console.error("로그인 실패:", response.data);
        }
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.error("로그인 요청 오류:", error);
          setErrorPWModalOpen(true);
        } else if (error.response?.status === 404) {
          console.error("로그인 요청 오류:", error);
          setErrorIDModalOpen(true);
        } else {
          console.error("기타 오류:", error);
        }
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <S.LoginContainer>
      <Header onLanguageChange={changeLanguage} />
      <S.LoginWrapper>
        <S.LoginLogoWrapper>
          <img
            src={`${process.env.PUBLIC_URL}/img/registerLogo.png`}
            alt="logo"
          />
          <p>
            {selectedLanguage === "ko"
              ? "Nursense에 로그인하여 더 많은 서비스를 경험하세요."
              : "Log in to Nursense to experience more services."}
          </p>
        </S.LoginLogoWrapper>
        <form onSubmit={handleLogin}>
          <label>
            <input
              type="text"
              name="id"
              value={loginData.id}
              onChange={handleChange}
              placeholder="아이디 입력"
            />
          </label>
          <label>
            <S.PasswordWrapper>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="비밀번호 입력"
              />
              <S.PasswordToggle
                src={`${process.env.PUBLIC_URL}/img/${
                  showPassword ? "eyeOpen.png" : "eyeClose.png"
                }`}
                alt="Show Password"
                onClick={() => setShowPassword(!showPassword)}
              />
            </S.PasswordWrapper>
          </label>
          <button type="submit">로그인</button>
        </form>
        <S.LoginSearchWrapper>
          <span onClick={() => setFindIdModalOpen(true)}>아이디 찾기</span>
          <span onClick={() => setFindPwModalOpen(true)}>비밀번호 찾기</span>
          <span onClick={() => navigate("/register")}>회원가입</span>
        </S.LoginSearchWrapper>
      </S.LoginWrapper>
      {isFindIdModalOpen && (
        <FindId closeModal={() => setFindIdModalOpen(false)} />
      )}
      {isFindPwModalOpen && (
        <FindPw closeModal={() => setFindPwModalOpen(false)} />
      )}
      {isPhoneNumModalOpen && (
        <IsPhoneNumModal onClose={() => setPhoneNumModalOpen(false)} />
      )}
      {isErrorIDModalOpen && (
        <ErrorIDModal closeModal={() => setErrorIDModalOpen(false)} />
      )}
      {isErrorPWModalOpen && (
        <ErrorPWModal closeModal={() => setErrorPWModalOpen(false)} />
      )}
      <LoginFooter />
    </S.LoginContainer>
  );
};

export default Login;
