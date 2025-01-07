import React, { useState } from "react";
import Header from "../../layouts/Header";
import axios from "axios";
import TermsModal from "../../components/modal/TermsModal";
import { useNavigate } from "react-router-dom";
import UpdateSuccessModal from "../../components/modal/UpdateSuccessModal";
import LoginFooter from "../../layouts/LoginFooter";
import Policy from "../../components/policy/Policy";
import { useLanguage } from "../../context/LanguageContext";
import * as S from "./UpdateUserInfo.style";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const UpdateUserInfo: React.FC = () => {
  const token = useSelector((state: RootState) => state.user?.token);

  const navigate = useNavigate();
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);
  const { selectedLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage); // 언어 변경 함수 호출
  };

  const [formData, setFormData] = useState({
    phone_number: "",
  });

  const [registrationMessage, setRegistrationMessage] = useState<string>("");
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] =
    useState<boolean>(false);
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);

  const openTermsModal = () => {
    setShowTermsModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  const openUpdateSuccessModal = () => {
    setShowUpdateSuccessModal(true);
  };

  const closeUpdateSuccessModal = () => {
    setShowUpdateSuccessModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone_number") {
      const isValidPhoneNumber = /^010\d{8}$/.test(value);
      setPhoneError(!isValidPhoneNumber);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isTermsChecked) {
      openTermsModal();
      return;
    }

    const isFormValid = formData.phone_number && !phoneError;

    if (!isFormValid) {
      alert("모든 값을 입력해주세요.");
      return;
    }

    if (phoneError) {
      alert("입력 양식을 확인해주세요.");
      return;
    }

    console.log("Submitting form with data:", formData);

    try {
      const response = await axios.put(
        "https://www.neusenseback.com/api/user/info",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response from server:", response);

      if (response.status === 200) {
        console.log("정보 업데이트 성공!");
        setRegistrationMessage(response.data.msg);
        openUpdateSuccessModal();
      } else {
        console.error("정보 업데이트 실패.");
      }
    } catch (error: any) {
      console.error("정보 업데이트 중 오류 발생:", error);
      if (error.response && error.response.status === 400) {
        setRegistrationMessage("이미 가입된 아이디입니다.");
      }
    }
  };

  const openPolicyModal = () => {
    setIsPolicyModalOpen(true);
  };

  const closePolicyModal = () => {
    setIsPolicyModalOpen(false);
  };

  return (
    <>
      <div>
        <Header onLanguageChange={handleLanguageChange} />
        <S.RegisterWrapper>
          <S.RegistrationForm>
            <img
              src={`${process.env.PUBLIC_URL}/img/registerLogo.png`}
              alt="Register Logo"
            />
            <p>
              {selectedLanguage === "ko"
                ? "휴대폰 번호를 추가하셔야 서비스를 이용하실 수 있습니다."
                : "Log in to Nursense to experience more services."}
            </p>
            <form onSubmit={handleSubmit}>
              <label>
                <p>
                  {selectedLanguage === "ko" ? "휴대폰 번호" : "Phone Number"}
                </p>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder={
                    selectedLanguage === "ko"
                      ? "휴대폰 번호 입력 (ex. 01012345678)"
                      : "Enter your Phone number"
                  }
                  style={{
                    borderColor: phoneError ? "#E94439" : "",
                    fontFamily: "Pretendard-Regular",
                  }}
                />
                {phoneError && (
                  <S.FormError>
                    {selectedLanguage === "ko"
                      ? "휴대폰 번호 형식이 잘못되었습니다."
                      : "Invalid phone number format."}
                  </S.FormError>
                )}
              </label>
              <S.TermsWrapper>
                <div>
                  <S.TermsBox
                    type="checkbox"
                    name="terms"
                    onChange={() => setIsTermsChecked(!isTermsChecked)}
                  />
                </div>
                <S.TermsTextWrapper>
                  <span
                    onClick={
                      selectedLanguage === "ko" ? openPolicyModal : undefined
                    }
                    style={{
                      color: selectedLanguage === "ko" ? "#078675" : "#000",
                      borderBottom: "none",
                      fontWeight: selectedLanguage === "ko" ? "bold" : "",
                      cursor: selectedLanguage === "ko" ? "pointer" : "",
                    }}
                  >
                    {selectedLanguage === "ko"
                      ? "서비스 이용약관"
                      : "I have reviewed and agree"}
                  </span>
                  <span> {selectedLanguage === "ko" ? " 및 " : "to the"} </span>
                  <span
                    onClick={openPolicyModal}
                    style={{
                      color: "#078675",
                      borderBottom: "none",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {selectedLanguage === "ko"
                      ? "개인정보 취급방침"
                      : " terms of service and "}
                  </span>
                  <span
                    onClick={
                      selectedLanguage === "ko" ? undefined : openPolicyModal
                    }
                    style={{
                      color: selectedLanguage === "ko" ? "#000" : "#078675",
                      borderBottom: "none",
                      fontWeight: selectedLanguage === "ko" ? "" : "bold",
                      cursor: selectedLanguage === "ko" ? "" : "pointer",
                    }}
                  >
                    {selectedLanguage === "ko" ? "을 " : "privacy policy"}{" "}
                  </span>
                  <span
                    style={{
                      color: selectedLanguage === "ko" ? "#078675" : "#000",
                      fontWeight: selectedLanguage === "ko" ? "bold" : "",
                    }}
                  >
                    {selectedLanguage === "ko"
                      ? "확인"
                      : "regarding the handling of"}
                  </span>
                  <span>
                    {selectedLanguage === "ko" ? "하였고, 이에" : "personal"}
                  </span>
                  <span
                    style={{
                      color: selectedLanguage === "ko" ? "#078675" : "#000",
                      fontWeight: selectedLanguage === "ko" ? "bold" : "",
                    }}
                  >
                    {selectedLanguage === "ko" ? "동의합니다" : "information."}
                  </span>
                </S.TermsTextWrapper>
              </S.TermsWrapper>
              <S.RegiSubmitButton type="submit">
                {selectedLanguage === "ko" ? "업데이트하기" : "Confirm"}
              </S.RegiSubmitButton>
            </form>
            {showUpdateSuccessModal && (
              <UpdateSuccessModal closeModal={closeUpdateSuccessModal} />
            )}
          </S.RegistrationForm>
        </S.RegisterWrapper>
        <LoginFooter />
      </div>
      {isPolicyModalOpen && <Policy onClose={closePolicyModal} />}
    </>
  );
};

export default UpdateUserInfo;
