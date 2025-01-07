import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { loginSuccess, logout, setUserData } from "../store/actions";
import { getUserDataFromCookie } from "../page/cookies";
import ReadyModal from "../components/modal/ReadyModal";
import { useLanguage } from "../context/LanguageContext";
import { RootState } from "../store/store"; // RootState 타입을 가져옵니다.
import axiosInstance from "../apis/axiosInstance";

const HeaderContainer = styled.div`
  width: 90%;
  margin: auto;

  @media only screen and (max-width: 600px) {
    width: 95%;
    margin: auto;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 6vh;
  border-radius: 25px;
  margin: auto;
  margin-top: 2%;

  @media only screen and (max-width: 600px) {
    flex-direction: column; // 모바일에서 수직 정렬
    height: auto; // 높이 자동 조정
    padding: 10px 0; // 패딩 추가
  }
`;

const HeaderMenu = styled.div`
  display: flex;
  font-family: "Pretendard-regular";
  font-weight: bold;
  font-size: 1.1rem;

  span {
    margin-left: 40px;
    margin-right: 40px;
    cursor: pointer;

    @media only screen and (max-width: 600px) {
      margin: 10px 0; // 모바일에서 수직 간격 조정
    }

    &:hover {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 1700px) {
    font-size: 1rem;
  }

  @media only screen and (max-width: 600px) {
    font-size: 0.9rem; // 모바일에서 폰트 크기 조정
  }
`;

const HeaderLogo = styled.img`
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    height: 30px; // 모바일에서 로고 크기 조정
    width: auto;
  }
`;

const HeaderLine = styled.div`
  border-right: 2px solid #e6e6e6;
`;

const MainLoginWrapper = styled.div`
  font-size: 1.1rem;
  font-family: "Pretendard-regular";

  @media screen and (max-width: 1700px) {
    font-size: 1rem;
  }

  .loginText:hover {
    cursor: pointer;
  }
`;

const LoggedHeaderWrapper = styled.div`
  span:nth-child(3) {
    padding-right: 15px;
    border-right: 1px solid #e6e6e6;
  }

  span:nth-child(4) {
    margin-left: 15px;
  }

  .headerUserName {
    color: #078675;
  }

  .headerMyPageText:hover {
    cursor: pointer;
  }

  span:nth-child(4):hover {
    cursor: pointer;
  }
`;

const LanguageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  height: 4vh;
  margin-top: 2%;

  @media only screen and (max-width: 600px) {
    justify-content: center; // 모바일에서 중앙 정렬
  }

  span:hover {
    cursor: pointer;
  }
`;

const LanguageMenu = styled.div`
  display: flex;

  img {
    width: 40%;
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.1);
    margin-left: 50%;
    cursor: pointer;

    &:hover {
      cursor: pointer;
    }

    @media only screen and (max-width: 600px) {
      width: 30%; // 모바일에서 이미지 크기 조정
      margin-left: 0;
    }
  }
