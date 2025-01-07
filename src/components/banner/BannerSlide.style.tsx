import styled from "styled-components";

export const SlideContainer = styled.div`
  z-index: 1;
`;

export const SlideWrapper = styled.div`
  margin-top: 2%;

  &:hover {
    cursor: pointer;
  }

  .slick-slide img {
    width: 100vw;
    height: 45vh;
    object-fit: cover;

    @media only screen and (max-width: 600px) {
    width: 100vw;
    height: auto;
    object-fit: cover;
  }
  /* 반응형 추가 */
  }

  .slick-dots li button::before {
    font-size: 10px;
    color: #e6e6e6;
  }

  .slick-dots li.slick-active button::before {
    color: #000;
  }
`;
