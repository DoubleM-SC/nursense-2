import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import styled from "styled-components";

interface ConfirmationModalProps {
  onClose: () => void;
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 25px;
  width: 25%;
  border: 3px solid #e6e6e6;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalText = styled.div`
  text-align: center;
  margin-top: 7%;
`;

const ModalButton = styled.button`
  width: 120px;
  height: 3.7vh;
  background-color: #078675;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  margin-top: 5%;
  margin: 5px;
  transition: background-color 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #067264;
  }
`;

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onClose }) => {
  const { selectedLanguage } = useLanguage();

  return (
    <Modal>
      <ModalContent>
        <IconWrapper>
          <img
            src={`${process.env.PUBLIC_URL}/img/warningIcon.png`}
            alt="warning icon"
          />
        </IconWrapper>
        <ModalText>
          <p style={{ margin: "10px" }}>
            {selectedLanguage === "ko" ? "삭제되었습니다." : "Deleted"}
          </p>
          <ModalButton onClick={onClose}>
            {selectedLanguage === "ko" ? "확인" : "OK"}
          </ModalButton>
        </ModalText>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
