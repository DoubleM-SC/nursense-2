import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import store, { RootState } from "../store/store";
import Main from "../page/main/Main";
import MyPage from "../page/mypage/MyPage";
import Register from "../page/register/Register";
import Login from "../page/login/Login";
import "../styles/App.css";
import { loginSuccess } from "../store/actions";
import { getTokenFromCookie } from "../page/cookies";
import Curriculum from "../page/Curriculum";
import CurrEvaluation from "../page/CurrEvaluation";
import Guide from "../page/guide/Guide";
import CurrLearning from "../page/CurrLearning";
import Customer from "../page/customer/Customer";
import Download from "../page/download/DownloadTemplate/DownloadTemplate";
import Introduce from "../page/about/About";
import About from "../page/about/About";
import NurseMind from "../page/NurseMind";
import NursenseMedia from "../page/NursenseMedia";
import ProfessorPage from "../page/professorpage/ProfessorPage";
import LearnerList from "../components/professorpage/LearnerList";
import LearningStatusList from "../components/professorpage/LearningStatusList";
import ProfessorCourseList from "../components/professorpage/ProfessorCourseList";
import UpdateUserInfo from "../page/update/UpdateUserInfo";
import UpdateInformation from "../page/update/UpdateInformation";
import OpeningCourse from "../page/professorpage/OpeningCourse";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isProfessor = useSelector((state: RootState) => state.user?.professor);

  useEffect(() => {
    // 쿠키에서 유효한 토큰이 있는지 확인
    const token = getTokenFromCookie("accessToken") as string;
    console.log("App.tsx 유저 데이터, ", token);
    if (token) {
      // 사용자를 인증된 상태로 설정하는 액션을 디스패치
      const userData = {
        token,
        refreshToken: getTokenFromCookie("refreshToken") as string,
        id: getTokenFromCookie("id") as string,
        name: getTokenFromCookie("name") as string,
        professor: getTokenFromCookie("professor") === true,
      };
      dispatch(loginSuccess(userData));
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/mypage"
            element={
              !isProfessor ? (
                <MyPage />
              ) : (
                <Navigate to="/professorpage" replace />
              )
            }
          />
          <Route
            path="/professorpage"
            element={
              isProfessor ? (
                <ProfessorPage />
              ) : (
                <Navigate to="/mypage" replace />
              )
            }
          >
            <Route index element={<ProfessorCourseList />} />
            <Route path="learner-list/:courseId" element={<LearnerList />} />
            <Route
              path="learning-status-list/:courseId"
              element={<LearningStatusList />}
            />
            <Route path="opening-course" element={<OpeningCourse />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/userinfo" element={<UpdateUserInfo />} />
          <Route path="/updateinfo" element={<UpdateInformation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/curriculum/learn" element={<Curriculum />} />
          <Route path="/curriculum/evaluation" element={<CurrEvaluation />} />
          <Route path="/curriculum/guide" element={<Guide />} />
          <Route path="/curriculum/learning" element={<CurrLearning />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/download" element={<Download />} />
          <Route path="/about" element={<About />} />
          <Route path="/nursemind" element={<NurseMind />} />
          <Route path="/media" element={<NursenseMedia />} />
          <Route path="*" element={<>404 Not Found</>} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
