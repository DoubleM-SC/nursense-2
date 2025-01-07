import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import styled from "styled-components";

interface ReadyModalProps {
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
  @media only screen and (max-width: 600px) {
    background: white;
    padding: 20px;
    border-radius: 25px;
    width: 50%;
    border: 3px solid #e6e6e6;
  }
  /* 반응형 추가 */
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

const ReadyModal: React.FC<ReadyModalProps> = ({ onClose }) => {
  const { selectedLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage); // 언어 변경 함수 호출
  };

  const handleConfirm = () => {
    // 확인 버튼 클릭 시 실행되는 로직 추가 (예: 모달 닫기)
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
              ? "준비중인 기능입니다."
              : "Feature under development"}
          </p>
          <ModalButton onClick={handleConfirm}>
            {selectedLanguage === "ko" ? "확인" : "OK"}
          </ModalButton>
        </ModalText>
      </ModalContent>
    </Modal>
  );
};

export default ReadyModal;
