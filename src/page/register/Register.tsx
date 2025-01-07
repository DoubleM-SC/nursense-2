import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../layouts/Header";
import TermsModal from "../../components/modal/TermsModal";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/modal/SuccessModal";
import LoginFooter from "../../layouts/LoginFooter";
import Policy from "../../components/policy/Policy";
import { useLanguage } from "../../context/LanguageContext";
import * as S from "./Register.style";

interface School {
  school_name: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const goToHome = () => {
    navigate("/");
  };
  const { selectedLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage);
  };

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    name: "",
    school: "",
    email: "",
    department: "",
    student_id: "",
    phone_number: "",
  });

  const [registrationMessage, setRegistrationMessage] = useState("");
  const [idError, setIdError] = useState(false);
  const [studentIdError, setStudentIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [idDuplicateError, setIdDuplicateError] = useState(false);
  const [schoolError, setSchoolError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [schoolSuggestions, setSchoolSuggestions] = useState<School[]>([]);
  const [isSchoolSelected, setIsSchoolSelected] = useState(false);

  const openTermsModal = () => {
    setShowTermsModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  const openSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const validateId = async (idToCheck: string) => {
    try {
      const response = await axios.post(
        "https://www.neusenseback.com/checkid",
        { id: idToCheck }
      );

      if (response.status === 200) {
        console.log("아이디 사용 가능!");
        setIdDuplicateError(false);
      } else {
        console.error("아이디 중복.");
        setIdDuplicateError(true);
      }
    } catch (error) {
      console.error("아이디 중복 확인 중 오류 발생:", error);
      setIdDuplicateError(true);
    } finally {
      setIsCheckingId(false);
    }
  };

  const fetchSchoolSuggestions = async (searchQuery: string) => {
    try {
      const response = await axios.post(
        "https://www.neusenseback.com/api/school/name",
        { search: searchQuery },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.response) {
        setSchoolSuggestions(response.data.response);
      }
    } catch (error) {
      console.error("학교 검색 중 오류 발생:", error);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "id") {
      const isValidId = /^[A-Za-z0-9]{6,}$/.test(value);
      setIdError(!isValidId);

      if (!isCheckingId) {
        setIsCheckingId(true);
        validateId(value);
      }
    }

    if (name === "student_id") {
      const isValidStudentId = /^\d+$/.test(value);
      setStudentIdError(!isValidStudentId);
    } else if (name === "password" || name === "passwordCheck") {
      setPasswordError(false);
      setPasswordMatchError(formData.password !== value);
    } else if (name === "school") {
      setIsSchoolSelected(false); // 학교 입력 시 다시 목록 표시 가능하게 설정
      fetchSchoolSuggestions(value);
      const isUniversityIncluded = /대학교/.test(value);
      setSchoolError(!isUniversityIncluded);
    } else if (name === "department") {
      const isDepartmentIncluded = /학과|학부/.test(value);
      setDepartmentError(!isDepartmentIncluded);
    } else if (name === "phone_number") {
      const isValidPhoneNumber = /^010\d{8}$/.test(value);
      setPhoneError(!isValidPhoneNumber);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSchoolSelect = (school: string) => {
    setFormData((prevData) => ({
      ...prevData,
      school: school,
    }));
    handleChange({
      target: { name: "school", value: school },
    } as React.ChangeEvent<HTMLInputElement>);
    setSchoolSuggestions([]);
    setIsSchoolSelected(true); // 학교가 선택되었음을 설정
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isTermsChecked) {
      openTermsModal();
      return;
    }

    const isFormValid =
      formData.id &&
      formData.name &&
      formData.student_id &&
      formData.password &&
      formData.passwordCheck &&
      formData.email &&
      formData.school &&
      formData.phone_number &&
      formData.department &&
      !idError &&
      !studentIdError &&
      !passwordError &&
      !passwordMatchError &&
      !idDuplicateError &&
      !schoolError &&
      !departmentError &&
      !phoneError;

    if (!isFormValid) {
      alert("회원가입을 위해 모든 값을 입력해주세요.");
      return;
    }

    if (
      idError ||
      studentIdError ||
      passwordError ||
      passwordMatchError ||
      idDuplicateError ||
      schoolError ||
      departmentError ||
      phoneError
    ) {
      alert("입력 양식을 확인해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "https://www.neusenseback.com/register",
        formData
      );

      if (response.status === 200) {
        console.log("회원가입 성공!");
        setRegistrationMessage(response.data.msg);
        openSuccessModal();
      } else {
        console.error("회원가입 실패.");
      }
    } catch (error: unknown) {
      console.error("회원가입 중 오류 발생:", error);
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
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
                ? "Nursense에 회원가입하여 더 많은 서비스를 경험하세요."
                : "Log in to Nursense to experience more services."}
            </p>
            <form onSubmit={handleSubmit}>
              <label>
                <p> {selectedLanguage === "ko" ? "아이디" : "ID"}</p>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder={
                    selectedLanguage === "ko" ? "아이디 입력" : "Enter your ID"
                  }
                  style={{
                    borderColor: idError || idDuplicateError ? "#E94439" : "",
                    fontFamily: "Pretendard-Regular",
                  }}
                />
                {idError && (
                  <S.FormError>
                    {selectedLanguage === "ko"
                      ? "아이디는 ‘영문’ 또는 ‘숫자’가 포함된 최소 6글자 이상으로 만들어야 합니다."
                      : "The username must contain at least 6 characters with 'alphabetical' or 'numeric' characters included."}
                  </S.FormError>
                )}
                {idDuplicateError && (
                  <S.FormError>
                    {selectedLanguage === "ko"
                      ? "이미 사용중인 아이디 입니다"
                      : "The ID is already in use."}
                  </S.FormError>
                )}
              </label>
              <label>
                <p> {selectedLanguage === "ko" ? "이름" : "Name"}</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={
                    selectedLanguage === "ko" ? "이름 입력" : "Enter your name"
                  }
                  style={{ fontFamily: "Pretendard-Regular" }}
                />
              </label>
              <label>
                <p> {selectedLanguage === "ko" ? "학번" : "Student ID"}</p>
                <input
                  type="text"
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                  placeholder={
                    selectedLanguage === "ko"
                      ? "학번 입력"
                      : "Enter your student ID"
                  }
                  style={{
                    borderColor: studentIdError ? "#E94439" : "",
                    fontFamily: "Pretendard-Regular",
                  }}
                />
                {studentIdError && (
                  <S.FormError>
                    {selectedLanguage === "ko"
                      ? "학번은 숫자로만 입력되어야 합니다."
                      : "The student ID should only consist of numbers."}
                  </S.FormError>
                )}
              </label>
              <label>
                <p> {selectedLanguage === "ko" ? "비밀번호" : "Password"}</p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={
                    selectedLanguage === "ko"
                      ? "비밀번호 입력"
                      : "Enter your password"
                  }
                  style={{
                    borderColor: passwordMatchError ? "#E94439" : "",
                    fontFamily: "Pretendard-Regular",
                  }}
                />
              </label>
              <label>
                <input
                  type="password"
                  name="passwordCheck"
                  value={formData.passwordCheck}
                  onChange={handleChange}
                  placeholder={
                    selectedLanguage === "ko"
                      ? "비밀번호 재입력"
                      : "Enter your password again"
                  }
                  style={{
                    borderColor: passwordMatchError ? "#E94439" : "",
                    fontFamily: "Pretendard-Regular",
                  }}
                />
                {passwordMatchError && (
                  <S.FormError>
                    {selectedLanguage === "ko"
                      ? "비밀번호가 일치하지 않습니다."
                      : "The passwords do not match."}
                  </S.FormError>
                )}
              </label>
              <label>
                <p> {selectedLanguage === "ko" ? "이메일" : "E-mail"}</p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={
                    selectedLanguage === "ko"
                      ? "이메일 입력"
                      : "Enter your E-mail"
                  }
                  style={{ fontFamily: "Pretendard-Regular" }}
                />
              </label>
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
              <label>
                <p> {selectedLanguage === "ko" ? "학교" : "School"}</p>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder={
                    selectedLanguage === "ko"
                      ? "학교명 입력"
                      : "Enter your school name"
                  }
                  style={{ fontFamily: "Pretendard-Regular" }}
                />
                {formData.school &&
                  schoolSuggestions.length > 0 &&
                  !isSchoolSelected && (
                    <S.SchoolSuggestions>
                      {schoolSuggestions.map((school, index) => (
                        <S.SchoolSuggestionItem key={index}>
                          <span>{school.school_name}</span>
                          <S.SelectButton
                            onClick={() =>
                              handleSchoolSelect(school.school_name)
                            }
                          >
                            {selectedLanguage === "ko" ? "선택" : "Select"}
                          </S.SelectButton>
                        </S.SchoolSuggestionItem>
                      ))}
                    </S.SchoolSuggestions>
                  )}
              </label>
              <label>
                <p>
                  {selectedLanguage === "ko"
                    ? "학과(학부)"
                    : "Department (Undergraduate)"}
                </p>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder={
                    selectedLanguage === "ko"
                      ? "학과(학부) 입력"
                      : "Enter your Department (Undergraduate)"
                  }
                  style={{
                    borderColor: departmentError ? "#E94439" : "",
                    fontFamily: "Pretendard-Regular",
                  }}
                />
                {departmentError && (
                  <S.FormError>
                    {selectedLanguage === "ko"
                      ? "잘못된 학과(학부) 명 입니다. ‘OO학과(또는 학부)’ 와 같이 전체 학과(학부) 명을 작성해야 합니다."
                      : "The department name entered is incorrect. Please enter the full department name such as 'Department of OO (or Undergraduate Program).'"}
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
                {selectedLanguage === "ko" ? "가입하기" : "Confirm"}
              </S.RegiSubmitButton>
            </form>
            {showTermsModal && (
              <TermsModal
                message={
                  selectedLanguage === "ko"
                    ? "서비스 이용약관 및 개인정보 취급방침을"
                    : "Please review and agree to the"
                }
                message2={
                  selectedLanguage === "ko"
                    ? "확인 후, 동의해주세요."
                    : "Terms of Service and Privacy Policy."
                }
                closeTermsModal={closeTermsModal}
              />
            )}
            {showSuccessModal && (
              <SuccessModal closeModal={closeSuccessModal} />
            )}
          </S.RegistrationForm>
        </S.RegisterWrapper>
        <LoginFooter />
      </div>
      {isPolicyModalOpen && <Policy onClose={closePolicyModal} />}
    </>
  );
};

export default Register;
