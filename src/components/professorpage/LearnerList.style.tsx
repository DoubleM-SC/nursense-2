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
  padding-top: 10px;

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    width: 30vw;
  }

  @media (max-width: 480px) {
    width: 50vw;
  }
`;

export const CourseSearchBtn = styled.button`
  width: 4vw;
  height: 3vh;
  background-color: #078675;
  border: none;
  color: #fff;
  font-weight: 500;
  font-size: 0.8rem;
  font-family: "Pretendard-regular";
  border-radius: 7px;
  margin: 2%;
  cursor: pointer;
  &:hover {
    background-color: #067264;
  }
  @media (max-width: 1580px) {
    width: 4vw;
    margin-right: 1px;
    font-size: 0.8rem;
  }
  @media (max-width: 768px) {
    width: 8vw;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 10vw;
    font-size: 0.8rem;
  }
`;

export const EnrolmentBtn = styled.button`
  width: 8.5vw;
  height: 3.2vh;
  background-color: #078675;
  border: none;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  font-family: "Pretendard-regular";
  border-radius: 7px;
  margin: 2%;
  cursor: pointer;

  @media (max-width: 768px) {
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
  margin-top: 43px;
  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

export const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledTable = styled.table`
  width: 94%;
  table-layout: fixed;
  margin-top: 20px;
  border-collapse: collapse;
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
  padding: 11px;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
  width: ${(props) => props.width || "auto"};
  input {
    accent-color: #078675;
    background-color: #078675;
    border-color: #078675;
    transform: scale(1.5);
    cursor: pointer;
  }
  @media (max-width: 1200px) {
    transform: scale(1);
    font-size: 11px;
  }
  @media (max-width: 1000px) {
    transform: scale(1);
    font-size: 9px;
  }
  @media (max-width: 768px) {
    transform: scale(0.7) !important;
  }

  @media (max-width: 530px) {
    transform: scale(0.5) !important;
    font-size: 5px;
  }
`;

export const CourseName = styled.h3`
  color: #078675;
  padding: 0px 40px;
  margin-top: 10px;
  margin-bottom: -10px;

  span {
    color: #484848;
    font-weight: 100;
  }
  @media (max-width: 768px) {
    padding: 10px 15px;
    margin-top: -15px;
    margin-bottom: 0px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 10px 15px;
    margin-top: -15px;
    margin-bottom: -10px;
    font-size: 1rem;
  }
`;

export const LearnerCnt = styled.h3`
  color: #078675;
  padding: 0px 40px;
  span {
    color: #484848;
    font-weight: 100;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    margin-top: -15px;
    margin-bottom: 0px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 10px 15px;
    margin-top: -15px;
    margin-bottom: 0px;
    font-size: 1rem;
  }
`;

export const LearnContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const SelectedDelete = styled.button<{ checked: boolean }>`
  width: 9rem;
  height: 2.8rem;
  background-color: ${(props) => (props.checked ? "#E94439" : "#C4C4C4")};
  border: none;
  color: #fff;
  font-weight: 400;
  font-size: 15px;
  font-family: "Pretendard-regular";
  border-radius: 6px;
  margin: 2%;
  cursor: ${(props) => (props.checked ? "pointer" : "not-allowed")};
  position: absolute;
  bottom: 29px;
  right: 1px;
  &:hover {
    background-color: ${(props) => (props.checked ? "#CC0000" : "#C4C4C4")};
  }

  @media (min-width: 2200px) {
    width: 7vw;
    font-size: 15px;
    right: -2px;
    top: 90px;
    background-color: c4c4c4;
  }
  @media (max-width: 2200px) {
    width: 7vw;
    font-size: 14px;
    right: -2px;
    top: 90px;
  }

  @media (max-width: 2000px) {
    width: 7vw;
    font-size: 13px;
    right: -2px;
    top: 90px;
  }

  @media (max-width: 480px) {
    width: 12vw;
    font-size: 10px;
    bottom: 10px;
    right: 1px;
  }
`;

export const ManagementBtn = styled.button`
  width: 8rem;
  height: 2rem;
  background-color: #078675;
  border: none;
  color: #fff;
  font-weight: 400;
  font-size: 0.9rem;
  font-family: "Pretendard-regular";
  border-radius: 6px;
  margin: 2%;
  cursor: pointer;
  position: absolute;
  top: -20px;
  right: -2px;
  &:hover {
    background-color: #067264;
  }
  @media (max-width: 2000px) {
    width: 8rem;
    font-size: 0.9rem;
    top: -20px;
  }
  @media (max-width: 1000px) {
    width: 7rem;
    font-size: 0.7rem;
    right: 8px;
    top: -10px;
  }
  @media (max-width: 480px) {
    width: 5rem;
    font-size: 0.6rem;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  font-size: 15px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#078675" : "#495057")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  margin: 0 5px;

  &:disabled {
    cursor: not-allowed;
    color: #ccc;
  }
  @media (max-width: 1080px) {
    font-size: 12px;
  }
  @media (max-width: 720px) {
    font-size: 8px;
  }
`;

export const courseNameWidth = "19%";

export const NoCoursesMessage = styled.div`
  padding: 20px;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
`;
