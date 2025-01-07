import React, { useEffect, useState } from "react";
import CircularProgress from "../CircularProgress";
import Cookies from "universal-cookie";
import { useLanguage } from "../../context/LanguageContext";
import styled from "styled-components";
import axiosInstance from "../../apis/axiosInstance";

const TabMenuNoCourseContainer = styled.div`
  margin-top: 85px !important;
  display: flex;
  position: relative;
  align-items: center;
  width: 80vw;
  height: 25vh;
  margin: auto;
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
`;

const TabMenuProfileWrapper = styled.div`
  width: 24%;
  height: 80%;
  margin-left: 3%;
  border-right: 2px solid #e6e6e6;

  h1 {
    color: #078675;
  }
  div {
    color: #078675;
    font-size: 20px;
    padding-top: 8px;
    padding-left: 4px;
  }
  p {
    display: flex;
    align-items: center;
  }
`;

const TabMenuProgressContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3%;
  width: 70%;
`;

const TabMenuProgressInfoWrapper = styled.div`
  margin-left: 43px;
  width: auto;
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
  div {
    color: #767676;
  }
`;

const TabMenuButtonWrapper = styled.button`
  width: 10rem;
  height: 2.3rem;
  background-color: #c4c4c4;
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
`;

const ProgressPercent = styled.div`
  display: flex;
  align-items: center;

  h2 {
    color: #078675;
  }
  span {
    font-size: 22px;
    padding-left: 10px;
    padding-bottom: 1px;
  }
`;

interface UserData {
  name: string;
  bedsore: number;
  // 필요한 다른 속성들도 추가할 수 있습니다.
}

const tabDataMap = {
  0: "bedsore",
  1: "diabetes",
  2: "foley",
  3: "nelaton",
  4: "Intramuscular",
  5: "Intravenous",
};

const TabMenuNoCourse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const cookies = new Cookies();
  const userId = cookies.get("id");
  const token = cookies.get("token");
  const refreshToken = cookies.get("refreshToken");
  const { selectedLanguage } = useLanguage();

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const openLauncher = () => {
    const launcherURL = `doublemlauncher://nursenselauncher?1?${userId}`;
    window.location.href = launcherURL;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `https://www.neusenseback.com/api/get/nursense/increase/${userId}`
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     "x-refresh-token": refreshToken,
          //   },
          // }
        );

        if (response.status === 200 && response.data.success) {
          const bedsoreProgress = response.data.response.bedsore;
          setUserData({ ...response.data.response, bedsore: bedsoreProgress });
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

  return (
    <>
      <TabMenuNoCourseContainer>
        <TabMenuProfileWrapper>
          <h1>나의 학습 현황</h1>
          <p>
            <h1>{userData?.name} </h1>
            <div> 님의 학습현황입니다.</div>
          </p>
        </TabMenuProfileWrapper>
        <TabMenuProgressContainer>
          <CircularProgress progress={0} />
          <TabMenuProgressInfoWrapper>
            {" "}
            <p>{selectedLanguage === "ko" ? "신청한 강의가 없습니다." : ""}</p>
            <ProgressPercent>
              <h2>현재 0%</h2> <span>학습하셨습니다.</span>
            </ProgressPercent>
            <div>마지막 실행일 : -</div>
          </TabMenuProgressInfoWrapper>
        </TabMenuProgressContainer>
        <TabMenuButtonWrapper>학습하기 →</TabMenuButtonWrapper>
      </TabMenuNoCourseContainer>
    </>
  );
};

export default TabMenuNoCourse;
