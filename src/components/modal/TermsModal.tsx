import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import styled from "styled-components";

interface TermsModalProps {
  closeTermsModal: () => void;
  message: string;
  message2?: string; // message2는 선택적 prop으로 지정
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
  @media only screen and (max-width: 768px) {
    background: white;
    padding: 20px;
    border-radius: 25px;
    width: 50%;
    border: 3px solid #e6e6e6;
  }
  /* 반응형 추가 */
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-bottom: 10px;
`;

const ModalText = styled.div`
  text-align: center;
  color: #000;
  margin-top: 2%;

  p {
    margin-top: 1%;
  }
`;

const CloseButton = styled.button`
  width: 60%;
  height: 4vh;
  background-color: #078675;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  margin-top: 3%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #067264;
    cursor: pointer;
  }
`;

const TermsModal: React.FC<TermsModalProps> = ({
  closeTermsModal,
  message,
  message2,
}) => {
  const { selectedLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage); // 언어 변경 함수 호출
  };

  return (
    <Modal>
      <ModalContent>
        <ModalWrapper>
          <IconWrapper>
            <img
              className="warningIcon"
              src={`${process.env.PUBLIC_URL}/img/warningIcon.png`}
              alt="warning icon"
            />
          </IconWrapper>
          <ModalText>
            <span>{message}</span>
            {message2 && <p>{message2}</p>} {/* message2가 있을 때만 렌더링 */}
          </ModalText>
          <CloseButton onClick={closeTermsModal}>
            {selectedLanguage === "ko" ? "확인" : "Confirm"}
          </CloseButton>
        </ModalWrapper>
      </ModalContent>
    </Modal>
  );
};

export default TermsModal;
