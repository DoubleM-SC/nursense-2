import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import styled from "styled-components";

interface UpdateSuccessModalProps {
  closeModal: () => void;
}

const UpdateSuccessModal: React.FC<UpdateSuccessModalProps> = ({
  closeModal,
}) => {
  const { selectedLanguage } = useLanguage();
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/");
  };

  return (
    <Modal>
      <ModalContent>
        <ModalWrapper>
          <SuccessIconWrapper>
            <img
              src={`${process.env.PUBLIC_URL}/img/successIcon.png`}
              alt="success icon"
            />
          </SuccessIconWrapper>
          <SuccessModalText>
            {selectedLanguage === "ko"
              ? "업데이트가 완료되었습니다."
              : "The update has been completed"}
          </SuccessModalText>
          <BackToMainButton onClick={goToLogin}>
            {selectedLanguage === "ko" ? "확인" : "Confirm"}
          </BackToMainButton>
        </ModalWrapper>
      </ModalContent>
    </Modal>
  );
};

export default UpdateSuccessModal;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  width: 22%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media only screen and (max-width: 768px) {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  /* 반응형 추가 */
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SuccessIconWrapper = styled.div`
  margin-bottom: 10px;

  img {
    width: 40px;
    height: 40px;
  }
`;

const SuccessModalText = styled.span`
  margin-top: 5%;
  color: #000;
  font-size: 1rem;
`;

const BackToMainButton = styled.button`
  width: 70%;
  height: 3.8vh;
  background-color: #078675;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: "Pretendard";
  font-size: 1.1rem;
  text-align: center;
  text-decoration: none;
  transition: 0.2s;
  margin-top: 9%;
  cursor: pointer;

  &:hover {
    background-color: #067264;
  }
`;