`;

interface HeaderProps {
  onLanguageChange: (newLanguage: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onLanguageChange }) => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.user);
  const professor = useSelector((state: RootState) => state.professor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [isReadyModalOpen, setIsReadyModalOpen] = useState<boolean>(false);
  const { selectedLanguage } = useLanguage();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false);

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const handleLanguageChange = (newLanguage: string) => {
    onLanguageChange(newLanguage);
    setIsLanguageMenuOpen(false);
  };

  const openReadyModal = () => {
    setIsReadyModalOpen(true);
  };

  const closeReadyModal = () => {
    setIsReadyModalOpen(false);
  };

  const goToMyPage = () => {
    if (professor) {
      navigate("/professorpage");
    } else {
      navigate("/mypage");
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToCurr = () => {
    navigate("/curriculum/learn");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToAbout = () => {
    navigate("/about");
  };

  const goToCustomer = () => {
    navigate("/customer");
  };

  const goToAi = () => {
    navigate("/nursemind");
  };

  const goToDw = () => {
    navigate("/download");
    window.location.href =
      "https://www.dropbox.com/scl/fi/bst2tebaaac59vcdpzrdc/NursenseLauncher.exe?rlkey=8n0ha01f19jsolxmdi8bmwogu&dl=1";
  };

  const removeCookies = () => {
    cookies.remove("token");
    cookies.remove("id");
    cookies.remove("name");
    cookies.remove("professor");
    // cookies.remove("refreshToken");
  };

  const handleLogout = async () => {
    try {
      const token = cookies.get("token");
      const response = await axiosInstance.post(
        "https://www.neusenseback.com/logout",
        { id: user?.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("로그아웃 response", response);
      if (response.status === 200 && response.data.success) {
        console.log("로그아웃도미");
      } else {
        console.error("로그아웃 실패");
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    } finally {
      console.log("(finally)로그아웃1");
      removeCookies();
      dispatch(logout());
      navigate("/login");
      console.log("(finally)로그아웃2");
    }
  };

  useEffect(() => {
    const userDataFromCookie = getUserDataFromCookie();
    if (userDataFromCookie) {
      console.log("professor을 위해.. 쿠키 유저데이터:", userDataFromCookie);
      dispatch(setUserData(userDataFromCookie));
    }
  }, [dispatch]);

  return (
    <>
      <HeaderContainer>
        {!isAuthenticated && <div></div>}
        <LanguageWrapper>
          <span className="languageText" onClick={toggleLanguageMenu}>
            Language
          </span>
          {isLanguageMenuOpen && (
            <LanguageMenu>
              <div
                onClick={() => handleLanguageChange("ko")}
                className="koreanWrapper"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/img/korea.png`}
                  alt="img"
                />
              </div>
              <div className="usaWrapper">
                <div onClick={() => handleLanguageChange("en")}>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/usa.png`}
                    alt="img"
                  />
                </div>
              </div>
            </LanguageMenu>
          )}
        </LanguageWrapper>
        <HeaderWrapper>
          <HeaderLogo
            src={`${process.env.PUBLIC_URL}/img/nsLogo.png`}
            className="headerLogo"
            alt="headerLogo"
            onClick={goToHome}
          />
          <HeaderMenu>
            <HeaderLine className="headerIR">
              <span onClick={goToAbout}>
                {selectedLanguage === "ko" ? "Nursense 소개" : "About"}
              </span>
            </HeaderLine>
            <HeaderLine className="headerCurr">
              <span onClick={goToCurr}>
                {selectedLanguage === "ko" ? "사전학습" : "Pre-learning"}
              </span>
            </HeaderLine>
            {isAuthenticated && (
              <HeaderLine className="headerDownLoad">
                <span onClick={goToDw}>
                  {selectedLanguage === "ko" ? "다운로드" : "Download"}
                </span>
              </HeaderLine>
            )}
            <HeaderLine className="headerContact">
              <span onClick={goToAi}>
                {selectedLanguage === "ko" ? "널스 멘토" : "Nurse Mento"}
              </span>
            </HeaderLine>
            <HeaderLine className="headerContact">
              <span onClick={openReadyModal}>
                {selectedLanguage === "ko"
                  ? "Nursense 미디어"
                  : "Nursense Media"}
              </span>
            </HeaderLine>
            <div className="headerContact">
              <span onClick={goToCustomer}>
                {selectedLanguage === "ko" ? "고객센터" : "Contact"}
              </span>
            </div>
          </HeaderMenu>
          <MainLoginWrapper>
            {isAuthenticated &&
            user.name !== null &&
            user.name !== undefined ? (
              <LoggedHeaderWrapper>
                <span className="headerUserName">{`${user?.name}`}</span>
                <span> {selectedLanguage === "ko" ? "님" : "'s"} </span>
                <span className="headerMyPageText" onClick={goToMyPage}>
                  {selectedLanguage === "ko"
                    ? professor
                      ? "교수페이지"
                      : "마이페이지"
                    : professor
                    ? "Professor Page"
                    : "Mypage"}
                </span>
                <span
                  className="headerLogOutText"
                  onClick={() => {
                    handleLogout();
                    goToLogin();
                  }}
                >
                  {selectedLanguage === "ko" ? "로그아웃" : "Logout"}
                </span>
              </LoggedHeaderWrapper>
            ) : (
              <span className="loginText" onClick={goToLogin}>
                {selectedLanguage === "ko" ? "로그인" : "Login"}
              </span>
            )}
          </MainLoginWrapper>
        </HeaderWrapper>
      </HeaderContainer>
      {isReadyModalOpen && <ReadyModal onClose={closeReadyModal} />}
    </>
  );
};

export default Header;