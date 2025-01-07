import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Policy from "../components/policy/Policy";
import styled from "styled-components";

const LoginFooter: React.FC = () => {
  const { selectedLanguage, changeLanguage } = useLanguage();
  const [isPolicyModalOpen, setPolicyModalOpen] = useState<boolean>(false);

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage); // 언어 변경 함수 호출
  };

  const openPolicyModal = () => {
    setPolicyModalOpen(true);
  };

  const closePolicyModal = () => {
    setPolicyModalOpen(false);
  };

  return (
    <>
      <FooterContainer>
        <FooterWrapper>
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

export default LoginFooter;

const FooterContainer = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
`;

const FooterWrapper = styled.div`
  width: 70%;
  margin: auto;
`;

const FooterCopy = styled.div`
  span {
    font-weight: bold;
    cursor: pointer;
  }

  span:nth-child(2) {
    padding-right: 1.5%;
    border-right: 2px solid #e6e6e6;
  }

  span:nth-child(3) {
    margin-left: 1.5%;
  }
`;
