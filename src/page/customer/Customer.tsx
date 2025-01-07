import React, { useState, ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";
import styled from "styled-components";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useLanguage } from "../../context/LanguageContext";
import * as S from "./Customer.style";

interface FormData {
  company: string;
  name: string;
  contact: string;
  email: string;
  message: string;
}

const Customer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    name: "",
    contact: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const templateParams = {
      company: formData.company,
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_pfo3dhs",
        "template_khihogj",
        templateParams,
        "RkqGFFEa2IcswbJf7"
      )
      .then(
        (result) => {
          alert("성공적으로 전송되었습니다 \n빠른시일내로 회신드리겠습니다");
        },
        (error) => {
          console.log(error.text);
        }
      );
    setFormData({
      company: "",
      name: "",
      contact: "",
      email: "",
      message: "",
    });
  };

  const { selectedLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage);
  };

  return (
    <>
      <Header onLanguageChange={handleLanguageChange} />
      <S.CustomerContainer>
        <S.CustomerWrapper>
          <S.ContactLogoWrapper>
            <img src={`${process.env.PUBLIC_URL}/img/nsLogo.png`} alt="Logo" />
          </S.ContactLogoWrapper>
          <S.ContactWrapper>
            <form onSubmit={handleSubmit}>
              <label>
                {selectedLanguage === "ko" ? "회사명" : "Company name"}
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </label>
              <label>
                {selectedLanguage === "ko" ? "성함" : "Name"}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                {selectedLanguage === "ko" ? "연락처" : "Phone number"}
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </label>
              <label>
                {selectedLanguage === "ko" ? "이메일" : "E-mail"}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                {selectedLanguage === "ko" ? "문의내용" : "Inquiry content"}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </label>
              <S.ContactSubmit type="submit">
                {selectedLanguage === "ko" ? "전송하기" : "Send"}
              </S.ContactSubmit>
            </form>
          </S.ContactWrapper>
        </S.CustomerWrapper>
      </S.CustomerContainer>
      <Footer />
    </>
  );
};

export default Customer;
