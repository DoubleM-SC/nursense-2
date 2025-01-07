import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../styles/App.css";
import DeleteLearnerModal from "../modal/DeleteLearnerModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../../page/cookies";
import { RootState } from "../../store/store";
import { Table } from "react-bootstrap";
import axiosInstance from "../../apis/axiosInstance";

const CourseContainer = styled.div`
  display: flex;
  position: relative;
  width: 76vw;
  margin: auto;
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  margin-top: 90px;
  justify-content: flex-start;
  flex-direction: column;
  padding-bottom: 20px;
  padding-top: 10px;
  padding-left: 45px;
  padding-right: 45px;
  @media (max-width: 768px) {
    width: 90vw;
    margin-top: 50px;
  }

  @media (max-width: 480px) {
    width: 95vw;
    margin-top: 30px;
  }
`;

const CourseTitle = styled.h2`
  color: #078675;
  padding: 10px 10px;

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 10px 10px;
    font-size: 1.2rem;
  }
`;

const CourseSearch = styled.input`
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

const CourseSearchBtn = styled.button`
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

const SearchBar = styled.div`
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

const TableWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  overflow-x: auto;
  position: relative;
`;

const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledTable = styled(Table)`
  /* padding-right: 50px; */
  width: 100%;
  table-layout: fixed;
  margin-top: 20px;
  min-width: 2400px;
  margin-left: 780px;
  /* margin-right: 50px; */
  /* margin-left: 120%; */

  @media (max-width: 2100px) {
    min-width: 2300px;
    margin-left: 770px;
  }
  @media (max-width: 1930px) {
    min-width: 2200px;
    margin-left: 740px;
  }
  @media (max-width: 1850px) {
    min-width: 2150px;
    margin-left: 780px;
  }
  @media (max-width: 1780px) {
    min-width: 2050px;
    margin-left: 740px;
  }
  @media (max-width: 1710px) {
    min-width: 2000px;
    margin-left: 730px;
  }
  @media (max-width: 1650px) {
    min-width: 1900px;
    margin-left: 700px;
  }
  @media (max-width: 1600px) {
    min-width: 1850px;
    margin-left: 680px;
  }
  @media (max-width: 1520px) {
    min-width: 1750px;
    margin-left: 640px;
  }

  @media (max-width: 1445px) {
    min-width: 1680px;
    margin-left: 620px;
  }
`;

const TableHeader = styled.thead``;

const TableHeaderCell = styled.th<{ width?: string }>`
  padding: 10px;
  font-weight: 600;
  color: #078675;
  border-bottom: 1px solid #dee2e6;
  width: ${(props) => props.width || "auto"};
`;

const TableBody = styled.tbody``;

const TableBodyCell = styled.td<{ width?: string }>`
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

const CourseName = styled.h3`
  color: #078675;
  padding: 0px 10px;
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

const LearnerCnt = styled.h3`
  color: #078675;
  padding: 0px 10px;
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

const LearnContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ManagementBtn = styled.button`
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
const CompleteNum = styled.span`
  font-weight: 600;
  color: #067264;
`;
const WarningNum = styled.span`
  font-weight: 600;
  color: #e94439;
`;
const NonCompleteNum = styled.span`
  font-weight: 600;
  color: #c4c4c4;
`;
const courseNameWidth = "19%";

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
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

const NoCoursesMessage = styled.div`
  padding: 20px;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
`;

interface Learner {
  student_id: number;
  student_name: string;
  student_school: string;
  student_department: string;
  student_number: string;
  total_completion: number;
  total_lateness: number;
  total_incompletion: number;
  weekly_status: {
    completion: number;
    lateness: number;
  }[];
}

interface Course {
  course_id: number;
  course_code: string;
}

