import React from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import * as S from "./About.style";

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
        <S.AboutWrapper>
          <S.About1Wrapper>
            <S.AboutLeft1Wrapper>
              <S.AboutNsLogo
                src={`${process.env.PUBLIC_URL}/img/nsBigLogo.png`}
                alt="img"
              />
              <S.About1Text>
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
              </S.About1Text>
              <S.AboutVideoWrapper>
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
              </S.AboutVideoWrapper>
            </S.AboutLeft1Wrapper>
            <S.AboutRight1Wrapper>
              <img
                src={`${process.env.PUBLIC_URL}/img/about1Img.png`}
                alt="img"
              />
            </S.AboutRight1Wrapper>
          </S.About1Wrapper>
          <S.About2Wrapper>
            <S.AboutLeft2Wrapper>
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
              <S.AboutCardWrapper>
                <S.AboutCard>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/accurity.png`}
                    alt="img"
                  />
                  <p>{selectedLanguage === "ko" ? "정확성" : "Accuracy"}</p>
                </S.AboutCard>
                <S.AboutCard>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/comfortable.png`}
                    alt="img"
                  />
                  <p>{selectedLanguage === "ko" ? "착용감" : "Wearability"}</p>
                </S.AboutCard>
                <S.AboutCard>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/vive.png`}
                    alt="img"
                  />
                  <p>
                    {selectedLanguage === "ko"
                      ? "진동 피드백"
                      : "Vibration feedback"}
                  </p>
                </S.AboutCard>
              </S.AboutCardWrapper>
            </S.AboutLeft2Wrapper>
            <S.AboutRight2Wrapper>
              <img src={`${process.env.PUBLIC_URL}/img/haptic.png`} alt="img" />
            </S.AboutRight2Wrapper>
          </S.About2Wrapper>
          <S.About3Wrapper>
            <S.About3TitleWrapper>
              <span>
                {selectedLanguage === "ko" ? "사용해본 사람들의" : "Over"}{" "}
                <span>100+</span>{" "}
                {selectedLanguage === "ko"
                  ? "개의 후기"
                  : " reviews from users who have tried it"}
              </span>
            </S.About3TitleWrapper>
            <S.About3LogoWrapper>
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
            </S.About3LogoWrapper>
            <S.AboutReviewWrapper>
              <img src={`${process.env.PUBLIC_URL}/img/dda2.png`} alt="img" />
              <S.AboutReviewBox>
                <span>
                  {selectedLanguage === "ko"
                    ? "저는 최근 '널센스'라는 메타버스 간호교육 플랫폼을 경험하게 되었습니다. 이 플랫폼은 간호학 학습 경험을 혁신적으로 바꿔놓았습니다. 처음으로 '널센스'에 접속했을 때, 가상의 간호 교실에서 현실과 거의 흡사한 환경을 발견했습니다. 시뮬레이션은 매우 현실적이었고, 환자 상호작용은 실제 상황과 매우 흡사하여 간호 업무에 대한 자신감을 키우는 데 도움이 되었습니다."
                    : "I recently had the opportunity to experience 'Nursense,' a metaverse nursing education platform. This platform has revolutionized the nursing learning experience. Upon first accessing 'Nursense,' I discovered a virtual nursing classroom environment that closely resembled reality. The simulations were incredibly realistic, and patient interactions closely mirrored actual scenarios, helping to boost confidence in nursing tasks."}
                </span>
              </S.AboutReviewBox>
              <S.AboutReviewBox>
                <span>
                  {selectedLanguage === "ko"
                    ? "'널센스'는 현실과 가상의 융합을 통해 최고의 학습 경험을 제공합니다. 가상 시뮬레이션을 통해 향상된 간호 기술과 지식은 실제 환자 상황에서도 큰 도움이 되었습니다. 마지막으로, '널센스'는 미래의 간호 전문가로서의 역량을 키우는 데 있어 큰 역할을 할 것으로 기대됩니다. 현대 간호 교육의 새로운 지평을 여는 이 플랫폼은 간호학 학생들에게 꼭 필요한 혁신적인 도구임을 확신합니다."
                    : "Nursense offers a unique blend of reality and virtuality for an exceptional learning experience. Virtual simulations enhance nursing skills and knowledge, proving valuable in real patient scenarios.\nNursense is expected to play a crucial role in shaping the competencies of future nursing professionals, making it an essential tool for nursing students and revolutionizing modern education."}
                </span>
              </S.AboutReviewBox>
              <img src={`${process.env.PUBLIC_URL}/img/dda1.png`} alt="img" />
            </S.AboutReviewWrapper>
          </S.About3Wrapper>
          <Footer />
        </S.AboutWrapper>
      </div>
    </>
  );
};

export default About;
