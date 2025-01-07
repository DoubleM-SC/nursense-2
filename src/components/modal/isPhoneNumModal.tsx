import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IsPhoneNumModalProps {
  onClose: () => void;
}

const IsPhoneNumModal: React.FC<IsPhoneNumModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onClose();
    navigate("/userinfo");
  };

  return (
    <Modal>
      <ModalContent>
        <ModalWrapper>
          <WarningIconWrapper>
            <WarningIcon
              src={`${process.env.PUBLIC_URL}/img/warningIcon.png`}
              alt="warning icon"
            />
          </WarningIconWrapper>
          <ReadyModalText>
            <p>휴대폰 번호를 작성하셔야 수강신청이 가능합니다.</p>
            <ReadyModalButton onClick={handleConfirm}>
              이동하기
            </ReadyModalButton>
          </ReadyModalText>
        </ModalWrapper>
      </ModalContent>
    </Modal>
  );
};

export default IsPhoneNumModal;

const Modal = styled.div`
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 25px;
  width: 25%;
  border: 3px solid #e6e6e6;
`;

const ModalWrapper = styled.div`
  text-align: center;
`;

const WarningIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const ReadyModalText = styled.div`
  text-align: center;
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
