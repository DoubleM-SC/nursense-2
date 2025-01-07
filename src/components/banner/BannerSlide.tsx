import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import * as S from "./BannerSlide.style";

const BannerSlide: React.FC = () => {
  const { selectedLanguage, changeLanguage } = useLanguage();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const banner1 = selectedLanguage === "ko" ? "1.jpg" : "1.jpg";
  const banner2 = selectedLanguage === "ko" ? "2.jpg" : "2.jpg";
  const banner3 = selectedLanguage === "ko" ? "3.jpg" : "3.jpg";
  const banner4 = selectedLanguage === "ko" ? "4.jpg" : "4.jpg";

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage);
  };

  return (
    <S.SlideContainer>
      <S.SlideWrapper>
        <Slider {...settings}>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/img/${banner1}`}
              alt="Slide1"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/img/${banner2}`}
              alt="Slide2"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/img/${banner3}`}
              alt="Slide3"
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/img/${banner4}`}
              alt="Slide4"
            />
          </div>
        </Slider>
      </S.SlideWrapper>
    </S.SlideContainer>
  );
};

export default BannerSlide;
