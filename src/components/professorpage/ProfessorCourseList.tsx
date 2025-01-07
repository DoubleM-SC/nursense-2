import React, { useEffect, useState, KeyboardEvent } from "react";
import "../../styles/App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axiosInstance from "../../apis/axiosInstance";
import * as S from "./ProfessorCourseList.style";

interface Course {
  course_id: number;
  category: string;
  course_name: string;
  course_code: string;
  professor_name: string;
  schedule: string;
  enrolled_students: number;
  max_students: number;
}

const ProfessorCourseList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [courses, setCourses] = useState<Course[]>([]);
  const token = useSelector((state: RootState) => state.user?.token);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get(
          "https://www.neusenseback.com/professor/course"
        );
        setCourses(response.data.response);
        sessionStorage.setItem(
          "courses",
          JSON.stringify(response.data.response)
        );
      } catch (error) {
        console.error("professor/course 연동 실패임: ", error);
      }
    };

    fetchCourses();
  }, [token]);

  useEffect(() => {
    if (location.pathname === "/professorpage") {
      const storedCourses = sessionStorage.getItem("courses");
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses));
      } else {
        const fetchCourses = async () => {
          try {
            const response = await axiosInstance.get(
              "https://www.neusenseback.com/professor/course"
            );
            setCourses(response.data.response);
            sessionStorage.setItem(
              "courses",
              JSON.stringify(response.data.response)
            );
          } catch (error) {
            console.error("Failed to fetch courses", error);
          }
        };

        fetchCourses();
      }
    }
  }, [location.pathname, token]);

  const handleSearch = async () => {
    const searchQuery = (
      document.getElementById("courseSearchInput") as HTMLInputElement
    ).value;
    try {
      const response = await axiosInstance.post(
        "https://www.neusenseback.com/professor/search/course",
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

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <S.CourseContainer>
        <S.CourseHeader>
          <S.CourseTitle>수강관리</S.CourseTitle>
          <S.SearchBar>
            <S.CourseSearch
              id="courseSearchInput"
              placeholder="강의명"
              onKeyDown={handleKeyDown}
            />
            <S.CourseSearchBtn onClick={handleSearch}>검색</S.CourseSearchBtn>
          </S.SearchBar>
        </S.CourseHeader>
        <S.TableWrapper>
          <S.StyledTable>
            <S.TableHeader>
              <tr>
                <S.TableHeaderCell width="10%">순번</S.TableHeaderCell>
                <S.TableHeaderCell width="10%">구분</S.TableHeaderCell>
                <S.TableHeaderCell width={S.courseNameWidth}>
                  강의 명
                </S.TableHeaderCell>
                <S.TableHeaderCell width="10%">학수번호</S.TableHeaderCell>
                <S.TableHeaderCell width="10%">담당교수</S.TableHeaderCell>
                <S.TableHeaderCell width="10%">강의시간</S.TableHeaderCell>
                <S.TableHeaderCell width="10%">정원</S.TableHeaderCell>
                <S.TableHeaderCell width="10%">학습자 목록</S.TableHeaderCell>
                <S.TableHeaderCell width="10%">학습 현황</S.TableHeaderCell>
              </tr>
            </S.TableHeader>
            <S.TableBody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <S.NoCoursesMessage>
                      조건에 맞는 수강목록이 없습니다.
                    </S.NoCoursesMessage>
                  </td>
                </tr>
              ) : (
                courses.map((course, index) => (
                  <tr key={course.course_id}>
                    <S.TableBodyCell>
                      {String(index + 1).padStart(3, "0")}
                    </S.TableBodyCell>
                    <S.TableBodyCell>{course.category}</S.TableBodyCell>
                    <S.TableBodyCell>{course.course_name}</S.TableBodyCell>
                    <S.TableBodyCell>{course.course_code}</S.TableBodyCell>
                    <S.TableBodyCell>{course.professor_name}</S.TableBodyCell>
                    <S.TableBodyCell>{course.schedule}</S.TableBodyCell>
                    <S.TableBodyCell>
                      {course.enrolled_students} / {course.max_students}
                    </S.TableBodyCell>
                    <S.TableBodyCell>
                      <S.EnrolmentBtn
                        onClick={() =>
                          navigate(
                            `/professorpage/learner-list/${course.course_id}`,
                            { state: { courseName: course.course_name } }
                          )
                        }
                      >
                        학습자 목록
                      </S.EnrolmentBtn>
                    </S.TableBodyCell>
                    <S.TableBodyCell>
                      <S.EnrolmentBtn
                        onClick={() =>
                          navigate(
                            `/professorpage/learning-status-list/${course.course_id}`,
                            { state: { courseName: course.course_name } }
                          )
                        }
                      >
                        학습 현황 목록
                      </S.EnrolmentBtn>
                    </S.TableBodyCell>
                  </tr>
                ))
              )}
            </S.TableBody>
          </S.StyledTable>
        </S.TableWrapper>
      </S.CourseContainer>
      <Outlet />
    </>
  );
};

export default ProfessorCourseList;
