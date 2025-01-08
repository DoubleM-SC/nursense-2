import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const AboutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url("../bg/aboutBg.png");
  margin-top: 2%;
  overflow-x: hidden;

  @media only screen and (max-width: 768px) {
    margin-top: 4%;
  }
`;

export const About1Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 20px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const AboutLeft1Wrapper = styled.div`
  img {
    margin-top: 15%;
    max-width: 100%;
    height: auto;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export const AboutNsLogo = styled.img`
  animation: ${slideInFromLeft} 1.5s ease-in-out forwards;
  max-width: 100%;
  height: auto;
`;

export const About1Text = styled.div`
  p {
    font-size: 2.5rem;
    font-weight: 700;
    margin-top: 10%;
    margin-bottom: 5%;

    @media only screen and (max-width: 768px) {
      font-size: 1.8rem;
      text-align: center;
      font-weight: 700;
      margin-top: 10%;
      margin-bottom: 5%;
    }
  }

  span {
    display: block;
    font-size: 1.5rem;
    color: #4a4a4a;
    font-weight: 500;

    @media only screen and (max-width: 768px) {
      font-weight: 500;
      font-size: 1.2rem;
      text-align: center;
    }
  }

  button {
    width: 50%;
    height: 7vh;
    color: #fff;
    background-color: #078675;
    border: none;
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 10%;
    margin-bottom: 5%;
    cursor: pointer;

    @media only screen and (max-width: 768px) {
      width: 80%;
      font-size: 1rem;
      display: block;
      margin: 10% auto 5% auto;
    }
  }
`;

export const AboutVideoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  img {
    margin-bottom: 15%;
    cursor: pointer;
    max-width: 100%;
    height: auto;
  }
`;

export const AboutRight1Wrapper = styled.div`
  img {
    margin-top: 28%;
    animation: ${fadeIn} 3s;
    max-width: 100%;
    height: auto;
  }

  @media only screen and (max-width: 768px) {
    img {
      margin-top: 10%;
    }
  }
`;

export const About2Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url("../bg/aboutBg.png");
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    padding: 40px 0px;
  }
`;

export const AboutRight2Wrapper = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }

  @media only screen and (max-width: 768px) {
    margin-top: 40px;
  }
`;

export const AboutCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const AboutLeft2Wrapper = styled.div`
  h1 {
    font-size: 4rem;
    margin-bottom: 0;
    color: #0094ff;

    @media only screen and (max-width: 768px) {
      font-size: 2.5rem;
      text-align: center;
    }
  }

  .hapticEn {
    font-size: 1.5rem;
    color: #0094ff;
    margin-top: 2%;
    margin-bottom: 10%;

    @media only screen and (max-width: 768px) {
      font-size: 1.2rem;
      text-align: center;
    }
  }

  p {
    font-size: 2rem;
    font-weight: 600;

    @media only screen and (max-width: 768px) {
      font-size: 1.4rem;
      text-align: center;
    }
  }
`;

export const AboutCard = styled.div`
  background-color: #fff;
  width: 30%;
  height: 30vh;
  box-shadow: 5px 5px 10px #b8b8b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
  padding: 20px;

  @media only screen and (max-width: 768px) {
    width: 80%;
    height: 25vh;
    margin: 20px auto;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 0;

    @media only screen and (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export const About3Wrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  padding: 20px;

  @media only screen and (max-width: 768px) {
    min-height: auto;
    padding: 0px;
  }
`;

export const About3TitleWrapper = styled.div`
  margin: 5% 0 2% 0;
  text-align: center;

  span {
    font-size: 3rem;
    font-weight: 700;

    @media only screen and (max-width: 768px) {
      font-size: 1.8rem;
    }
  }

  span span {
    color: #078675;
  }
`;

export const AboutReviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3%;
  
  @media only screen and (max-width: 768px) {
  display: flex;
  flex-wrap: wrap;
  margin-top: 3%;
  }
  /* 반응형 추가 */
  img {
    height: 5vh;
  }
`;

export const AboutReviewBox = styled.div`
  width: 20%;
  height: 100%;
  background-color: #f1f2f5;
  margin: 0 40px;
  border-radius: 20px;
  padding: 30px;

  span {
    font-size: 1.1rem;
    line-height: 28px;
    font-weight: 500;
  }

  @media only screen and (max-width: 768px) {
    width: 80%;
    margin: 30px 0;
    padding: 20px;

    span {
      font-size: 1rem;
      line-height: 24px;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    margin: 10px;
    padding: 15px;

    span {
      font-size: 0.9rem;
      line-height: 22px;
    }
  }
`;

export const About3LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin: 40px 0;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

    img {
      width: 12%;
      margin: 0 20px;
    }

  @media only screen and (max-width: 768px) {
    img {
      width: 90px;
      height: auto;
    }
  }
`;
