import React from "react";
import Header from "../../layouts/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import styled from "styled-components";

const CurrGuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CurrGuideWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  margin-top: 5%;
`;

const CurrNavWrapper = styled.div`
  width: 20%;
  h2 {
    margin-bottom: 10px;
  }
  p {
    margin: 10px 0;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      cursor: pointer;
      margin: 10px 0;
      &:hover {
        color: #078675;
      }
    }
  }
`;

const CurrNameBar2 = styled.div`
  width: 84.4vw;
  height: 10vh;
  background: linear-gradient(to right, #078675, rgb(20, 73, 51));
  color: #fff;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 600px) {
    width: 100px;
  }
  /* 반응형 추가 */
  span {
    margin-left: 2%;
    font-size: 1.2rem;
  }
`;

const Guide: React.FC = () => {
  const location = useLocation();
  const isLearnPage = location.pathname.endsWith("/learn");
  const isEvaluationPage = location.pathname.endsWith("/evaluation");
  const isGuidePage = location.pathname.endsWith("/guide");
  const isLearningPage = location.pathname.endsWith("/learning");

  const navigate = useNavigate();

  const goToEvaluation = () => {
    navigate("/curriculum/evaluation"); // '/target-page'로 이동
  };

  const goToLearn = () => {
    navigate("/curriculum/learn"); // '/target-page'로 이동
  };

  const goToGuide = () => {
    navigate("/curriculum/guide"); // '/target-page'로 이동
  };

  const goToLearning = () => {
    navigate("/curriculum/learning"); // '/target-page'로 이동
  };
  const { selectedLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage); // 언어 변경 함수 호출
  };

  return (
    <>
      <CurrGuideContainer>
        <Header onLanguageChange={handleLanguageChange} />
        <CurrGuideWrapper>
          <CurrNavWrapper>
            <h2>교육과정</h2>
            <p>온라인 사전학습</p>
            <ul>
              <li
                onClick={goToLearn}
                className={isLearnPage ? "learnPageText" : ""}
              >
                ⦁ 사전학습
              </li>
              <li
                onClick={goToEvaluation}
                className={isEvaluationPage ? "learnPageText" : ""}
              >
                ⦁ 사전학습평가
              </li>
            </ul>
            <p>본 학습</p>
            <ul>
              <li
                onClick={goToGuide}
                className={isGuidePage ? "learnPageText" : ""}
              >
                ⦁ 이용안내
              </li>
              <li
                onClick={goToLearning}
                className={isLearningPage ? "learnPageText" : ""}
              >
                ⦁ 학습
              </li>
            </ul>
          </CurrNavWrapper>
          <CurrNameBar2>
            <span>이용안내</span>
          </CurrNameBar2>
        </CurrGuideWrapper>
      </CurrGuideContainer>
    </>
  );
};

export default Guide;
