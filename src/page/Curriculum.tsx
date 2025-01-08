import React from "react";
import styled from "styled-components";
import Header from "../layouts/Header";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../layouts/Footer";
import { useLanguage } from "../context/LanguageContext";

const CurrWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
  justify-content: center;
`;

const CurrNameBar = styled.div`
  width: 84.4vw;
  height: 10vh;
  background: linear-gradient(to right, #078675, rgb(20, 73, 51));
  color: #fff;
  display: flex;
  border-radius: 10px;
  align-items: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 10vh;
    background: linear-gradient(to right, #078675, rgb(20, 73, 51));
    color: #fff;
    display: flex;
    border-radius: 10px;
    align-items: center;
    margin: auto;
  }
  /* 반응형 추가 */
  span {
    margin-left: 2%;
    font-size: 1.2rem;
  }
`;

const CurrLearnInfo1 = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  padding: 2rem;
  margin-top: 3%;
  border-radius: 15px;
  justify-content: space-between;
  
  @media only screen and (max-width: 768px) {
    display: flex;
    width: 300px;
    align-items: flex-start;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    padding: 2rem;
    margin-top: 3%;
    border-radius: 15px;
    justify-content: space-between;
    flex-direction: column;
  }
  /* 반응형 추가 */
`;

const CurrLearnButtonWrapper = styled.div`
  button {
    background-color: #078675;
    border: none;
    padding: 1rem 2rem;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    font-family: "Pretendard";
    border-radius: 10px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const CurrLearnTitle = styled.div`
  margin-bottom: 3%;
  width: 100%;

  span {
    color: #078675;
    width: 100%;
  }

  span:nth-child(1) {
    border: 1px solid #aaa;
    padding: 5px 10px;
    border-radius: 20px;
  }

  span:nth-child(2) {
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 2%;
  }
`;

const CurrLearnDate = styled.div`
  span:nth-child(2) {
    margin: 0 2%;
  }
`;

const CurrLearnDis = styled.div`
  p {
    line-height: 25px;
  }
`;

const LearnPageText = styled.div`
  color: #078675;
`;

const NormalText = styled.div`
  color: #aaa;
`;

const CurrLearnButtonWrapperP = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
`;

const Curriculum: React.FC = () => {
  const location = useLocation();
  const isLearnPage = location.pathname.endsWith("/learn");
  const isEvaluationPage = location.pathname.endsWith("/evaluation");
  const isGuidePage = location.pathname.endsWith("/guide");
  const isLearningPage = location.pathname.endsWith("/learning");
  const { selectedLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage); // 언어 변경 함수 호출
  };

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

  const openYokchang = () => {
    window.open(
      "http://khna.or.kr/bbs/linkfile/resource/khna_Wcare.pdf",
      "_blank"
    );
  };

  const openDangnyo = () => {
    window.open(
      "https://kaim.or.kr/files/guide/%EB%82%B4%EB%B6%84%EB%B9%84%EB%8C%80%EC%82%AC_09.pdf",
      "_blank"
    );
  };

  const openDansun = () => {
    window.open(
      "http://contents2.kocw.or.kr/KOCW/document/2017/shinhan/kimsunok/7.pdf",
      "_blank"
    );
  };

  const openYuchi = () => {
    window.open(
      "https://khna.or.kr/home/data/230223/nursing_report_2023.pdf",
      "_blank"
    );
  };

  const openJusa = () => {
    window.open(
      "http://kocw.xcache.kinxcdn.com/KOCW/document/2018/bible/leesojung0226/5.pdf",
      "_blank"
    );
  };

  const openFire = () => {
    window.open(
      "http://nspa.or.kr/wp-content/uploads/2017/07/%ED%99%94%EC%9E%AC%EC%95%88%EC%A0%84.pdf",
      "_blank"
    );
  };

  const openMental = () => {
    window.open(
      "https://drive.google.com/file/d/1IGgj-soB0jHECORhsrc705lPpRJhlPLf/view?usp=sharing",
      "_blank"
    );
  };

  return (
    <>
      <div className="currContainer">
        <Header onLanguageChange={handleLanguageChange} />
        <CurrWrapper>
          <div className="currInfoWrapper">
            <CurrNameBar>
              <span>
                {selectedLanguage === "ko" ? "사전학습" : "Pre-learning"}
              </span>
            </CurrNameBar>
            <div className="currLearnInfoWrapper">
              <CurrLearnInfo1>
                <div>
                  <CurrLearnTitle>
                    <span>
                      {selectedLanguage === "ko"
                        ? "지역사회간호학"
                        : "Community Health Nursing"}
                    </span>
                    <span>
                      {selectedLanguage === "ko" ? "욕창" : "Pressure ulcer"}
                    </span>
                  </CurrLearnTitle>
                  <CurrLearnDate>
                    <span>
                      {selectedLanguage === "ko"
                        ? "등록일"
                        : "Registration Date"}
                    </span>
                    <span>I</span>
                    <span>2023.10.10</span>
                  </CurrLearnDate>
                  <CurrLearnDis>
                    <p>
                      {selectedLanguage === "ko"
                        ? "욕창은 피부나 접착 부위에 생긴 상처가 압력이나 마찰로 악화하는 상태를 말합니다.\n주로 침대에 오래 누워 있는 환자나 휠체어를 사용하는 사람들에게 발생합니다.\n침구를 교체하거나 체액 공급을 유지하는 등의 예방 조치와 적절한 상처 관리가 중요합니다."
                        : "Pressure ulcer refers to a condition where wounds on the skin or adhesive areas worsen due to\npressure or friction. It commonly occurs in patients who lie in bed for extended periods or\nindividuals who use wheelchairs.\nPreventive measures such as changing bedding or maintaining fluid intake, along with proper\nwound management, are crucial."}
                    </p>
                  </CurrLearnDis>
                </div>
                <CurrLearnButtonWrapper>
                  <button onClick={openYokchang}>
                    {selectedLanguage === "ko" ? "자료 보기" : "View More"}
                  </button>
                </CurrLearnButtonWrapper>
              </CurrLearnInfo1>
              <CurrLearnInfo1>
                <div>
                  <CurrLearnTitle>
                    <span>
                      {selectedLanguage === "ko"
                        ? "지역사회간호학"
                        : "Community Health Nursing"}
                    </span>
                    <span>
                      {selectedLanguage === "ko" ? "당뇨" : "Diabetes"}
                    </span>
                  </CurrLearnTitle>
                  <CurrLearnDate>
                    <span>
                      {selectedLanguage === "ko"
                        ? "등록일"
                        : "Registration Date"}
                    </span>
                    <span>I</span>
                    <span>2023.10.10</span>
                  </CurrLearnDate>
                  <CurrLearnDis>
                    <p>
                      {selectedLanguage === "ko"
                        ? "당뇨병은 혈당 조절이 이상하게 되는 질환으로, 과다한 혈당이 혈액 속에 존재합니다.\n이는 인슐린 부족 또는 인슐린 작용 저하로 인해 발생할 수 있습니다. 혈당 수준을 관리하는 것이 중요하며,\n식이 조절, 운동, 약물 치료가 포함됩니다."
                        : "Diabetes is a condition where blood sugar regulation becomes abnormal, resulting in elevated\nlevels of glucose in the bloodstream. This can occur due to insufficient insulin or impaired insulin action.\nManaging blood sugar levels is crucial, involving dietary adjustments, exercise, and\nmedication therapy."}
                    </p>
                  </CurrLearnDis>
                </div>
                <CurrLearnButtonWrapper>
                  <button onClick={openDangnyo}>
                    {selectedLanguage === "ko" ? "자료 보기" : "View More"}
                  </button>
                </CurrLearnButtonWrapper>
              </CurrLearnInfo1>
              <CurrLearnInfo1>
                <div>
                  <CurrLearnTitle>
                    <span>
                      {selectedLanguage === "ko"
                        ? "지역사회간호학"
                        : "Community Health Nursing"}
                    </span>
                    <span>
                      {selectedLanguage === "ko"
                        ? "유치도뇨"
                        : "Pediatric Urology"}
                    </span>
                  </CurrLearnTitle>
                  <CurrLearnDate>
                    <span>
                      {selectedLanguage === "ko"
                        ? "등록일"
                        : "Registration Date"}
                    </span>
                    <span>I</span>
                    <span>2023.10.10</span>
                  </CurrLearnDate>
                  <CurrLearnDis>
                    <p>
                      {selectedLanguage === "ko"
                        ? "유치 도뇨는 일반적으로 어린이나 희귀한 경우에는 성인에서 발생하는 방광 통제 장애입니다.\n이는 방광 근육이 예기치 않게 수축하여 소변을 방출하는 것을 제어하지 못할 때 발생합니다.\n이러한 상황은 일상생활에서 사회적, 정서적, 심리적으로 어려움을 겪을 수 있으며, 일부 사람들은 이를 '요실금'이라고도 부릅니다.\n치료에는 행동요법, 약물요법, 수술 등이 있으며, 각 환자의 상황에 맞게 맞춤형 치료가 필요합니다."
                        : "Enuresis is a bladder control disorder that typically occurs in children, although it can be rare in\nadults. It occurs when the bladder muscles contract unexpectedly, leading to the inability to\ncontrol urination. This situation can cause social, emotional, and psychological difficulties in dailylife,\nand some people refer to it as bedwetting. Treatment options include behavioral therapy,\nmedication, surgery, and personalized treatment tailored to each patient's condition."}
                    </p>
                  </CurrLearnDis>
                </div>
                <CurrLearnButtonWrapper>
                  <button onClick={openYuchi}>
                    {selectedLanguage === "ko" ? "자료 보기" : "View More"}
                  </button>
                </CurrLearnButtonWrapper>
              </CurrLearnInfo1>
              <CurrLearnInfo1>
                <div>
                  <CurrLearnTitle>
                    <span>
                      {selectedLanguage === "ko"
                        ? "지역사회간호학"
                        : "Community Health Nursing"}
                    </span>
                    <span>
                      {selectedLanguage === "ko"
                        ? "단순도뇨"
                        : "Simple Urology"}
                    </span>
                  </CurrLearnTitle>
                  <CurrLearnDate>
                    <span>
                      {selectedLanguage === "ko"
                        ? "등록일"
                        : "Registration Date"}
                    </span>
                    <span>I</span>
                    <span>2023.10.10</span>
                  </CurrLearnDate>
                  <CurrLearnDis>
                    <p>
                      {selectedLanguage === "ko"
                        ? "단순 도뇨는 신장에서 요가 생성되지만, 필요한 성분을 충분히 함유하지 않는 상태를 말합니다.\n이는 신장 기능 저하나 질환으로 인해 발생할 수 있습니다.\n주로 소변량이 증가하거나 요의 색이 변화하는 증상을 보이며, 신장 질환의 진단과 관리가 필요합니다."
                        : "Simple diuresis refers to a condition where urine is produced in the kidneys but lacks sufficient components.\nThis can occur due to impaired kidney function or certain diseases.\nSymptoms typically include increased urine volume or changes in urine color, necessitating diagnosis and management of kidney disorders."}
                    </p>
                  </CurrLearnDis>
                </div>
                <CurrLearnButtonWrapper>
                  <button onClick={openDansun}>
                    {selectedLanguage === "ko" ? "자료 보기" : "View More"}
                  </button>
                </CurrLearnButtonWrapper>
              </CurrLearnInfo1>
              <CurrLearnInfo1>
                <div>
                  <CurrLearnTitle>
                    <span>
                      {selectedLanguage === "ko"
                        ? "지역사회간호학"
                        : "Community Health Nursing"}
                    </span>
                    <span>
                      {selectedLanguage === "ko"
                        ? "근육주사"
                        : "Intramuscular Injection"}
                    </span>
                  </CurrLearnTitle>
                  <CurrLearnDate>
                    <span>
                      {selectedLanguage === "ko"
                        ? "등록일"
                        : "Registration Date"}
                    </span>
                    <span>I</span>
                    <span>2023.10.10</span>
                  </CurrLearnDate>
                  <CurrLearnDis>
                    <p>
                      {selectedLanguage === "ko"
                        ? "근육주사는 의료용 약물을 근육 내에 주입하는 치료 방법입니다.\n주로 통증 완화, 염증 감소, 근육의 이완, 혹은 약물의 효과를, 근육을 통해 빠르게 전달하기 위해 사용됩니다.\n이 방법은 비교적 간단하고 효과가 빠르며, 특정 부위에 직접 약물을 전달할 수 있어 다양한 의료 상황에서 사용됩니다."
                        : "Intramuscular injection is a therapeutic method of administering medical drugs into the muscle tissue.\nIt is primarily used for pain relief, reducing inflammation, muscle relaxation, or rapidly delivering the effects of medicationthrough the muscles.\nThis method is relatively simple and fast-acting, allowing direct delivery of drugs to specific areas, making it suitable for various medical situations."}
                    </p>
                  </CurrLearnDis>
                </div>
                <CurrLearnButtonWrapper>
                  <button onClick={openJusa}>
                    {selectedLanguage === "ko" ? "자료 보기" : "View More"}
                  </button>
                </CurrLearnButtonWrapper>
              </CurrLearnInfo1>
            </div>
          </div>
        </CurrWrapper>
        <Footer />
      </div>
    </>
  );
};

export default Curriculum;
