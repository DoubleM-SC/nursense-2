import styled from "styled-components";

export const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MyPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MyPageInfoWrapper = styled.div`
  width: 80vw;
  display: flex;
  justify-content: space-between;
  margin: auto;
  margin-top: 2%;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  position: relative;
`;

export const MyPageInfo = styled.div`
  padding: 10px 40px;
  p {
    font-size: 2.4rem;
    font-weight: bold;
    color: #078675;
    margin-top: 10px;
  }
`;

export const MyPageName = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 1.8rem;
    &:nth-child(1) {
      color: #078675;
      font-weight: bold;
    }
  }
`;

export const MyPageSchool = styled.div`
  margin-top: 10%;
  p {
    color: #078675;
    font-weight: bold;
    font-size: 1.2rem;
    span {
      color: #000;
      font-weight: 500;
    }
  }
`;

export const MyPageButtonWrapper = styled.div`
  button {
    width: 10rem;
    height: 2.3rem;
    background-color: #078675;
    border: none;
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    font-family: "Pretendard-regular";
    position: absolute;
    bottom: 29px;
    right: 40px;
    transition: 0.2s;
    border-radius: 7px;
    &:hover {
      cursor: pointer;
      background-color: #067264;
    }
  }
`;

export const ChangePwButton = styled.button`
  width: 10rem;
  height: 2.3rem;
  background-color: #078675;
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  font-family: "Pretendard-regular";
  border-radius: 7px;
  position: absolute;
  bottom: 29px;
  right: 230px;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background-color: #067264;
  }
`;
