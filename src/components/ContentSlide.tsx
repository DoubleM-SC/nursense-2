import React, { useState } from "react";
import styled from "styled-components";
import { getUserDataFromCookie } from "../page/cookies";
import { useLanguage } from "../context/LanguageContext";
import ReadyModal from "./modal/ReadyModal";

interface Content {
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
}

const ContentSlide: React.FC = () => {
  const userData = getUserDataFromCookie(); // 쿠키에서 사용자 데이터 가져오기
  const { selectedLanguage, changeLanguage } = useLanguage();

  const openLuncher = () => {
    const launcherURL = `doublemlauncher://nursenselauncher?1?${userData?.id}`; // 쿠키에서 가져온 사용자 ID 사용
    console.log({ launcherURL });
    window.location.href = launcherURL;
  };

  const [isReadyModalOpen, setIsReadyModalOpen] = useState<boolean>(false);

  const openReadyModal = () => {
    setIsReadyModalOpen(true);
  };

  const closeReadyModal = () => {
    setIsReadyModalOpen(false);
  };

  const translateText = (key: string): string => {
    switch (selectedLanguage) {
      case "ko":
        switch (key) {
          case "bedsore":
            return "욕창 임상실습";
          case "bedsoreDescription":
            return "욕창 관리부터 치료까지\n메타버스로 진행하는\n예비 임상실습";
          case "diabetes":
            return "당뇨 임상실습";
          case "diabetesDescription":
            return "당뇨 관리부터 치료까지\n메타버스로 진행하는\n예비 임상실습";
          case "simpleUrinaryTractInfection":
            return "단순도뇨 임상실습";
          case "simpleUrinaryTractInfectionDescription":
            return "단순도뇨 관리부터 치료까지\n메타버스로 진행하는\n예비 임상실습";
          case "urinaryIncontinence":
            return "유치도뇨 임상실습";
          case "urinaryIncontinenceDescription":
            return "유치도뇨 관리부터 치료까지\n메타버스로 진행하는\n예비 임상실습";
          case "intramuscularInjectionClinicalPractice":
            return "근육주사임상실습";
          case "intramuscularInjectionClinicalPracticeDescription":
            return "근육주사 관리부터 주입까지\n메타버스로 진행하는\n예비 임상실습";
          case "learn":
            return "학습하기";
          default:
            return "";
        }
      case "en":
        switch (key) {
          case "bedsore":
            return "Bedsore Clinical Practice";
          case "bedsoreDescription":
            return "Pre-clinical practice conducted in the metaverse from bedsore management to treatment.";
          case "diabetes":
            return "Diabetes Clinical Practice";
          case "diabetesDescription":
            return "Pre-clinical practice conducted in the metaverse from diabetes management to treatment.";
          case "simpleUrinaryTractInfection":
            return "Simple Urinary\nTract Infection";
          case "simpleUrinaryTractInfectionDescription":
            return "Pre-clinical Practice in the Metaverse for Simple Urinary Tract Infection";
          case "urinaryIncontinence":
            return "Urinary\nIncontinence";
          case "urinaryIncontinenceDescription":
            return "Urinary Incontinence, Pre-clinical practice conducted in the metaverse.";
          case "intramuscularInjectionClinicalPractice":
            return "Intramuscular Injection\nClinical Practice";
          case "intramuscularInjectionClinicalPracticeDescription":
            return "Pre-clinical Practice of Intramuscular Injections in the Metaverse";
          case "learn":
            return "Learn";
          default:
            return "";
        }
      default:
        return "";
    }
  };

  const contentData: Content[] = [
    {
      title: translateText("bedsore"),
      description: translateText("bedsoreDescription"),
      buttonText: translateText("learn"),
      imageUrl: `${process.env.PUBLIC_URL}/img/bedsore.png`,
    },
    {
      title: translateText("diabetes"),
      description: translateText("diabetesDescription"),
      buttonText: translateText("learn"),
      imageUrl: `${process.env.PUBLIC_URL}/img/diabetes.png`,
    },
    {
      title: translateText("simpleUrinaryTractInfection"),
      description: translateText("simpleUrinaryTractInfectionDescription"),
      buttonText: translateText("learn"),
      imageUrl: `${process.env.PUBLIC_URL}/img/nelaton.png`,
    },
    {
      title: translateText("urinaryIncontinence"),
      description: translateText("urinaryIncontinenceDescription"),
      buttonText: translateText("learn"),
      imageUrl: `${process.env.PUBLIC_URL}/img/foley.png`,
    },
    {
      title: translateText("intramuscularInjectionClinicalPractice"),
      description: translateText(
        "intramuscularInjectionClinicalPracticeDescription"
      ),
      buttonText: translateText("learn"),
      imageUrl: `${process.env.PUBLIC_URL}/img/intramuscular.png`,
    },
  ];

  return (
    <>
      <ContentSlideContainer>
        <ContentSlideWrapper>
          <ContentText>
            <span>
              {" "}
              {selectedLanguage === "ko"
                ? "실습 콘텐츠 현황"
                : "Status of Practical Training Content"}
            </span>
            <span onClick={openReadyModal}>
              {" "}
              {selectedLanguage === "ko" ? "자세히보기 →" : "View Details →"}
            </span>
          </ContentText>
          <ContentCardWrapper>
            {contentData.map((content, index) => (
              <ContentCard key={index}>
                <CardInner>
                  <CardTitle>
                    <p>{content.title}</p>
                    <p>{content.description}</p>
                  </CardTitle>
                  <CardBottom>
                    <img
                      src={content.imageUrl}
                      alt={`Content ${index + 1} img`}
                    />
                    <CardButton onClick={openLuncher}>
                      {content.buttonText}
                    </CardButton>
                  </CardBottom>
                </CardInner>
              </ContentCard>
            ))}
          </ContentCardWrapper>
        </ContentSlideWrapper>
        {isReadyModalOpen && <ReadyModal onClose={closeReadyModal} />}
      </ContentSlideContainer>
    </>
  );
};

