import React from "react";
import styled, { keyframes } from "styled-components";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const AboutWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: url("../bg/aboutBg.png");
  margin-top: 2%;
`;

const About1Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const AboutLeft1Wrapper = styled.div`
  img {
    margin-top: 15%;
    @media only screen and (max-width: 600px) {
    margin-top: 15%;
    height: 30px
    }
    /* 반응형 추가 */
  }
`;

const AboutNsLogo = styled.img`
  animation: ${slideInFromLeft} 1.5s ease-in-out forwards;
`;

const About1Text = styled.div`
  p {
    font-size: 2.5rem;
    font-weight: 700;
    margin-top: 10%;
    margin-bottom: 5%;
  }

  span {
    display: block;
    font-size: 1.5rem;
    color: #4a4a4a;
    font-weight: 500;
  }

  button {
    width: 50%;
    height: 7vh;
    color: #fff;
    background-color: #078675;
    border: none;
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 10%;
    margin-bottom: 5%;
    &:hover {
      cursor: pointer;
    }
  }
`;

const AboutVideoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    margin-bottom: 15%;
    &:hover {
      cursor: pointer;
    }
  }
`;

const AboutRight1Wrapper = styled.div`
  img {
    margin-top: 28%;
    animation: ${fadeIn} 3s;
  }
`;

const About2Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: url("../bg/aboutBg.png");
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const AboutCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AboutLeft2Wrapper = styled.div`
  h1 {
    font-size: 4rem;
    margin-bottom: 0;
    color: #0094ff;
  }

  .hapticEn {
    font-size: 1.5rem;
    color: #0094ff;
    margin-top: 2%;
    margin-bottom: 10%;
  }

  p {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const AboutCard = styled.div`
  background-color: #fff;
  width: 30%;
  height: 30vh;
  box-shadow: 5px 5px 10px #b8b8b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5%;

  p {
    font-size: 1.5rem;
    margin-bottom: 0;
  }
`;

const About3Wrapper = styled.div`
  width: 100%;
  height: 80vh;
`;

const About3TitleWrapper = styled.div`
  margin: 5% 0 2% 0;
  text-align: center;

  span {
    font-size: 3rem;
    font-weight: 700;
  }

  span span {
    color: #078675;
  }
`;

const About3LogoWrapper = styled.div`
  div {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 12%;
      margin: 0 20px;
    }
  }
`;

const AboutReviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3%;

  img {
    height: 5vh;
  }
`;

const AboutReviewBox = styled.div`
  width: 20%;
  height: 100%;
  background-color: #f1f2f5;
  margin: 0 30px;
  border-radius: 20px;
  padding: 30px;

  span {
    font-size: 1.1rem;
    line-height: 28px;
    font-weight: 500;
  }
`;