const LearningStatusList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const token = useSelector((state: RootState) => state.user?.token);
  const { courseId } = useParams<{ courseId: string }>();
  const [learners, setLearners] = useState<Learner[]>([]);
  const totalItems = learners.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const location = useLocation();
  const { courseName } = location.state as { courseName: string };
  const [courses, setCourses] = useState<Course[]>([]);
  const refreshToken = getTokenFromCookie("refreshToken");
  let navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationButton
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationButton>
      );
    }
    return pages;
  };

  const fetchLearningStatus = async () => {
    try {
      const response = await axiosInstance.get(
        `https://www.neusenseback.com/professor/course/learning-status?courseId=${courseId}`
      );
      setLearners(response.data.response);
      console.log("Initial Data:", response.data.response);
    } catch (error) {
      console.error("Error fetching learning status: ", error);
    }
  };

  useEffect(() => {
    fetchLearningStatus();
  }, [courseId]);

  const handleSearchStudent = async () => {
    const searchQuery = (
      document.getElementById("studentSearchInput") as HTMLInputElement
    ).value;
    try {
      const response = await axiosInstance.post(
        "https://www.neusenseback.com/professor/search/student",
        {
          courseId,
          search: searchQuery,
        }
      );
      if (response.status === 200 && response.data.success) {
        setLearners(response.data.response);
        console.log("교수 - 학습 현황 목록 검색 : ", response.data.response);
      } else {
        setLearners([]);
        console.error("Search failed: ", response.data);
      }
    } catch (error) {
      setLearners([]);
      console.error("Error during search: ", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchStudent();
    }
  };

  const getStatus = (completion: number, lateness: number) => {
    if (completion === 1) return <CompleteNum>완료</CompleteNum>;
    if (lateness === 1) return <WarningNum>지각</WarningNum>;
    return <NonCompleteNum>미완료</NonCompleteNum>;
  };

  const displayedLearners = learners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get(
        "https://www.neusenseback.com/student/course"
      );
      console.log("CourseList의 get course 임", response.data);
      setCourses(response.data.response);
    } catch (error) {
      console.log("마이페이지 - 강의 리스트 불러오기 실패함");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [token, refreshToken]);

  const currentCourse = courses.find(
    (course) => course.course_id === Number(courseId)
  );

  return (
    <CourseContainer>
      <CourseHeader>
        <LearnContent>
          <CourseTitle>학습 현황 목록</CourseTitle>
          <ManagementBtn
            onClick={() => {
              navigate("/professorpage");
            }}
          >
            수강관리
          </ManagementBtn>
          <CourseName>
            강의명 :
            <span>
              {" "}
              {courseName} {currentCourse?.course_code}
            </span>
          </CourseName>
          <LearnerCnt>
            학습자 : <span>{learners.length}명</span>
          </LearnerCnt>
        </LearnContent>
        <SearchBar>
          <CourseSearch
            id="studentSearchInput"
            placeholder="학습자명 또는 학번"
            onKeyDown={handleKeyDown}
          />
          <CourseSearchBtn onClick={handleSearchStudent}>검색</CourseSearchBtn>
        </SearchBar>
      </CourseHeader>
      <TableWrapper>
        <StyledTable>
          <TableHeader>
            <tr>
              <TableHeaderCell width="5%">순번</TableHeaderCell>
              <TableHeaderCell width="10%">이름</TableHeaderCell>
              <TableHeaderCell width="10%">소속(대학)</TableHeaderCell>
              <TableHeaderCell width="10%">학과</TableHeaderCell>
              <TableHeaderCell width="10%">학번</TableHeaderCell>
              <TableHeaderCell width={courseNameWidth}>상태</TableHeaderCell>
              <TableHeaderCell width="8%">1주차</TableHeaderCell>
              <TableHeaderCell width="8%">2주차</TableHeaderCell>
              <TableHeaderCell className="hidden-col" width="8%">
                3주차
              </TableHeaderCell>
              <TableHeaderCell className="hidden-col" width="8%">
                4주차
              </TableHeaderCell>
              <TableHeaderCell className="hidden-col" width="8%">
                5주차
              </TableHeaderCell>
              <TableHeaderCell className="hidden-col" width="8%">
                6주차
              </TableHeaderCell>
              <TableHeaderCell className="hidden-col" width="8%">
                7주차
              </TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {learners.length === 0 ? (
              <tr>
                <td colSpan={13}>
                  <NoCoursesMessage>
                    조건에 맞는 수강생이 없습니다.
                  </NoCoursesMessage>
                </td>
              </tr>
            ) : (
              displayedLearners.map((learner, index) => (
                <tr key={learner.student_id}>
                  <TableBodyCell>
                    {String(
                      (currentPage - 1) * itemsPerPage + index + 1
                    ).padStart(3, "0")}
                  </TableBodyCell>
                  <TableBodyCell>{learner.student_name || "N/A"}</TableBodyCell>
                  <TableBodyCell>
                    {learner.student_school || "N/A"}
                  </TableBodyCell>
                  <TableBodyCell>
                    {learner.student_department || "N/A"}
                  </TableBodyCell>
                  <TableBodyCell>
                    {learner.student_number || "N/A"}
                  </TableBodyCell>
                  <TableBodyCell>
                    완료 :{" "}
                    <CompleteNum>{learner?.total_completion}</CompleteNum>
                    　　지각 :
                    <WarningNum> {learner?.total_lateness}</WarningNum>
                    　　미완료 :{" "}
                    <NonCompleteNum>
                      {learner?.total_incompletion}
                    </NonCompleteNum>
                    　　
                  </TableBodyCell>
                  <TableBodyCell>
                    <CompleteNum>
                      {learner.weekly_status &&
                        learner.weekly_status[0] &&
                        getStatus(
                          learner.weekly_status[0].completion,
                          learner.weekly_status[0].lateness
                        )}
                    </CompleteNum>
                  </TableBodyCell>
                  <TableBodyCell>
                    <CompleteNum>
                      {learner.weekly_status &&
                        learner.weekly_status[1] &&
                        getStatus(
                          learner.weekly_status[1].completion,
                          learner.weekly_status[1].lateness
                        )}
                    </CompleteNum>
                  </TableBodyCell>
                  <TableBodyCell className="hidden-col">
                    <CompleteNum>
                      {learner.weekly_status &&
                        learner.weekly_status[2] &&
                        getStatus(
                          learner.weekly_status[2].completion,
                          learner.weekly_status[2].lateness
                        )}
                    </CompleteNum>
                  </TableBodyCell>
                  <TableBodyCell className="hidden-col">
                    <CompleteNum>
                      {learner.weekly_status &&
                        learner.weekly_status[3] &&
                        getStatus(
                          learner.weekly_status[3].completion,
                          learner.weekly_status[3].lateness
                        )}
                    </CompleteNum>
                  </TableBodyCell>
                  <TableBodyCell className="hidden-col">
                    <CompleteNum>
                      {learner.weekly_status &&
                        learner.weekly_status[4] &&
                        getStatus(
                          learner.weekly_status[4].completion,
                          learner.weekly_status[4].lateness
                        )}
                    </CompleteNum>
                  </TableBodyCell>
                  <TableBodyCell className="hidden-col">
                    <CompleteNum>
                      {learner.weekly_status &&
                        learner.weekly_status[5] &&
                        getStatus(
                          learner.weekly_status[5].completion,
                          learner.weekly_status[5].lateness
                        )}
                    </CompleteNum>
                  </TableBodyCell>
                  <TableBodyCell className="hidden-col">
                    <CompleteNum>
                      {learner.weekly_status &&
                        learner.weekly_status[6] &&
                        getStatus(
                          learner.weekly_status[6].completion,
                          learner.weekly_status[6].lateness
                        )}
                    </CompleteNum>
                  </TableBodyCell>
                </tr>
              ))
            )}
          </TableBody>
        </StyledTable>
      </TableWrapper>
      <Pagination>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </PaginationButton>
        {renderPageNumbers()}
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </PaginationButton>
      </Pagination>
    </CourseContainer>
  );
};

export default LearningStatusList;
