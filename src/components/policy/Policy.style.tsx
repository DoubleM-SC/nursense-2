import styled from "styled-components";

export const PolicyContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PolicyWrapper = styled.div`
  background: #fff;
  padding: 20px;
  /* border-radius: 8px; */
  width: 30%;
  height: 50%;
  overflow: hidden;
  overflow-y: scroll;
  @media only screen and (max-width: 768px) {
    background: #fff;
    padding: 20px;
    /* border-radius: 8px; */
    width: 80%;
    height: 50%;
    overflow: hidden;
    overflow-y: scroll;
  }
  /* 반응형 추가 */
`;

export const PolicyModal = styled.div``;

export const PolicyTitle = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  /* position: sticky;  */
  top: 0;
  width: 100%;
  height: 30px;
  align-items: center;

  img {
    height: 50%;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const PolicyText = styled.div`
  p {
    margin: 0;
    padding: 0;
  }
`;