const About: React.FC = () => {
  const { selectedLanguage, changeLanguage } = useLanguage();
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage); // 언어 변경 함수 호출
  };

  const openAbout = () => {
    window.open(
      "https://drive.google.com/file/d/1E3EK7dAbRIAypUS_lJPqO8fB1kgpXiMw/view?usp=drive_link",
      "_blank"
    );
  };

  const video1Open = () => {
    window.open("https://www.youtube.com/watch?v=fAUHLtIYtMI", "_blank");
  };

  const video2Open = () => {
    window.open("https://www.youtube.com/watch?v=Qmboj45eC9U", "_blank");
  };

  return (
    <>
      <div className="aboutContainer">
        <Header onLanguageChange={handleLanguageChange} />
        <AboutWrapper>
          <About1Wrapper>
            <AboutLeft1Wrapper>
              <AboutNsLogo
                src={`${process.env.PUBLIC_URL}/img/nsBigLogo.png`}
                alt="img"
              />
              <About1Text>
                <p>
                  {selectedLanguage === "ko"
                    ? "간호학생들을 위한 메타버스 교육 솔루션"
                    : "Metaverse Education Solution\nfor Nursing Students"}
                </p>
                <span>
                  {selectedLanguage === "ko"
                    ? "널센스는 메타버스 기반 게이미피케이션 간호교육 플랫폼 입니다."
                    : "Nursense is a Metaverse-based\ngamified nursing education platform."}
                </span>
                <button onClick={goToLogin}>
                  {selectedLanguage === "ko" ? "자세히 보기" : "More →"}
                </button>
              </About1Text>
              <AboutVideoWrapper>
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/videoThumbnail1.png`}
                    alt="img"
                    onClick={video1Open}
                  />
                </div>
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/videoThumbnail2.png`}
                    alt="img"
                    onClick={video2Open}
                  />
                </div>
              </AboutVideoWrapper>
            </AboutLeft1Wrapper>
            <AboutRight1Wrapper>
              <img
                src={`${process.env.PUBLIC_URL}/img/about1Img.png`}
                alt="img"
              />
            </AboutRight1Wrapper>
          </About1Wrapper>
          <About2Wrapper>
            <AboutLeft2Wrapper>
              <h1>
                {selectedLanguage === "ko" ? "햅틱 디바이스" : "Haptic Device"}
              </h1>
              <p className="hapticEn">
                {selectedLanguage === "ko" ? "Haptic Device" : ""}
              </p>
              <p>
                {selectedLanguage === "ko"
                  ? "햅틱 디바이스는 사용자의 손동작을"
                  : "Haptic devices track user hand movements more precisely,"}
                <br />
                {selectedLanguage === "ko"
                  ? "보다 정밀하게 추적하여 실감나는 간호술기를 체험할 수 있습니다."
                  : "allowing for a lifelike experience of nursing procedures."}
              </p>
              <AboutCardWrapper>
                <AboutCard>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/accurity.png`}
                    alt="img"
                  />
                  <p>{selectedLanguage === "ko" ? "정확성" : "Accuracy"}</p>
                </AboutCard>
                <AboutCard>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/comfortable.png`}
                    alt="img"
                  />
                  <p>{selectedLanguage === "ko" ? "착용감" : "Wearability"}</p>
                </AboutCard>
                <AboutCard>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/vive.png`}
                    alt="img"
                  />
                  <p>
                    {selectedLanguage === "ko"
                      ? "진동 피드백"
                      : "Vibration feedback"}
                  </p>
                </AboutCard>
              </AboutCardWrapper>
            </AboutLeft2Wrapper>
            <div className="aboutRight2Wrapper">
              <img src={`${process.env.PUBLIC_URL}/img/haptic.png`} alt="img" />
            </div>
          </About2Wrapper>
          <About3Wrapper>
            <About3TitleWrapper>
              <span>
                {selectedLanguage === "ko" ? "사용해본 사람들의" : "Over"}{" "}
                <span>100+</span>{" "}
                {selectedLanguage === "ko"
                  ? "개의 후기"
                  : " reviews from users who have tried it"}
              </span>
            </About3TitleWrapper>
            <About3LogoWrapper>
              <div>
                <img src={`${process.env.PUBLIC_URL}/img/gumi.png`} alt="img" />
                <img src={`${process.env.PUBLIC_URL}/img/dip.png`} alt="img" />
                <img
                  src={`${process.env.PUBLIC_URL}/img/changjo.png`}
                  alt="img"
                />
              </div>
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/img/hanyong.png`}
                  alt="img"
                />
                <img
                  src={`${process.env.PUBLIC_URL}/img/yeonsei.png`}
                  alt="img"
                />
              </div>
            </About3LogoWrapper>
            <AboutReviewWrapper>
              <img src={`${process.env.PUBLIC_URL}/img/dda2.png`} alt="img" />
              <AboutReviewBox>
                <span>
                  {selectedLanguage === "ko"
                    ? "저는 최근 '널센스'라는 메타버스 간호교육 플랫폼을 경험하게 되었습니다. 이 플랫폼은 간호학 학습 경험을 혁신적으로 바꿔놓았습니다. 처음으로 '널센스'에 접속했을 때, 가상의 간호 교실에서 현실과 거의 흡사한 환경을 발견했습니다. 시뮬레이션은 매우 현실적이었고, 환자 상호작용은 실제 상황과 매우 흡사하여 간호 업무에 대한 자신감을 키우는 데 도움이 되었습니다."
                    : "I recently had the opportunity to experience 'Nursense,' a metaverse nursing education platform. This platform has revolutionized the nursing learning experience. Upon first accessing 'Nursense,' I discovered a virtual nursing classroom environment that closely resembled reality. The simulations were incredibly realistic, and patient interactions closely mirrored actual scenarios, helping to boost confidence in nursing tasks."}
                </span>
              </AboutReviewBox>
              <AboutReviewBox>
                <span>
                  {selectedLanguage === "ko"
                    ? "'널센스'는 현실과 가상의 융합을 통해 최고의 학습 경험을 제공합니다. 가상 시뮬레이션을 통해 향상된 간호 기술과 지식은 실제 환자 상황에서도 큰 도움이 되었습니다. 마지막으로, '널센스'는 미래의 간호 전문가로서의 역량을 키우는 데 있어 큰 역할을 할 것으로 기대됩니다. 현대 간호 교육의 새로운 지평을 여는 이 플랫폼은 간호학 학생들에게 꼭 필요한 혁신적인 도구임을 확신합니다."
                    : "Nursense offers a unique blend of reality and virtuality for an exceptional learning experience. Virtual simulations enhance nursing skills and knowledge, proving valuable in real patient scenarios.\nNursense is expected to play a crucial role in shaping the competencies of future nursing professionals, making it an essential tool for nursing students and revolutionizing modern education."}
                </span>
              </AboutReviewBox>
              <img src={`${process.env.PUBLIC_URL}/img/dda1.png`} alt="img" />
            </AboutReviewWrapper>
          </About3Wrapper>
          <Footer />
        </AboutWrapper>
      </div>
    </>
  );
};

export default About;
