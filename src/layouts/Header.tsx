import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { loginSuccess, logout, setUserData } from "../store/actions";
import { getUserDataFromCookie } from "../page/cookies";
import ReadyModal from "../components/modal/ReadyModal";
import { useLanguage } from "../context/LanguageContext";
import { RootState } from "../store/store";
import axiosInstance from "../apis/axiosInstance";

const HeaderContainer = styled.div`
  width: 90%;
  margin: auto;

  @media only screen and (max-width: 768px) {
    width: 95%;
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
  padding: 0 20px;
  position: relative;

  @media only screen and (max-width: 768px) {
    justify-content: space-between;
    padding: 0;
  }
`;

const HeaderMenu = styled.div`
  display: flex;
  font-family: "Pretendard-regular";
  font-weight: bold;
  font-size: 1.1rem;

  @media only screen and (max-width: 768px) {
    display: none;
  }

  span {
    margin: 0 20px;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #078675;
    }
  }
`;

const HeaderLogo = styled.img`
  height: 30px;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    height: 30%;
    margin-left: 20px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #333;

  @media only screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Drawer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 280px;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 20px;
  display: none;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const DrawerOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const DrawerMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  a {
    font-family: "Pretendard-regular";
    font-size: 1.1rem;
    color: #333;
    text-decoration: none;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    transition: color 0.2s ease;

    &:hover {
      color: #078675;
    }
  }
`;

const UserSection = styled.div`
  margin-top: auto;
  padding: 20px 0;
  border-top: 1px solid #eee;
  
  .userName {
    color: #078675;
    font-weight: bold;
  }
`;

const LanguageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 0;
  gap: 10px;

  span {
    cursor: pointer;
  }
`;

const LanguageMenu = styled.div`
  display: flex;
  gap: 10px;

  img {
    width: 30px;
    height: 20px;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

interface HeaderProps {
  onLanguageChange: (newLanguage: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onLanguageChange }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.isAuthenticated);
  const user = useSelector((state: RootState) => state.user);
  const professor = useSelector((state: RootState) => state.professor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [isReadyModalOpen, setIsReadyModalOpen] = useState(false);
  const { selectedLanguage } = useLanguage();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const MenuItem = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => (
    <a onClick={() => { onClick(); setIsDrawerOpen(false); }}>
      {children}
    </a>
  );

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

  const removeCookies = () => {
    const cookies = new Cookies();
    cookies.remove("token");
    cookies.remove("id");
    cookies.remove("name");
    cookies.remove("professor");
  };

  useEffect(() => {
    const userDataFromCookie = getUserDataFromCookie();
    if (userDataFromCookie) {
      console.log("professor을 위해.. 쿠키 유저데이터:", userDataFromCookie);
      dispatch(setUserData(userDataFromCookie));
    }
  }, [dispatch]);

  return (
    <HeaderContainer>
      <LanguageWrapper>
        <span>Language</span>
        <LanguageMenu>
          <img
            src={`${process.env.PUBLIC_URL}/img/korea.png`}
            alt="Korean"
            onClick={() => onLanguageChange("ko")}
          />
          <img
            src={`${process.env.PUBLIC_URL}/img/usa.png`}
            alt="English"
            onClick={() => onLanguageChange("en")}
          />
        </LanguageMenu>
      </LanguageWrapper>
      <HeaderWrapper>
        <HeaderLogo
          src={`${process.env.PUBLIC_URL}/img/nsLogo.png`}
          alt="headerLogo"
          onClick={() => navigate("/")}
        />
        
        <HeaderMenu>
          <span onClick={() => navigate("/about")}>
            {selectedLanguage === "ko" ? "Nursense 소개" : "About"}
          </span>
          <span onClick={() => navigate("/curriculum/learn")}>
            {selectedLanguage === "ko" ? "사전학습" : "Pre-learning"}
          </span>
          {isAuthenticated && (
            <span onClick={() => navigate("/download")}>
              {selectedLanguage === "ko" ? "다운로드" : "Download"}
            </span>
          )}
          <span onClick={() => navigate("/nursemind")}>
            {selectedLanguage === "ko" ? "널스 멘토" : "Nurse Mento"}
          </span>
          <span onClick={() => setIsReadyModalOpen(true)}>
            {selectedLanguage === "ko" ? "Nursense 미디어" : "Nursense Media"}
          </span>
          <span onClick={() => navigate("/customer")}>
            {selectedLanguage === "ko" ? "고객센터" : "Contact"}
          </span>
          {isAuthenticated ? (
            <span onClick={handleLogout}>
              {selectedLanguage === "ko" ? "로그아웃" : "Logout"}
            </span>
          ) : (
            <span onClick={() => navigate("/login")}>
              {selectedLanguage === "ko" ? "로그인" : "Login"}
            </span>
          )}
        </HeaderMenu>

        <MobileMenuButton onClick={toggleDrawer}>
          <Menu size={24} />
        </MobileMenuButton>

        <AnimatePresence>
          {isDrawerOpen && (
            <>
              <DrawerOverlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDrawerOpen(false)}
              />
              <Drawer
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <DrawerHeader>
                  <HeaderLogo
                    src={`${process.env.PUBLIC_URL}/img/nsLogo.png`}
                    alt="headerLogo"
                    onClick={() => { navigate("/"); setIsDrawerOpen(false); }}
                  />
                  <button onClick={() => setIsDrawerOpen(false)}>
                    <X size={24} />
                  </button>
                </DrawerHeader>

                <DrawerMenu>
                  <MenuItem onClick={() => navigate("/about")}>
                    {selectedLanguage === "ko" ? "Nursense 소개" : "About"}
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/curriculum/learn")}>
                    {selectedLanguage === "ko" ? "사전학습" : "Pre-learning"}
                  </MenuItem>
                  {isAuthenticated && (
                    <MenuItem onClick={() => navigate("/download")}>
                      {selectedLanguage === "ko" ? "다운로드" : "Download"}
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => navigate("/nursemind")}>
                    {selectedLanguage === "ko" ? "널스 멘토" : "Nurse Mento"}
                  </MenuItem>
                  <MenuItem onClick={() => setIsReadyModalOpen(true)}>
                    {selectedLanguage === "ko" ? "Nursense 미디어" : "Nursense Media"}
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/customer")}>
                    {selectedLanguage === "ko" ? "고객센터" : "Contact"}
                  </MenuItem>
                </DrawerMenu>

                <UserSection>
                  {isAuthenticated && user.name ? (
                    <>
                      <p>
                        <span className="userName">{user.name}</span>
                        {selectedLanguage === "ko" ? "님" : "'s"}
                      </p>
                      <MenuItem onClick={() => navigate(professor ? "/professorpage" : "/mypage")}>
                        {selectedLanguage === "ko"
                          ? professor ? "교수페이지" : "마이페이지"
                          : professor ? "Professor Page" : "Mypage"}
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        {selectedLanguage === "ko" ? "로그아웃" : "Logout"}
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem onClick={() => navigate("/login")}>
                      {selectedLanguage === "ko" ? "로그인" : "Login"}
                    </MenuItem>
                  )}
                </UserSection>
              </Drawer>
            </>
          )}
        </AnimatePresence>
      </HeaderWrapper>
      {isReadyModalOpen && <ReadyModal onClose={() => setIsReadyModalOpen(false)} />}
    </HeaderContainer>
  );
};

export default Header;