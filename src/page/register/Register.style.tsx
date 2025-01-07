import styled from "styled-components";

export const TermsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10%;

  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 5px solid #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    outline: 1px solid #078675;
    cursor: pointer;
    position: relative;
    margin-right: 10px;
  }

  input[type="checkbox"]:checked {
    background-color: #078675;
  }

  span:nth-child(2),
  span:nth-child(4),
  span:nth-child(6),
  span:nth-child(8) {
    color: #000;
    font-weight: 400;
  }
`;

export const TermsBox = styled.input`
  margin-left: 0;
  cursor: pointer;
  align-items: center;
`;

export const TermsTextWrapper = styled.div`
  width: 100%;
  border: none;
`;

export const FormError = styled.p`
  color: #e94439;
  font-weight: 400;
  margin-top: 10px;
  font-size: 0.9rem;
`;

export const RegisterWrapper = styled.div`
  margin-top: 6%;
  display: flex;
  justify-content: center;
`;

export const RegistrationForm = styled.div`
  color: #078675;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 600px) {
    color: #078675;
    margin: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form {
    width: 100%;

    @media only screen and (max-width: 600px) {
    width: 300px;
  }
  }

  form input {
    display: block;
    border: 1px solid #078675;
    width: 100%;
    height: 3rem;
    border-radius: 8px;
    outline: none;
    padding-left: 20px;
    font-size: 1.1rem;
    margin-bottom: 3%;

    @media only screen and (max-width: 600px) {
      display: block;
      border: 1px solid #078675;
      width: 100%;
      height: 3rem;
      border-radius: 8px;
      outline: none;
      padding-left: 20px;
      font-size: 1.1rem;
      margin-bottom: 3%;
      }

    &::placeholder {
      color: #cecece;
      font-family: "Pretendard-regular";
    }
  }

  label {
    display: block;
    justify-content: left;
    width: 100%;
    font-weight: bold;
    margin-bottom: 3%;
  }

  button {
    &::hover {
      cursor: pointer;
    }
  }
`;

export const RegiSubmitButton = styled.button`
  width: 105%;
  height: 5vh;
  background-color: #078675;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: "Pretendard-regular";
  font-size: 1.1rem;
  margin-top: 3%;
`;
export const SelectedSchool = styled.div`
  color: black;
  cursor: pointer;
`;

export const SchoolSuggestions = styled.ul`
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  margin-top: 0px;
  max-height: 200px;
  overflow-y: auto;
  padding: 0;
  width: 103.2%;
`;

export const SchoolSuggestionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #d1d1d1;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f1f1f1;
  }
  span {
    margin-left: 10px;
  }
`;

export const SelectButton = styled.button`
  background-color: #078675;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  width: 63px;
  height: 32px;
  cursor: pointer;
  margin-right: 10px;
  font-family: "Pretendard-Regular";
  font-size: 14px;
  &:hover {
    background-color: #006644;
  }
`;
