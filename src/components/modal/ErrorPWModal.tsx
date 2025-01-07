import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import styled from "styled-components";

interface ErrorPWModalProps {
  closeModal: () => void;
}
const Modal = styled.div`
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
`;

const WarningIconWrapper = styled.div`
  margin-bottom: 20px;
`;

const ReadyModalButton = styled.button`
  width: 120px;
  height: 3.7vh;
  background-color: #078675;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  margin-top: 3%;
  margin: 5px;
  &:hover {
    cursor: pointer;
    background-color: #067264;
  }
`;

const ReadyModalText = styled.div`
  text-align: center;
`;

const ErrorPWModal: React.FC<ErrorPWModalProps> = ({ closeModal }) => {
  const { selectedLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage);
  };

  const handleConfirm = () => {
    closeModal();
  };

  return (
    <Modal>
      <ModalContent>
        <WarningIconWrapper>
          <img
            src={`${process.env.PUBLIC_URL}/img/warningIcon.png`}
            alt="warning icon"
          />
        </WarningIconWrapper>
        <ReadyModalText>
          <p>
            {selectedLanguage === "ko"
              ? "잘못된 비밀번호입니다."
              : "ID does not exist."}
          </p>
          <ReadyModalButton onClick={handleConfirm}>
            {selectedLanguage === "ko" ? "확인" : "OK"}
          </ReadyModalButton>
        </ReadyModalText>
      </ModalContent>
    </Modal>
  );
};

export default ErrorPWModal;
