import React from "react";
import Header from "../layouts/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import styled from "styled-components";

const CurrLearningContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CurrLearningWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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

const ForBottom = styled.div`
  height: 150vh;
`;

const CurrNameBar = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  margin-bottom: 1rem;
  span {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const CurrLearningInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CurrLearningCard = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  padding: 2rem;
  margin-top: 3%;
  border-radius: 15px;
  margin-right: 5%;
  transition: 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const CurrLearningPercent = styled.div`
  font-size: 2.5rem;
  padding: 2rem;
  text-align: center;
  margin-right: 2.5%;
`;

const CurrLearningInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrLearningTitle = styled.div`
  margin-bottom: 3%;
  span:first-child {
    font-size: 1.3rem;
    color: #078675;
    margin-right: 4%;
    font-weight: bold;
  }
  span:last-child {
    font-weight: bold;
  }
`;

const CurrLearningDate = styled.div`
  span:nth-child(2) {
    margin: 0 2%;
  }
`;

const CurrLearningDis = styled.div`
  p {
    line-height: 1.5;
  }
`;

const CurrLearningBottom = styled.div`
  span:nth-child(3),
  span:nth-child(6) {
    margin: 0 5%;
  }
  span:nth-child(2),
  span:nth-child(5),
  span:nth-child(8) {
    color: red;
  }
`;

const CurrLearningBottom2 = styled(CurrLearningBottom)`
  span:nth-child(2),
  span:nth-child(5),
  span:nth-child(8) {
    color: #078675;
  }
`;

const CurrLearning: React.FC = () => {
  const location = useLocation();
  const isLearnPage = location.pathname.endsWith("/learn");
  const isEvaluationPage = location.pathname.endsWith("/evaluation");
  const isGuidePage = location.pathname.endsWith("/guide");
  const isLearningPage = location.pathname.endsWith("/learning");
  const { selectedLanguage, changeLanguage } = useLanguage();

  const navigate = useNavigate();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage); // 언어 변경 함수 호출
  };

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

  return (
    <>
      <CurrLearningContainer>
        <Header onLanguageChange={handleLanguageChange} />
        <CurrLearningWrapper>
          <CurrNavWrapper>
            <h2>교육과정</h2>
            <p>온라인 사전학습</p>
            <ul>
              <li
                onClick={goToLearn}
                className={isLearnPage ? "learnPageText" : "normalText"}
              >
                ⦁ 사전학습
              </li>
              <li
                onClick={goToEvaluation}
                className={isEvaluationPage ? "learnPageText" : "normalText"}
              >
                ⦁ 사전학습평가
              </li>
            </ul>
            <p>본 학습</p>
            <ul>
              <li
                onClick={goToGuide}
                className={isGuidePage ? "learnPageText" : "normalText"}
              >
                ⦁ 이용안내
              </li>
              <li
                onClick={goToLearning}
                className={isLearningPage ? "learnPageText" : "normalText"}
              >
                ⦁ 학습
              </li>
            </ul>
          </CurrNavWrapper>
          <ForBottom>
            <CurrNameBar>
              <span>학습</span>
            </CurrNameBar>
            <CurrLearningInfo>
              <CurrLearningCard>
                <CurrLearningPercent>
                  <span>0%</span>
                </CurrLearningPercent>
                <CurrLearningInfoWrapper>
                  <CurrLearningTitle>
                    <span>학습 1</span>
                    <span>김영신 교수님</span>
                  </CurrLearningTitle>
                  <CurrLearningDate>
                    <span>등록일</span>
                    <span>I</span>
                    <span>2023.10.10</span>
                  </CurrLearningDate>
                  <CurrLearningDis>
                    <p>
                      학습에 관한 간단한 내용학습에 관한 간단한 내용학습에 관한
                      간단한 내용학습에 관한 간단한 내용<br></br>학습에 관한
                      간단한 내용학습에 관한 간단한 내용학습에 관한 간단한 내용
                    </p>
                  </CurrLearningDis>
                  <CurrLearningBottom>
                    <span>최종평가 </span>
                    <span> 미응시</span>
                    <span>I</span>
                    <span>리포트제출 </span>
                    <span> 미제출</span>
                    <span>I</span>
                    <span>설문조사 </span>
                    <span> 미제출</span>
                  </CurrLearningBottom>
                </CurrLearningInfoWrapper>
              </CurrLearningCard>
              <CurrLearningCard>
                <CurrLearningPercent>
                  <span>0%</span>
                </CurrLearningPercent>
                <CurrLearningInfoWrapper>
                  <CurrLearningTitle>
                    <span>학습 2</span>
                    <span>김영신 교수님</span>
                  </CurrLearningTitle>
                  <CurrLearningDate>
                    <span>등록일</span>
                    <span>I</span>
                    <span>2023.10.10</span>
                  </CurrLearningDate>
                  <CurrLearningDis>
                    <p>
                      학습에 관한 간단한 내용학습에 관한 간단한 내용학습에 관한
                      간단한 내용학습에 관한 간단한 내용<br></br>학습에 관한
                      간단한 내용학습에 관한 간단한 내용학습에 관한 간단한 내용
                    </p>
                  </CurrLearningDis>
                  <CurrLearningBottom2>
                    <span>최종평가 </span>
                    <span> 완료</span>
                    <span>I</span>
                    <span>리포트제출 </span>
                    <span> 제출완료</span>
                    <span>I</span>
                    <span>설문조사 </span>
                    <span> 제출완료</span>
                  </CurrLearningBottom2>
                </CurrLearningInfoWrapper>
              </CurrLearningCard>
            </CurrLearningInfo>
            <CurrLearningInfo>
              <CurrLearningCard>
                <CurrLearningPercent>
                  <span>0%</span>
                </CurrLearningPercent>
                <CurrLearningInfoWrapper>
                  <CurrLearningTitle>
                    <span>학습 3</span>
                    <span>김영신 교수님</span>
                  </CurrLearningTitle>
                  <CurrLearningDate>
                    <span>등록일</span>
                    <span>I</span>
                    <span>2023.10.10</span>
                  </CurrLearningDate>
                  <CurrLearningDis>
                    <p>
                      학습에 관한 간단한 내용학습에 관한 간단한 내용학습에 관한
                      간단한 내용학습에 관한 간단한 내용<br></br>학습에 관한
                      간단한 내용학습에 관한 간단한 내용학습에 관한 간단한 내용
                    </p>
                  </CurrLearningDis>
                  <CurrLearningBottom>
                    <span>최종평가 </span>
                    <span> 미응시</span>
                    <span>I</span>
                    <span>리포트제출 </span>
                    <span> 미제출</span>
                    <span>I</span>
                    <span>설문조사 </span>
                    <span> 미제출</span>
                  </CurrLearningBottom>
                </CurrLearningInfoWrapper>
              </CurrLearningCard>
              <CurrLearningCard>
                <CurrLearningPercent>
                  <span>0%</span>
                </CurrLearningPercent>
                <CurrLearningInfoWrapper>
                  <CurrLearningTitle>
                    <span>학습 4</span>
                    <span>김영신 교수님</span>
                  </CurrLearningTitle>
                  <CurrLearningDate>
                    <span>등록일</span>
                    <span>I</span>
                    <span>2023.10.10</span>
                  </CurrLearningDate>
                  <CurrLearningDis>
                    <p>
                      학습에 관한 간단한 내용학습에 관한 간단한 내용학습에 관한
                      간단한 내용학습에 관한 간단한 내용<br></br>학습에 관한
                      간단한 내용학습에 관한 간단한 내용학습에 관한 간단한 내용
                    </p>
                  </CurrLearningDis>
                  <CurrLearningBottom2>
                    <span>최종평가 </span>
                    <span> 완료</span>
                    <span>I</span>
                    <span>리포트제출 </span>
                    <span> 제출완료</span>
                    <span>I</span>
                    <span>설문조사 </span>
                    <span> 제출완료</span>
                  </CurrLearningBottom2>
                </CurrLearningInfoWrapper>
              </CurrLearningCard>
            </CurrLearningInfo>
            <CurrLearningInfo>
              <CurrLearningCard>
                <CurrLearningPercent>
                  <span>0%</span>
                </CurrLearningPercent>
                <CurrLearningInfoWrapper>
                  <CurrLearningTitle>
                    <span>학습 5</span>
                    <span>김영신 교수님</span>
                  </CurrLearningTitle>
                  <CurrLearningDate>
                    <span>등록일</span>
                    <span>I</span>
                    <span>2023.10.10</span>
                  </CurrLearningDate>
                  <CurrLearningDis>
                    <p>
                      학습에 관한 간단한 내용학습에 관한 간단한 내용학습에 관한
                      간단한 내용학습에 관한 간단한 내용<br></br>학습에 관한
                      간단한 내용학습에 관한 간단한 내용학습에 관한 간단한 내용
                    </p>
                  </CurrLearningDis>
                  <CurrLearningBottom>
                    <span>최종평가 </span>
                    <span> 미응시</span>
                    <span>I</span>
                    <span>리포트제출 </span>
                    <span> 미제출</span>
                    <span>I</span>
                    <span>설문조사 </span>
                    <span> 미제출</span>
                  </CurrLearningBottom>
                </CurrLearningInfoWrapper>
              </CurrLearningCard>
              <CurrLearningCard>
                <CurrLearningPercent>
                  <span>0%</span>
                </CurrLearningPercent>
                <CurrLearningInfoWrapper>
                  <CurrLearningTitle>
                    <span>학습 6</span>
                    <span>김영신 교수님</span>
                  </CurrLearningTitle>
                  <CurrLearningDate>
                    <span>등록일</span>
                    <span>I</span>
                    <span>2023.10.10</span>
                  </CurrLearningDate>
                  <CurrLearningDis>
                    <p>
                      학습에 관한 간단한 내용학습에 관한 간단한 내용학습에 관한
                      간단한 내용학습에 관한 간단한 내용<br></br>학습에 관한
                      간단한 내용학습에 관한 간단한 내용학습에 관한 간단한 내용
                    </p>
                  </CurrLearningDis>
                  <CurrLearningBottom2>
                    <span>최종평가 </span>
                    <span> 완료</span>
                    <span>I</span>
                    <span>리포트제출 </span>
                    <span> 제출완료</span>
                    <span>I</span>
                    <span>설문조사 </span>
                    <span> 제출완료</span>
                  </CurrLearningBottom2>
                </CurrLearningInfoWrapper>
              </CurrLearningCard>
            </CurrLearningInfo>
            <CurrLearningInfo>
              <CurrLearningCard>
                <CurrLearningPercent>
                  <span>0%</span>
                </CurrLearningPercent>
                <CurrLearningInfoWrapper>
                  <CurrLearningTitle>
                    <span>학습 7</span>
                    <span>김영신 교수님</span>
                  </CurrLearningTitle>
                  <CurrLearningDate>
                    <span>등록일</span>
                    <span>I</span>
                    <span>2023.10.10</span>
                  </CurrLearningDate>
                  <CurrLearningDis>
                    <p>
                      학습에 관한 간단한 내용학습에 관한 간단한 내용학습에 관한
                      간단한 내용학습에 관한 간단한 내용<br></br>학습에 관한
                      간단한 내용학습에 관한 간단한 내용학습에 관한 간단한 내용
                    </p>
                  </CurrLearningDis>
                  <CurrLearningBottom>
                    <span>최종평가 </span>
                    <span> 미응시</span>
                    <span>I</span>
                    <span>리포트제출 </span>
                    <span> 미제출</span>
                    <span>I</span>
                    <span>설문조사 </span>
                    <span> 미제출</span>
                  </CurrLearningBottom>
                </CurrLearningInfoWrapper>
              </CurrLearningCard>
              <CurrLearningCard>
                <CurrLearningPercent>
                  <span>0%</span>
                </CurrLearningPercent>
                <CurrLearningInfoWrapper>
                  <CurrLearningTitle>
                    <span>학습 8</span>
                    <span>김영신 교수님</span>
                  </CurrLearningTitle>
                  <CurrLearningDate>
                    <span>등록일</span>
                    <span>I</span>
                    <span>2023.10.10</span>
                  </CurrLearningDate>
                  <CurrLearningDis>
                    <p>
                      학습에 관한 간단한 내용학습에 관한 간단한 내용학습에 관한
                      간단한 내용학습에 관한 간단한 내용<br></br>학습에 관한
                      간단한 내용학습에 관한 간단한 내용학습에 관한 간단한 내용
                    </p>
                  </CurrLearningDis>
                  <CurrLearningBottom2>
                    <span>최종평가 </span>
                    <span> 완료</span>
                    <span>I</span>
                    <span>리포트제출 </span>
                    <span> 제출완료</span>
                    <span>I</span>
                    <span>설문조사 </span>
                    <span> 제출완료</span>
                  </CurrLearningBottom2>
                </CurrLearningInfoWrapper>
              </CurrLearningCard>
            </CurrLearningInfo>
          </ForBottom>
        </CurrLearningWrapper>
      </CurrLearningContainer>
    </>
  );
};

export default CurrLearning;
