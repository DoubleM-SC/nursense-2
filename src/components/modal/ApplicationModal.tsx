import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import styled from "styled-components";

interface ApplicationModalProps {
  onClose: () => void;
  onConfirm: () => void;
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

const YesOrNoBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  onClose,
  onConfirm,
}) => {
  const { selectedLanguage } = useLanguage();

  const handleConfirm = () => {
    onConfirm();
    // window.location.reload(); //주의 필요!
    onClose();
  };

  return (
    <Modal>
      <ModalContent>
        <IconWrapper>
          <img
            className="warningIcon"
            src={`${process.env.PUBLIC_URL}/img/warningIcon.png`}
            alt="warning icon"
          />
        </IconWrapper>
        <ModalText>
          <p>
            {selectedLanguage === "ko"
              ? "수강신청 하시겠습니까?"
              : "Do you want to enroll?"}
          </p>
          <YesOrNoBtn>
            <ModalButton onClick={handleConfirm}>
              {selectedLanguage === "ko" ? "네" : "OK"}
            </ModalButton>
            <ModalButton onClick={onClose}>
              {selectedLanguage === "ko" ? "아니요" : "NO"}
            </ModalButton>
          </YesOrNoBtn>
        </ModalText>
      </ModalContent>
    </Modal>
  );
};

export default ApplicationModal;
