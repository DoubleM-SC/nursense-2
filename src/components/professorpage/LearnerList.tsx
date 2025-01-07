import React, { useState, useEffect } from "react";
import "../../styles/App.css";
import DeleteLearnerModal from "../modal/DeleteLearnerModal";
import { useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../../page/cookies";
import { RootState } from "../../store/store";
import axiosInstance from "../../apis/axiosInstance";
import * as S from "./LearnerList.style";

interface Learner {
  student_id: string;
  student_name: string;
  student_school: string;
  student_department: string;
  student_number: string;
  student_email: string;
  student_phone?: string;
}

interface Course {
  course_id: string;
  course_code: string;
}

const LearnerList: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false); // 모달 상태
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number>(0); // 선택된 체크박스 수
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]); // 선택된 학생 ID들
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const itemsPerPage = 10; // 페이지당 항목 수
  const [learners, setLearners] = useState<Learner[]>([]);
  const token = useSelector((state: RootState) => state.user?.token);
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const { courseName } = location.state as { courseName: string };
  const [courses, setCourses] = useState<Course[]>([]);
  const refreshToken = getTokenFromCookie("refreshToken");
  let navigate = useNavigate();

  const handleEnrolmentClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    studentId: string
  ) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedStudents((prev) => [...prev, studentId]);
      setSelectedCheckboxes((prev) => prev + 1);
    } else {
      setSelectedStudents((prev) => prev.filter((id) => id !== studentId));
      setSelectedCheckboxes((prev) => prev - 1);
    }
  };

  const handleDeleteStudents = async () => {
    try {
      const promises = selectedStudents.map((studentId) =>
        axiosInstance.delete(
          "https://www.neusenseback.com/professor/course/student",
          {
            data: {
              courseId: parseInt(courseId!),
              studentId,
            },
          }
        )
      );
      await Promise.all(promises);
      const remainingItems = learners.length - selectedStudents.length;
      const newPage =
        remainingItems <= itemsPerPage * (currentPage - 1)
          ? currentPage - 1
          : currentPage;
      setCurrentPage(newPage);
      fetchLearners(newPage);
      setSelectedCheckboxes(0);
      setSelectedStudents([]);
    } catch (error) {
      console.error("Error deleting learners:", error);
    }
  };

  const totalItems = learners.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setSelectedCheckboxes(0);
    setSelectedStudents([]);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <S.PaginationButton
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </S.PaginationButton>
      );
    }
    return pages;
  };

  const fetchLearners = async (page = currentPage) => {
    try {
      const response = await axiosInstance.get(
        `https://www.neusenseback.com/professor/course/students?courseId=${courseId}`
      );
      setLearners(response.data.response);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching learners:", error);
    }
  };

  useEffect(() => {
    fetchLearners();
  }, [courseId, currentPage]);

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
      } else {
        setLearners([]);
        console.error("검색에 실패했습니다.", response.data);
      }
    } catch (error) {
      setLearners([]);
      console.error("검색 중 오류가 발생했습니다.", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchStudent();
    }
  };

  useEffect(() => {
    setSelectedCheckboxes(0);
    setSelectedStudents([]);
  }, [currentPage]);

  useEffect(() => {
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
    fetchCourses();
  }, [token, refreshToken]);

  // courseId가 문자열인지 숫자인지 확인하고 비교
  const currentCourse = courses.find(
    (course) => `${course.course_id}` === courseId
  );

  return (
    <S.CourseContainer>
      <S.CourseHeader>
        <S.LearnContent>
          <S.CourseTitle>학습자 목록</S.CourseTitle>
          <S.ManagementBtn
            onClick={() => {
              navigate("/professorpage");
            }}
          >
            수강관리
          </S.ManagementBtn>
          <S.CourseName>
            강의명 :
            <span>
              {" "}
              {courseName} ({currentCourse?.course_code})
            </span>
          </S.CourseName>
          <S.LearnerCnt>
            학습자 : <span>{totalItems}명</span>
          </S.LearnerCnt>
        </S.LearnContent>
        <S.SelectedDelete
          checked={selectedCheckboxes > 0}
          disabled={selectedCheckboxes === 0 || selectedStudents.length === 0}
          onClick={() => setShowModal(true)}
        >
          선택한 수강생 삭제
        </S.SelectedDelete>
        <S.SearchBar>
          <S.CourseSearch
            id="studentSearchInput"
            placeholder="학습자명 또는 학번"
            onKeyDown={handleKeyDown}
          />
          <S.CourseSearchBtn onClick={handleSearchStudent}>
            검색
          </S.CourseSearchBtn>
        </S.SearchBar>
      </S.CourseHeader>
      <S.TableWrapper>
        <S.StyledTable>
          <S.TableHeader>
            <tr>
              <S.TableHeaderCell width="5%">선택</S.TableHeaderCell>
              <S.TableHeaderCell width="5%">순번</S.TableHeaderCell>
              <S.TableHeaderCell width="10%">이름</S.TableHeaderCell>
              <S.TableHeaderCell width="10%">소속(대학)</S.TableHeaderCell>
              <S.TableHeaderCell width="10%">학과</S.TableHeaderCell>
              <S.TableHeaderCell width="10%">학번</S.TableHeaderCell>
              <S.TableHeaderCell width={S.courseNameWidth}>
                이메일
              </S.TableHeaderCell>
              <S.TableHeaderCell width={S.courseNameWidth}>
                연락처
              </S.TableHeaderCell>
            </tr>
          </S.TableHeader>
          <S.TableBody>
            {learners.length === 0 ? (
              <tr>
                <td colSpan={9}>
                  <S.NoCoursesMessage>
                    조건에 맞는 수강생이 없습니다.
                  </S.NoCoursesMessage>
                </td>
              </tr>
            ) : (
              learners
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((learner, index) => (
                  <tr key={learner.student_id}>
                    <S.TableBodyCell>
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          handleCheckboxChange(e, learner.student_id)
                        }
                      />
                    </S.TableBodyCell>
                    <S.TableBodyCell>
                      {String(
                        (currentPage - 1) * itemsPerPage + index + 1
                      ).padStart(3, "0")}
                    </S.TableBodyCell>
                    <S.TableBodyCell>{learner.student_name}</S.TableBodyCell>
                    <S.TableBodyCell>{learner.student_school}</S.TableBodyCell>
                    <S.TableBodyCell>
                      {learner.student_department}
                    </S.TableBodyCell>
                    <S.TableBodyCell>{learner.student_number}</S.TableBodyCell>
                    <S.TableBodyCell>{learner.student_email}</S.TableBodyCell>
                    <S.TableBodyCell>
                      {learner.student_phone || "N/A"}
                    </S.TableBodyCell>
                  </tr>
                ))
            )}
          </S.TableBody>
        </S.StyledTable>
      </S.TableWrapper>
      {showModal && (
        <DeleteLearnerModal
          onClose={handleCloseModal}
          onDelete={handleDeleteStudents}
        />
      )}
      <S.Pagination>
        <S.PaginationButton
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          &lt;
        </S.PaginationButton>
        {renderPageNumbers()}
        <S.PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </S.PaginationButton>
      </S.Pagination>
    </S.CourseContainer>
  );
};

export default LearnerList;
