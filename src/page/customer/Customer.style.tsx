import styled from "styled-components";

export const CustomerContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CustomerWrapper = styled.div`
  color: #078675;
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContactLogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 3%;
`;

export const ContactWrapper = styled.div`
  form {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
      display: block;
      width: 20vw;
      height: 4vh;
      border: 1px solid #078675;
      margin-top: 2%;
      margin-bottom: 2%;
      border-radius: 5px;
      outline: none;
      font-size: 1.1rem;
      font-family: "Pretendard";
      color: #078675;
      padding-left: 10px;
      
      @media only screen and (max-width: 768px) {
        display: block;
        width: 80vw;
        height: 4vh;
        border: 1px solid #078675;
        margin-top: 2%;
        margin-bottom: 2%;
        border-radius: 5px;
        outline: none;
        font-size: 1.1rem;
        font-family: "Pretendard";
        color: #078675;
        padding-left: 10px;
      }
      /* 반응형 추가 */
    }

    textarea {
      display: block;
      width: 20vw;
      height: 20vh;
      border: 1px solid #078675;
      border-radius: 5px;
      margin-top: 2%;
      outline: none;
      resize: none;
      font-size: 1.1rem;
      font-family: "Pretendard";
      color: #078675;
      padding-left: 10px;
      padding-top: 10px;
      
      @media only screen and (max-width: 768px) {
        display: block;
        width: 80vw;
        height: 20vh;
        border: 1px solid #078675;
        border-radius: 5px;
        margin-top: 2%;
        outline: none;
        resize: none;
        font-size: 1.1rem;
        font-family: "Pretendard";
        color: #078675;
        padding-left: 10px;
        padding-top: 10px;
      }
      /* 반응형 추가 */
    }
  }
`;

export const ContactSubmit = styled.button`
  width: 21vw;
  height: 5vh;
  margin-top: 10%;
  background: none;
  border: 2px solid #078675;
  color: #078675;
  font-family: "Pretendard";
  font-size: 1.2rem;
  transition: 0.3s;
  
  @media only screen and (max-width: 768px) {
  width: 29vw;
  height: 5vh;
  margin-top: 10%;
  background: none;
  border: 2px solid #078675;
  border-radius: 10px;
  color: #078675;
  font-family: "Pretendard";
  font-size: 1.2rem;
  transition: 0.3s;
      }
      /* 반응형 추가 */

  &:hover {
    color: #fff;
    background-color: #078675;
    cursor: pointer;
  }
`;
