import { SyncLoader } from "react-spinners";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 200px;
  @media only screen and (max-width: 768px) {
    margin: 200px 20px;
  }

  @media (max-width: 480px) {
    margin: 100px 10px;
  }
`;

const SpinnerText = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingSpinner: React.FC = () => {
  return (
    <>
      <SpinnerContainer>
        <SpinnerText>잠시만 기다려주세요.</SpinnerText>
        <SyncLoader />
      </SpinnerContainer>
    </>
  );
};

export default LoadingSpinner;
