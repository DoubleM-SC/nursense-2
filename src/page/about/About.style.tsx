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
  height: 100vh;
  background: url("../bg/aboutBg.png");
  margin-top: 2%;
`;

export const About1Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const AboutLeft1Wrapper = styled.div`
  img {
    margin-top: 15%;
  }
`;

export const AboutNsLogo = styled.img`
  animation: ${slideInFromLeft} 1.5s ease-in-out forwards;
`;

export const About1Text = styled.div`
  p {
    font-size: 2.5rem;
    font-weight: 700;
    margin-top: 10%;
    margin-bottom: 5%;
  }

  span {
    display: block;
    font-size: 1.5rem;
    color: #4a4a4a;
    font-weight: 500;
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
    &:hover {
      cursor: pointer;
    }
  }
`;

export const AboutVideoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    margin-bottom: 15%;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const AboutRight1Wrapper = styled.div`
  img {
    margin-top: 28%;
    animation: ${fadeIn} 3s;
  }
`;

export const About2Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: url("../bg/aboutBg.png");
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const AboutCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AboutLeft2Wrapper = styled.div`
  h1 {
    font-size: 4rem;
    margin-bottom: 0;
    color: #0094ff;
  }

  .hapticEn {
    font-size: 1.5rem;
    color: #0094ff;
    margin-top: 2%;
    margin-bottom: 10%;
  }

  p {
    font-size: 2rem;
    font-weight: 600;
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

  p {
    font-size: 1.5rem;
    margin-bottom: 0;
  }
`;

export const About3Wrapper = styled.div`
  width: 100%;
  height: 80vh;
`;

export const About3TitleWrapper = styled.div`
  margin: 5% 0 2% 0;
  text-align: center;

  span {
    font-size: 3rem;
    font-weight: 700;
  }

  span span {
    color: #078675;
  }
`;

export const About3LogoWrapper = styled.div`
  div {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 12%;
      margin: 0 20px;
    }
  }
`;

export const AboutReviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3%;

  img {
    height: 5vh;
  }
`;

export const AboutReviewBox = styled.div`
  width: 20%;
  height: 100%;
  background-color: #f1f2f5;
  margin: 0 30px;
  border-radius: 20px;
  padding: 30px;

  span {
    font-size: 1.1rem;
    line-height: 28px;
    font-weight: 500;
  }
`;
