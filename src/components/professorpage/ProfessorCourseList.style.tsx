import { Table } from "react-bootstrap";
import styled from "styled-components";

export const CourseContainer = styled.div`
  display: flex;
  position: relative;
  width: 80vw;
  margin: auto;
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  margin-top: 90px;
  justify-content: flex-start;
  flex-direction: column;
  padding-bottom: 20px;

  @media only screen and (max-width: 768px) {
    width: 90vw;
    margin-top: 50px;
  }

  @media (max-width: 480px) {
    width: 95vw;
    margin-top: 30px;
  }
`;

export const CourseTitle = styled.h2`
  color: #078675;
  padding: 10px 40px;

  @media only screen and (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 10px 10px;
    font-size: 1.2rem;
  }
`;

export const CourseSearch = styled.input`
  display: block;
  width: 18vw;
  height: 2.5vh;
  border: 1px solid #078675;
  margin-top: 2%;
  margin-bottom: 2%;
  border-radius: 5px;
  outline: none;
  font-size: 0.9rem;
  font-family: "Pretendard-regular";
  color: #078675;
  padding-left: 10px;
  ::placeholder {
    color: #aaa;
    font-style: italic;
  }

  @media only screen and (max-width: 768px) {
    width: 30vw;
  }

  @media (max-width: 480px) {
    width: 50vw;
  }
`;

export const CourseSearchBtn = styled.button`
  width: 5vw;
  height: 3vh;
  background-color: #078675;
  border: none;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  font-family: "Pretendard-regular";
  border-radius: 7px;
  margin: 2%;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    width: 8vw;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 12vw;
    font-size: 0.8rem;
  }
`;

export const EnrolmentBtn = styled.button`
  width: 7.4vw;
  height: 3.4vh;
  background-color: #078675;
  border: none;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  font-family: "Pretendard-regular";
  border-radius: 7px;
  margin: 2%;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    width: 8vw;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 12vw;
    font-size: 0.8rem;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  margin: 20px;

  @media only screen and (max-width: 768px) {
    margin: 10px;
  }

  @media (max-width: 480px) {
    margin: 5px;
    flex-direction: column;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    overflow-x: auto;
  }
`;

export const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledTable = styled(Table)`
  width: 96%;
  table-layout: fixed;
`;

export const TableHeader = styled.thead``;

export const TableHeaderCell = styled.th<{ width?: string }>`
  padding: 10px;
  font-weight: 600;
  color: #078675;
  border-bottom: 1px solid #dee2e6;
  width: ${(props) => props.width || "auto"};
`;

export const TableBody = styled.tbody``;

export const TableBodyCell = styled.td<{ width?: string }>`
  padding: 4px;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
  width: ${(props) => props.width || "auto"};
`;

export const courseNameWidth = "20%";

export const NoCoursesMessage = styled.div`
  padding: 20px;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
`;
