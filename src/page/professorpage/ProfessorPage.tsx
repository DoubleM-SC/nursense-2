import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../layouts/Header";
import ReadyModal from "../../components/modal/ReadyModal";
import Footer from "../../layouts/Footer";
import Cookies from "universal-cookie";
import ChangePw from "../../components/ChangePw";
import { useLanguage } from "../../context/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axiosInstance from "../../apis/axiosInstance";
import LoadingSpinner from "../../components/LoadingSpineer";
import * as S from "./ProfessorPage.style";

interface UserData {
  name: string;
  school: string;
  department: string;
}

const ProfessorPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isChangePwModalVisible, setChangePwModalVisible] =
    useState<boolean>(false);
  const cookies = new Cookies();
  const userId = cookies.get("id");
  const token = cookies.get("token");
  const refreshToken = cookies.get("refreshToken");
  const { selectedLanguage, changeLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage);
  };

  const handleInfoUpdateClick = () => {
    if (location.pathname.includes("opening-course")) {
      navigate("/professorpage");
    } else {
      navigate("/professorpage/opening-course");
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleChangePwClick = () => {
    setChangePwModalVisible(true);
  };

  const handleChangePwModalClose = () => {
    setChangePwModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `https://www.neusenseback.com/api/get/nursense/increase/${userId}`
          // ,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     "x-refresh-token": refreshToken,
          //   },
          // }
        );

        if (response.status === 200 && response.data.success) {
          setUserData(response.data.response);
        } else {
          setError("데이터를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        setError("데이터를 불러오는 도중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, token, refreshToken]);

  const getButtonLabel = (): string => {
    if (location.pathname.includes("opening-course")) {
      return selectedLanguage === "ko" ? "수강관리" : "Manage Courses";
    }
    return selectedLanguage === "ko" ? "강의 개설" : "Create Course";
  };

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <S.ProfessorPageContainer>
        <S.ProfessorPageWrapper>
          <Header onLanguageChange={handleLanguageChange} />
          <S.ProfessorPageInfoWrapper>
            <S.ProfessorPageInfo>
              <p>
                {selectedLanguage === "ko"
                  ? "Nursense 교수페이지"
                  : "Nursense MyPage"}
              </p>
              <S.ProfessorPageName>
                <span>{userData?.name || "Guest"}</span>
                <span> {selectedLanguage === "ko" ? "님 " : ""}</span>
                <span>
                  {selectedLanguage === "ko" ? " 반갑습니다 " : "Welcome."}
                </span>
              </S.ProfessorPageName>
              <S.ProfessorPageSchool>
                <p>
                  {selectedLanguage === "ko"
                    ? "학교정보"
                    : "School Information"}{" "}
                  : <span>{userData?.school || "학교 정보 없음"}</span>
                </p>
                <p>
                  {selectedLanguage === "ko"
                    ? "학과정보"
                    : "Department Information"}{" "}
                  : <span>{userData?.department || "학과 정보 없음"}</span>
                </p>
                <p>
                  {selectedLanguage === "ko"
                    ? "학번정보 :"
                    : "Student ID Information"}{" "}
                  <span>교수</span>
                </p>
              </S.ProfessorPageSchool>
            </S.ProfessorPageInfo>
            <S.ProfessorPageButtonWrapper>
              <button onClick={handleChangePwClick}>
                {selectedLanguage === "ko"
                  ? "비밀번호 수정"
                  : "Update Information"}
              </button>
            </S.ProfessorPageButtonWrapper>
            <S.ChangePwButton onClick={handleInfoUpdateClick}>
              {getButtonLabel()}
            </S.ChangePwButton>
          </S.ProfessorPageInfoWrapper>
          <Outlet />
          <Footer />
        </S.ProfessorPageWrapper>
      </S.ProfessorPageContainer>
      {isModalVisible && <ReadyModal onClose={handleModalClose} />}
      {isChangePwModalVisible && (
        <ChangePw onClose={handleChangePwModalClose} />
      )}
    </>
  );
};
export default ProfessorPage;
