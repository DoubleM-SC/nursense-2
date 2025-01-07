import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import BannerSlide from "../../components/banner/BannerSlide";
import ContentSlide from "../../components/ContentSlide";
import Footer from "../../layouts/Footer";
import Popup from "../../components/Popup";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/App.css";

const Main: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false); // 팝업을 보여줄지 여부를 관리하는 state
  const { selectedLanguage, changeLanguage } = useLanguage(); // LanguageContext에서 상태와 함수 가져오기

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage);
  };

  // 팝업을 띄우는 함수
  const openPopup = () => {
    setShowPopup(true);
  };

  // 컴포넌트가 마운트되면 팝업을 띄웁니다.
  useEffect(() => {
    openPopup();
  }, []);

  return (
    <>
      <div className="mainContainer">
        <div className="mainWrapper">
          <Header onLanguageChange={handleLanguageChange} />
          <BannerSlide />
          <ContentSlide />
          <Footer />
        </div>
      </div>
      {showPopup && <Popup />}
    </>
  );
};

export default Main;
