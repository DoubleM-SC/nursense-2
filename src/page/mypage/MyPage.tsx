import React, { useState, useEffect } from "react";
import axiosInstance from "../../apis/axiosInstance"; // axiosInstance 사용
import Header from "../../layouts/Header";
import ReadyModal from "../../components/modal/ReadyModal";
import TabMenu from "../../components/mypage/TabMenu";
import Footer from "../../layouts/Footer";
import Cookies from "universal-cookie";
import ChangePw from "../../components/ChangePw";
import { useLanguage } from "../../context/LanguageContext";
import CourseList from "../../components/mypage/CourseList";
import TabMenuNoCourse from "../../components/mypage/TabMenuNoCourse";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import LoadingSpinner from "../../components/LoadingSpineer";
import * as S from "./MyPage.style";

interface UserData {
  name: string;
  school: string;
  department: string;
  student_id: string;
}

const MyPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasCourses, setHasCourses] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isChangePwModalVisible, setChangePwModalVisible] =
    useState<boolean>(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState<boolean>(false);
  const cookies = new Cookies();
  const userId = cookies.get("id");
  let navigate = useNavigate();
  const { selectedLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage);
  };

  const handleInfoUpdateClick = () => {
    navigate("/updateinfo");
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

  const fetchUserData = async () => {
    console.log("fetchUserData 호출됨");
    try {
      const response = await axiosInstance.get(
        `https://www.neusenseback.com/api/get/nursense/increase/${userId}`
        // options
      );
      console.log("mypage의 increase API", response.data);
      if (response.status === 200 && response.data.success) {
        console.log("유저정보 increase 성공", response.data);
        setUserData(response.data.response);
      } else {
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("fetchUserData 오류:", error);
      setError("데이터를 불러오는 도중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get(
        "https://www.neusenseback.com/student/enrolled-courses"
        // options
      );

      if (response.status === 200 && response.data.success) {
        if (response.data.response && response.data.response.length > 0) {
          setHasCourses(true);
        } else {
          setHasCourses(false);
        }
      } else {
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      setError("데이터를 불러오는 도중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchCourses();
  }, [enrollmentSuccess]);

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <S.MyPageContainer>
        <S.MyPageWrapper>
          <Header onLanguageChange={handleLanguageChange} />
          <S.MyPageInfoWrapper>
            <S.MyPageInfo>
              <p>
                {selectedLanguage === "ko"
                  ? "Nursense 마이페이지"
                  : "Nursense MyPage"}
              </p>
              <S.MyPageName>
                <span>{userData?.name || "Guest"}</span>
                <span> {selectedLanguage === "ko" ? " 님" : ""}</span>
                <span>
                  {selectedLanguage === "ko" ? " 반갑습니다 " : "Welcome."}
                </span>
              </S.MyPageName>
              <S.MyPageSchool>
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
                    ? "학번정보"
                    : "Student ID Information"}{" "}
                  : <span>{userData?.student_id || "학번 정보 없음"}</span>
                </p>
              </S.MyPageSchool>
            </S.MyPageInfo>
            <S.MyPageButtonWrapper>
              <button onClick={handleInfoUpdateClick}>
                {selectedLanguage === "ko"
                  ? "나의 정보 수정"
                  : "Update Information"}
              </button>
            </S.MyPageButtonWrapper>
            <S.ChangePwButton onClick={handleChangePwClick}>
              {selectedLanguage === "ko" ? "비밀번호 변경" : "Change password"}
            </S.ChangePwButton>
          </S.MyPageInfoWrapper>
          {hasCourses ? (
            <TabMenu enrollmentSuccess={enrollmentSuccess} />
          ) : (
            <TabMenuNoCourse />
          )}
          <CourseList setEnrollmentSuccess={setEnrollmentSuccess} />
          <Footer />
        </S.MyPageWrapper>
      </S.MyPageContainer>
      {isModalVisible && <ReadyModal onClose={handleModalClose} />}
      {isChangePwModalVisible && (
        <ChangePw onClose={handleChangePwModalClose} />
      )}
    </>
  );
};

export default MyPage;
