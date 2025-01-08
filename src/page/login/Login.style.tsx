import styled from "styled-components";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export const LoginWrapper = styled.div`
  text-align: center;
  margin-top: 7%;

  form {
    margin-top: 1%;

    input {
      border: 1px solid #078675;
      width: 20%;
      height: 5.5vh;
      margin-bottom: 1%;
      border-radius: 7px;
      padding-left: 20px;
      outline: none;
      font-size: 1rem;

      @media only screen and (max-width: 768px) {
        width: 80%;
        border: 1px solid #078675;
        height: 5.5vh;
        margin-bottom: 1%;
        border-radius: 7px;
        padding-left: 20px;
        outline: none;
        font-size: 1rem;
      }
    }

    button {
      width: 21.4%;
      height: 5.5vh;
      border: 1px solid #078675;
      background-color: #078675;
      color: #fff;
      font-weight: bold;
      font-size: 1rem;
      font-family: "Pretendard";
      border-radius: 7px;
      transition: 0.2s;

      &:hover {
        cursor: pointer;
        background-color: #067264;
      }

      @media only screen and (max-width: 768px) {
        width: 86%;
        height: 5.5vh;
        border: 1px solid #078675;
        background-color: #078675;
        color: #fff;
        font-weight: bold;
        font-size: 1rem;
        font-family: "Pretendard";
        border-radius: 7px;
        transition: 0.2s;
      }
    }
  }

  p {
    margin-top: 5%;
    color: #078675;
    font-weight: 500;
  }
`;

export const LoginLogoWrapper = styled.div`
  text-align: center;
  img {
    @media only screen and (max-width: 768px) {
      margin-top: 50px;
      width: 50%;
  }
  /* 반응형 추가 */
  }

  p {
    margin-top: 50px;
    margin-bottom: 10px;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
`;

export const PasswordToggle = styled.img`
  position: absolute;
  right: 40.3%;
  top: 43%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 30px;
  height: 25px;

  @media only screen and (max-width: 768px) {
    position: absolute;
    right: 12%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 30px;
    height: 25px;
  }
`;

export const LoginSearchWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  font-family: "Pretendard";

  span {
    color: #9ccfc8;
    transition: 0.2s;
  }

  span:hover {
    color: #078675;
    cursor: pointer;
  }

  span:nth-child(1),
  span:nth-child(2) {
    padding-right: 2.5%;
    border-right: 1px solid #e6e6e6;
  }

  span:nth-child(2),
  span:nth-child(3) {
    margin-left: 2.5%;
  }
`;
