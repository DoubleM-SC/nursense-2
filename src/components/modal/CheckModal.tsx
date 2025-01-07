import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface CheckModalProps {
  closeModal: () => void;
  checkMessage: string;
}

const CheckModal: React.FC<CheckModalProps> = ({
  closeModal,
  checkMessage,
}) => {
  const navigate = useNavigate();

  const goToLogin = () => {
    // 로그인 페이지로 이동
    navigate("/login");
    // 페이지를 새로고침
    window.location.reload();
  };

  return (
    <Modal>
      <ModalContent>
        <ModalWrapper>
          <SuccessIconWrapper>
            <SuccessIcon
              src={`${process.env.PUBLIC_URL}/img/successIcon.png`}
              alt="success icon"
            />
          </SuccessIconWrapper>
          <SuccessModalText>
            <span>{checkMessage}</span>
          </SuccessModalText>
          <BackToMainButton onClick={goToLogin}>확인</BackToMainButton>
        </ModalWrapper>
      </ModalContent>
    </Modal>
  );
};

export default CheckModal;

const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: #fff;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 10px;
`;

const ModalWrapper = styled.div`
  text-align: center;
`;

const SuccessIconWrapper = styled.div`
  margin-top: 20px;
`;

const SuccessIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const SuccessModalText = styled.div`
  margin-top: 5%;
  color: #000;
`;

const BackToMainButton = styled.button`
  width: 30%;
  height: 4vh;
  background-color: #078675;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: "Pretendard";
  font-size: 1.1rem;
  display: block;
  text-align: center;
  text-decoration: none;
  transition: 0.2s;
  margin-top: 5%;

  &:hover {
    cursor: pointer;
    background-color: #067264; /* 확인 버튼 hover 시 배경색 변경 */
  }
`;
