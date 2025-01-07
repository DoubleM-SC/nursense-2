import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 600px) {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  }
  /* 반응형 추가 */
`;

const PopupWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 40px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 30%;
  max-height: 100%;
  overflow: auto;
  text-align: center;

  @media only screen and (max-width: 600px) {
  background-color: white;
  border-radius: 8px;
  padding: 40px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 80%;
  max-height: 80%;
  margin: auto;
  overflow: auto;
  text-align: center;
  }
  /* 반응형 추가 */
`;

const PopupTitle = styled.div`
  margin-bottom: 4%;

  span {
    color: #078675;
    font-size: 2.3rem;
    font-weight: bold;
  }
`;

const PopupImgWrapper = styled.div`
  img {
    width: 100%;
  }
`;

const PopupBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5%;
  text-align: center;
`;

const HourWrapper = styled.div`
  margin-left: 2%;
`;

const PopupXButton = styled.div`
  margin-right: 3%;

  img:hover {
    cursor: pointer;
  }
`;

const Popup: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(true);

  useEffect(() => {
    const isPopupClosed = localStorage.getItem("isPopupClosed");
    if (isPopupClosed) {
      const twentyFourHoursAgo = new Date().getTime() - 24 * 60 * 60 * 1000;
      const popupClosedTime = parseInt(isPopupClosed);
      if (popupClosedTime > twentyFourHoursAgo) {
        setShowPopup(false);
      }
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      localStorage.setItem("isPopupClosed", new Date().getTime().toString());
    } else {
      localStorage.removeItem("isPopupClosed");
    }
  };

  return (
    <>
      {showPopup && (
        <PopupContainer>
          <PopupWrapper>
            <PopupTitle>
              <span>Nursense 사용가이드</span>
            </PopupTitle>
            <PopupImgWrapper>
              <img src={`${process.env.PUBLIC_URL}/img/popup.png`} alt="img" />
            </PopupImgWrapper>
            <PopupBottomWrapper>
              <HourWrapper>
                <input type="checkbox" onChange={handleCheck} />
                <span>24시간동안 다시 보지 않기</span>
              </HourWrapper>
              <PopupXButton onClick={handleClosePopup}>
                <img
                  src={`${process.env.PUBLIC_URL}/img/closeButton.png`}
                  alt="Close"
                />
              </PopupXButton>
            </PopupBottomWrapper>
          </PopupWrapper>
        </PopupContainer>
      )}
    </>
  );
};

export default Popup;