const ContentSlideContainer = styled.div`
  width: 100%;
`;

const ContentSlideWrapper = styled.div`
  width: 90%;
  margin: auto;
  font-family: "Pretendard";
`;

const ContentText = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4%;
  color: #078675;
  font-size: 1.1rem;
  font-weight: bold;

  span:nth-child(2):hover {
    cursor: pointer;
  }
`;

const ContentCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2%;

  @media only screen and (max-width: 600px) {
  margin-top: 2%;
  display: contents;
  width: 100%;
  }
  /* 반응형 추가 */
`;

const ContentCard = styled.div`
  width: 18%;
  border-radius: 15px;
  box-shadow: 0px 7px 7px 7px rgba(0, 0, 0, 0.1);
  transition: 0.25s;

  @media only screen and (max-width: 600px) {
    margin: auto;
    width: 90%;
    margin-top: 10%;
  }
  /* 반응형 추가 */

  &:hover {
    background-color: #078675;
    color: #fff;
    transform: scale(1.1);

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }
  }
`;

const CardInner = styled.div`
  padding: 20px;
  padding-top: 0;

  @media only screen and (max-width: 600px) {
  padding: 20px;
  }
  /* 반응형 추가 */
`;

const CardTitle = styled.div`
  p:nth-child(1) {
    font-weight: bold;
    font-size: 1.5rem;  
  }

  p:nth-child(2) {
    width: 100%;
    height: 7vh;
  }
`;

const CardBottom = styled.div`
  text-align: center;
  height: 100%;
  padding: 20px 0;

  img {
    width: 70%;
    margin-bottom: 10%;
  }
`;

const CardButton = styled.button`
  background: none;
  border: 3px solid #078675;
  color: #078675;
  width: 70%;
  height: 2.5rem;
  font-size: 0.9rem;
  font-family: "Pretendard";
  font-weight: bold;
  border-radius: 100px;
`;

export default ContentSlide;
