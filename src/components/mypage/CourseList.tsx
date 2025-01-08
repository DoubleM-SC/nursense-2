import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import "../../styles/App.css";
import ApplicationModal from "../modal/ApplicationModal";
import { useSelector } from "react-redux";
import axios from "axios";
import { getTokenFromCookie } from "../../page/cookies";
import { RootState } from "../../store/store";
import axiosInstance from "../../apis/axiosInstance";

const CourseContainer = styled.div`
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

const CourseTitle = styled.h2`
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

  @media only screen and (max-width: 768px) {
    width: 30vw;
  }

  @media (max-width: 480px) {
    width: 50vw;
  }
`;

const CourseSearchBtn = styled.button`
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

const EnrolmentBtn = styled.button`
  width: 7.8vw;
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

  @media only screen and (max-width: 768px) {
    width: 8vw;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 12vw;
    font-size: 0.8rem;
  }
`;

const SearchBar = styled.div`
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

const TableWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    overflow-x: auto;
  }
`;

const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledTable = styled(Table)`
  width: 96%;
  table-layout: fixed;
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
  padding: 4px;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
  width: ${(props) => props.width || "auto"};
`;

const NoEnrollBtn = styled.button`
  width: 7.8vw;
  height: 3.2vh;
  background-color: #c4c4c4;
  border: none;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  font-family: "Pretendard-regular";
  border-radius: 7px;
  margin: 2%;

  @media only screen and (max-width: 768px) {
    width: 8vw;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 12vw;
    font-size: 0.8rem;
  }
`;

const NoCoursesMessage = styled.div`
  padding: 20px;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
`;

interface Course {
  course_id: string;
  category: string;
  course_name: string;
  course_code: string;
  professor_name: string;
  schedule: string;
  enrolled_students: number;
  max_students: number;
  is_enrolled: number;
}

interface CourseListProps {
  setEnrollmentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseList: React.FC<CourseListProps> = ({ setEnrollmentSuccess }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.user?.token);
  const refreshToken = getTokenFromCookie("refreshToken");

  const handleEnrolmentClick = (courseId: string) => {
    setSelectedCourseId(courseId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmEnroll = async () => {
    try {
      const response = await axiosInstance.post(
        "https://www.neusenseback.com/student/enroll",
        {
          course_id: selectedCourseId,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     "x-refresh-token": refreshToken || "",
        //     accept: "application/json",
        //   },
        // }
      );

      if (response.status === 200 && response.data.success) {
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.course_id === selectedCourseId
              ? {
                  ...course,
                  is_enrolled: 1,
                  enrolled_students: course.enrolled_students + 1,
                }
              : course
          )
        ); // 수강신청 성공 시 상태 업데이트
        setEnrollmentSuccess(true); // 상태 변경 유발
        setShowModal(false);
      } else {
        console.error("수강신청에 실패했습니다.", response.data);
      }
    } catch (error) {
      console.error("수강신청 중 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get(
          "https://www.neusenseback.com/student/course"
        );
        console.log("CourseList의 get course 임");
        setCourses(response.data.response);
      } catch (error) {
        console.log("마이페이지 - 강의 리스트 불러오기 실패함");
      }
    };
    fetchCourses();
  }, [token, refreshToken]);

  const handleSearch = async () => {
    const searchQuery = (
      document.getElementById("courseSearchInput") as HTMLInputElement
    ).value;
    try {
      const response = await axiosInstance.post(
        "https://www.neusenseback.com/student/search/course",
        {
          search: searchQuery,
        }
      );

      if (response.status === 200 && response.data.success) {
        setCourses(response.data.response);
      } else {
        setCourses([]);
        console.error("검색에 실패했습니다.", response.data);
      }
    } catch (error) {
      setCourses([]);
      console.error("검색 중 오류가 발생했습니다.", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <CourseContainer>
      <CourseHeader>
        <CourseTitle>수강신청</CourseTitle>
        <SearchBar>
          <CourseSearch
            id="courseSearchInput"
            placeholder="강의명 또는 담당교수명"
            onKeyDown={handleKeyDown}
          />
          <CourseSearchBtn onClick={handleSearch}>검색</CourseSearchBtn>
        </SearchBar>
      </CourseHeader>
      <TableWrapper>
        <StyledTable>
          <TableHeader>
            <tr>
              <TableHeaderCell width="10%">순번</TableHeaderCell>
              <TableHeaderCell width="10%">구분</TableHeaderCell>
              <TableHeaderCell width="10%">강의 명</TableHeaderCell>
              <TableHeaderCell width="10%">학수번호</TableHeaderCell>
              <TableHeaderCell width="10%">담당교수</TableHeaderCell>
              <TableHeaderCell width="10%">강의시간</TableHeaderCell>
              <TableHeaderCell width="10%">정원</TableHeaderCell>
              <TableHeaderCell width="10%">수강신청</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={9}>
                  <NoCoursesMessage>
                    조건에 맞는 수강목록이 없습니다.
                  </NoCoursesMessage>
                </td>
              </tr>
            ) : (
              courses.map((course, index) => (
                <tr key={course.course_id}>
                  <TableBodyCell>
                    {String(index + 1).padStart(3, "0")}
                  </TableBodyCell>
                  <TableBodyCell>{course.category}</TableBodyCell>
                  <TableBodyCell>{course.course_name}</TableBodyCell>
                  <TableBodyCell>{course.course_code}</TableBodyCell>
                  <TableBodyCell>{course.professor_name}</TableBodyCell>
                  <TableBodyCell>{course.schedule}</TableBodyCell>
                  <TableBodyCell>
                    {course.enrolled_students} / {course.max_students}
                  </TableBodyCell>
                  <TableBodyCell>
                    {course.enrolled_students === course.max_students ? (
                      <NoEnrollBtn>신청불가</NoEnrollBtn>
                    ) : course.is_enrolled === 0 ? (
                      <EnrolmentBtn
                        onClick={() => {
                          handleEnrolmentClick(course.course_id);
                        }}
                      >
                        수강신청
                      </EnrolmentBtn>
                    ) : (
                      <NoEnrollBtn>신청완료</NoEnrollBtn>
                    )}
                  </TableBodyCell>
                </tr>
              ))
            )}
          </TableBody>
        </StyledTable>
      </TableWrapper>
      {showModal && (
        <ApplicationModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmEnroll}
        />
      )}
    </CourseContainer>
  );
};

export default CourseList;
