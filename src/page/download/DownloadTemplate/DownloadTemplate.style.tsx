import { styled, keyframes } from "styled-components";

export const DownloadContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const DownloadWrapper = styled.div`
  width: 100vw;
  height: 87vh;
  margin-top: 2%;
  background-image: url("../bg/dlbg.png");
  display: flex;
  justify-content: center;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25%;
  width: 50%;
`;

export const DownloadText = styled.div`
  width: 50%;
  text-align: center;

  img {
    width: 150px;
    height: 100%;
  }

  span {
    color: #005770;
    font-weight: 600;
    font-size: 26px;
  }
`;

export const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

export const DropletSpinner = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
`;

export const Droplet = styled.div`
  width: 15px;
  height: 15px;
  margin: 0 5px;
  background-color: #078675;
  border-radius: 50%;
  transform-origin: center bottom;
  animation: ${bounce} 1.2s cubic-bezier(0.3, 0.01, 0.4, 1) infinite;

  &:nth-child(1) {
    animation-delay: -0.4s;
  }

  &:nth-child(2) {
    animation-delay: -0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0s;
  }
`;

export const fadeInOut = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const FadeInOut = styled.span`
  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  &.show {
    animation: ${fadeInOut} 0.5s forwards;
  }
`;
