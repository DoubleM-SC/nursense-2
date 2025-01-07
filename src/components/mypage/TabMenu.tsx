import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosInstance";
import CircularProgress from "../CircularProgress";
import Cookies from "universal-cookie";
import { useLanguage } from "../../context/LanguageContext";
import { refreshAccessToken } from "../../refreshToken";
import styled from "styled-components";

interface Course {
  course_name: string;
  completion_rate: number;
  last_update: string;
  student_name: string;
}

interface TabMenuProps {
  enrollmentSuccess: boolean;
}

const TabMenu: React.FC<TabMenuProps> = ({ enrollmentSuccess }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [userData, setUserData] = useState<Course[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const cookies = new Cookies();
  const userId = cookies.get("id");
  const token = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  const { selectedLanguage } = useLanguage();

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const [myCourses, setMyCourses] = useState<Course[]>([]);

  const contents = [{ ko: "나의 학습 현황", en: "My Learning Status" }];

  const contentsTitle = [
    {
      ko: "욕창 관리부터 치료까지 메타버스로 진행하는 예비 의료 실습 콘텐츠",
      en: "Pre-medical practice contents from pressure ulcer management to treatment in the metaverse",
    },
    {
      ko: "당뇨 관리부터 치료까지 메타버스로 진행하는 예비 의료 실습 콘텐츠",
      en: "Pre-medical practice contents from diabetes management to treatment in the metaverse",
    },
    {
      ko: "유치도뇨 관리부터 치료까지 메타버스로 진행하는 예비 의료 실습 콘텐츠",
      en: "Pre-medical practice contents from pediatric urology management to treatment in the metaverse",
    },
    {
      ko: "단순도뇨 관리부터 치료까지 메타버스로 진행하는 예비 의료 실습 콘텐츠",
      en: "Pre-medical practice contents from simple urology management to treatment in the metaverse",
    },
    {
      ko: "정맥주사 관리부터 치료까지 메타버스로 진행하는 예비 의료 실습 콘텐츠",
      en: "Pre-medical practice contents from intravenous injection management to treatment in the metaverse",
    },
    {
      ko: "근육주사 관리부터 치료까지 메타버스로 진행하는 예비 의료 실습 콘텐츠",
      en: "Pre-medical practice contents from intramuscular injection management to treatment in the metaverse",
    },
  ];

  const fetchCourses = async () => {
    const response = await axiosInstance.get(
      "https://www.neusenseback.com/student/enrolled-courses"
    );
    console.log("신청한 강의", response.data);
    if (response.status === 200 && response.data.success) {
      setMyCourses(response.data.response);
      setUserData(response.data.response);
    } else {
      setError("데이터를 불러오는 데 실패했습니다.");
    }
    // } catch (error: any) {
    //   console.error("API 호출 오류:", error);
    //   // if (error.response && error.response.status === 403) {
    //   //   try {
    //   //     await fetchCourses();
    //   //   } catch (refreshError) {
    //   //     console.error("토큰 갱신 오류:", refreshError);
    //   //     setError("데이터를 불러오는 도중 오류가 발생했습니다.");
    //   //   }
    //   // } else {
    //   //   setError("데이터를 불러오는 도중 오류가 발생했습니다.");
    //   // }
    // } finally {
    //   setIsLoading(false);
    // }
  };
  useEffect(() => {
    fetchCourses();
  }, [token, enrollmentSuccess]);

  const openLauncher = () => {
    const launcherURL = `doublemlauncher://nursenselauncher?1?${userId}`;
    window.location.href = launcherURL;
  };

  return (
    <>
      <TabMenuWrapper>
        <TabMenuContainer>
          {myCourses.length > 0 ? (
            myCourses.map((myCourse, index) => (
              <TabMenuItem
                key={index}
                active={activeTab === index}
                onClick={() => handleTabClick(index)}
                style={{
                  display: selectedLanguage === "ko" ? "" : "flex",
                  alignItems: selectedLanguage === "ko" ? "" : "center",
                  padding: selectedLanguage === "ko" ? "" : "5px",
                }}
              >
                <span className="tabName">{myCourse.course_name}</span>
              </TabMenuItem>
            ))
          ) : (
            <div>No courses available</div>
          )}
        </TabMenuContainer>
      </TabMenuWrapper>
      <ContentContainer>
        <ProfileWrapper>
          <h2
            style={{
              marginBottom: selectedLanguage === "ko" ? "" : "8%",
            }}
          >
            {selectedLanguage === "ko" ? contents[0].ko : contents[0].en}
          </h2>
          <span className="profileName">
            {userData?.[activeTab]?.student_name || "Guest"}
          </span>
          <span> {selectedLanguage === "ko" ? "님의" : "'s"}</span>
          <p>{myCourses[activeTab]?.course_name}입니다.</p>
        </ProfileWrapper>
        <ProgressContainer>
          <div className="tabMenuProgressWrapper">
            <CircularProgress
              progress={myCourses[activeTab]?.completion_rate || 0}
            />
          </div>
          <ProgressInfo>
            <p>{myCourses[activeTab]?.course_name}</p>
            <span>
              {selectedLanguage === "ko"
                ? contentsTitle[activeTab]?.ko
                : contentsTitle[activeTab]?.en}
            </span>
            <p>
              {selectedLanguage === "ko" ? "현재" : "Now"}{" "}
              {myCourses[activeTab]?.completion_rate}%{" "}
              <span>
                {selectedLanguage === "ko"
                  ? "학습하셨습니다"
                  : "You have learned"}
              </span>
            </p>
            <span>
              마지막 실행일 :
              {myCourses[activeTab]?.last_update ||
                "데이터를 불러오지 못했습니다"}
            </span>
          </ProgressInfo>
        </ProgressContainer>
        <ButtonWrapper>
          <button onClick={openLauncher}>
            {selectedLanguage === "ko" ? "학습하기 →" : "Learn →"}
          </button>
        </ButtonWrapper>
      </ContentContainer>
    </>
  );
};

export default TabMenu;

const TabMenuWrapper = styled.div`
  width: 70vw;
  display: flex;
  margin: auto;
  justify-content: right;
`;

const TabMenuContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 72%;
`;

const TabMenuItem = styled.div<{ active: boolean }>`
  margin-top: 5%;
  margin-right: 0.5%;
  padding: 10px 10px;
  cursor: pointer;
  box-shadow: 1px 0 3px 1px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${(props) => (props.active ? "#fff" : "#d5e5e3")};
  color: ${(props) => (props.active ? "#078675" : "#767676")};
  font-weight: 600;
  text-align: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 80vw;
  height: 25vh;
  margin: auto;
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
`;

const ProfileWrapper = styled.div`
  width: 24%;
  height: 80%;
  margin-left: 3%;
  border-right: 2px solid #e6e6e6;

  h2 {
    color: #078675;
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 24%;
  }

  span,
  p {
    color: #078675;
    font-size: 1.1rem;
  }

  span:nth-child(2) {
    font-size: 2rem;
    font-weight: 600;
  }

  span:nth-child(3) {
    font-size: 1.5rem;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3%;
  width: 55%;
`;

const ProgressInfo = styled.div`
  margin-left: 5%;
  width: 100%;
  height: 100%;

  p:nth-child(1) {
    font-size: 2rem;
    color: #078675;
    font-weight: bold;
    margin: 0;
    margin-bottom: 2%;
  }

  p span {
    font-weight: 400;
  }

  p:nth-child(3) {
    font-size: 2rem;
    color: #078675;
    font-weight: bold;
    margin: 0;
    margin-top: 3%;
    margin-bottom: 2%;
  }

  span:nth-child(2) {
    color: #078675;
    font-weight: 500;
  }

  span:nth-child(4) {
    color: #767676;
  }
`;

const ButtonWrapper = styled.div`
  button {
    width: 10rem;
    height: 2.3rem;
    background-color: #078675;
    border: none;
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    font-family: "Pretendard-regular";
    border-radius: 7px;
    position: absolute;
    bottom: 30px;
    right: 40px;
    transition: 0.2s;
  }

  button:hover {
    cursor: pointer;
    background-color: #067264;
  }
`;
