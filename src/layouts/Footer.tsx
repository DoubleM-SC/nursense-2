import React, { useState } from "react";
import Policy from "../components/policy/Policy";
import { useLanguage } from "../context/LanguageContext";
import styled from "styled-components";

const Footer: React.FC = () => {
  const { selectedLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage); // 언어 변경 함수 호출
  };

  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);

  const openDM = () => {
    window.location.href = "http://www.wmscompany.co.kr";
  };

  const openInsta = () => {
    window.location.href = "https://www.instagram.com/wmsc.official/";
  };

  const openBlog = () => {
    window.location.href = "https://blog.naver.com/wmsc0202";
  };

  const openYoutube = () => {
    window.location.href = "https://www.youtube.com/@user-fy4yn4yk2c";
  };

  const openPolicyModal = () => {
    setIsPolicyModalOpen(true);
  };

  const closePolicyModal = () => {
    setIsPolicyModalOpen(false);
  };

  return (
    <>
      <FooterContainer>
        <FooterWrapper>
          <FooterLogoWrapper>
            <FooterDmLogo
              src={`${process.env.PUBLIC_URL}/img/dmLogo.png`}
              alt="logo"
              onClick={openDM}
            />
            <Sns
              src={`${process.env.PUBLIC_URL}/img/insta.png`}
              alt="snsLogo"
              onClick={openInsta}
            />
            <Sns
              src={`${process.env.PUBLIC_URL}/img/naver.png`}
              alt="snsLogo"
              onClick={openBlog}
            />
            <Sns
              src={`${process.env.PUBLIC_URL}/img/youtube.png`}
              alt="snsLogo"
              onClick={openYoutube}
            />
          </FooterLogoWrapper>
          <CompanyInfo>
            <span>
              {selectedLanguage === "ko" ? "회사명" : "Company name"} :{" "}
              {selectedLanguage === "ko"
                ? "(주)더블엠소셜컴퍼니"
                : "DoubleM Social Company"}
            </span>
            <span>
              {selectedLanguage === "ko" ? "대표자" : "CEO"} :{" "}
              {selectedLanguage === "ko" ? "김선미" : "Sunmi Kim"}
            </span>
            <p>E-mail : wmsc0202@naver.com</p>
            <span>
              {selectedLanguage === "ko"
                ? "대구광역시 동대구로 465 스케일업허브 DASH 405,406호"
                : "465, Dongdaegu-ro, Dong-gu, Daegu, Republic of Korea"}
            </span>
            <span>Tel : 1688-9564</span>
          </CompanyInfo>
          <FooterCopy>
            <p>Copyrightⓒ2023 DoubleM All rights reserved.</p>
            <span onClick={openPolicyModal}>
              {selectedLanguage === "ko" ? "이용약관" : "Terms of Service"}
            </span>
            <span onClick={openPolicyModal}>
              {selectedLanguage === "ko"
                ? "개인정보처리방침"
                : "Privacy Policy"}
            </span>
          </FooterCopy>
        </FooterWrapper>
      </FooterContainer>
      {isPolicyModalOpen && <Policy onClose={closePolicyModal} />}
    </>
  );
};

export default Footer;

const FooterContainer = styled.div`
  /* margin-top: 5%; */
  /* margin-bottom: 5%; */
`;

const FooterWrapper = styled.div`
  width: 70vw;
  margin: auto;
  padding: 4%;
  font-size: 0.9rem;
  font-family: "Pretendard";

  @media only screen and (max-width: 600px) {
    margin-top: 20%;
    width: 90%;
  }
  /* 반응형 추가 */
`;

const FooterLogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FooterDmLogo = styled.img`
  width: 15%;
  margin-right: 21%;
  &:hover {
    cursor: pointer;
  }
`;

const Sns = styled.img`
  margin-right: 2%;
  &:hover {
    cursor: pointer;
  }
`;

const CompanyInfo = styled.div`
  margin-top: 2%;
  span:nth-child(1),
  span:nth-child(3),
  span:nth-child(4) {
    border-right: 2px solid #e6e6e6;
    padding-right: 1.5%;
  }
  span:nth-child(2),
  span:nth-child(5),
  span:nth-child(6) {
    margin-left: 1.5%;
  }
`;

const FooterCopy = styled.div`
  span:hover {
    cursor: pointer;
  }
  span:nth-child(2) {
    padding-right: 1.5%;
    border-right: 2px solid #e6e6e6;
    font-weight: bold;
  }
  span:nth-child(3) {
    margin-left: 1.5%;
    font-weight: bold;
  }
`;
