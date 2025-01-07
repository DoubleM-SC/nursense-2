import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import CheckModal from "./modal/CheckModal";
import styled from "styled-components";

interface ChangePwProps {
  onClose: () => void;
}

const ChangePw: React.FC<ChangePwProps> = ({ onClose }) => {
  const [currentPw, setCurrentPw] = useState<string>("");
  const [pwCheckResult, setPwCheckResult] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [confirmPw, setConfirmPw] = useState<string>("");
  const [newPwError, setNewPwError] = useState<string>("");
  const [confirmPwError, setConfirmPwError] = useState<string>("");
  const [showCheckModal, setShowCheckModal] = useState<boolean>(false); // New state for modal

  const handleCloseButtonClick = () => {
    onClose();
  };

  useEffect(() => {
    let isMounted = true;

    const checkPassword = async () => {
      // 입력값이 비어있는 경우에는 체크를 수행하지 않음
      if (currentPw.trim() === "") {
        return;
      }

      try {
        const cookies = new Cookies();
        const userToken = cookies.get("token");

        const response = await axios.post(
          "https://www.neusenseback.com/api/checkpw",
          { password: currentPw },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (isMounted) {
          if (response.status === 200 && response.data.success) {
            setPwCheckResult(true);
            setErrorMessage(""); // 성공하면 에러 메시지 초기화
          } else {
            setPwCheckResult(false);
            setErrorMessage(response.data.msg || "비밀번호를 확인해주세요.");
          }
        }
      } catch (error) {
        if (isMounted) {
          // 서버 응답에 오류가 있을 때 처리
          console.error("비밀번호 체크 중 오류:", error);

          // 오류 메시지 설정
          setPwCheckResult(false);
          setErrorMessage("현재 비밀번호가 틀렸습니다.");
        }
      }
    };

    const timeoutId = setTimeout(() => {
      checkPassword();
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [currentPw]);

  const handleCurrentPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPw(e.target.value);
  };

  const handleNewPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPw(value);

    // 입력값이 비어있는 경우 유효성 검사를 수행하지 않음
    if (value.trim() === "") {
      setNewPwError("");
      return;
    }

    // 비밀번호 유효성 검사
    if (/^[a-zA-Z0-9]{6,}$/.test(value)) {
      setNewPwError("");
    } else {
      setNewPwError(
        "사용할 수 없는 비밀번호 입니다. 비밀번호는 ‘영문’ 또는 ‘숫자’가 포함된 최소 6글자 이상으로 만들어야 합니다."
      );
    }

    // 비밀번호 일치 여부 검사
    if (value !== confirmPw) {
      setConfirmPwError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPwError("");
    }
  };

  const handleConfirmPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPw(value);

    if (value.trim() === "") {
      setNewPwError("");
      return;
    }

    // 비밀번호 일치 여부 검사
    if (value !== newPw) {
      setConfirmPwError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPwError("");
    }
  };

  const handleConfirmButtonClick = async () => {
    // 비밀번호 일치 여부 확인
    if (newPw !== confirmPw) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 유효성 검사
    if (/^[a-zA-Z0-9]{6,}$/.test(newPw)) {
      setNewPwError("");
    } else {
      setNewPwError(
        "사용할 수 없는 비밀번호 입니다. 비밀번호는 ‘영문’ 또는 ‘숫자’가 포함된 최소 6글자 이상으로 만들어야 합니다."
      );
      return;
    }

    try {
      const cookies = new Cookies();
      const userToken = cookies.get("token");

      // PUT API 호출
      const response = await axios.put(
        "https://www.neusenseback.com/api/put/user/changepassword",
        {
          password: newPw,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        console.log("비밀번호 변경 성공");
        // 여기에서 성공 시의 처리를 추가할 수 있습니다.
        setShowCheckModal(true); // Show modal on success
      } else {
        console.error("비밀번호 변경 실패:", response.data.msg);
        // 여기에서 실패 시의 처리를 추가할 수 있습니다.
      }
    } catch (error) {
      console.error("비밀번호 변경 중 오류:", error);
    }
  };

  return (
    <>
      <ChangePwContainer>
        <ChangePwWrapper>
          <ChangePwTitle>
            <span>비밀번호 변경</span>
            <img
              onClick={handleCloseButtonClick}
              src={`${process.env.PUBLIC_URL}/img/closeButton.png`}
              alt="Close Button"
            />
          </ChangePwTitle>
          <CurrentPw className={pwCheckResult === false ? "error" : ""}>
            <p>본인확인을 위해 현재 비밀번호를 입력해주세요.</p>
            <input
              type="password"
              placeholder="현재 비밀번호를 입력해주세요"
              value={currentPw}
              onChange={handleCurrentPwChange}
              style={{
                borderColor: pwCheckResult === false ? "#E94439" : "",
              }}
            />
            {pwCheckResult === false && <ErrorText>{errorMessage}</ErrorText>}
          </CurrentPw>
          <NewPw>
            <p>변경할 새 비밀번호를 입력해주세요.</p>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              name="password"
              value={newPw}
              onChange={handleNewPwChange}
              className={confirmPwError ? "newInputError" : ""}
            />
            <br />
            <input
              type="password"
              placeholder="비밀번호를 재입력해주세요"
              name="passwordCheck"
              value={confirmPw}
              onChange={handleConfirmPwChange}
              className={confirmPwError ? "newInputError" : ""}
            />
            {newPwError && <ErrorNewText>{newPwError}</ErrorNewText>}
            {confirmPwError && <ErrorNewText>{confirmPwError}</ErrorNewText>}
          </NewPw>
          <ChangeButtonWrapper>
            <button onClick={handleConfirmButtonClick}>확인</button>
          </ChangeButtonWrapper>
        </ChangePwWrapper>
      </ChangePwContainer>
      {showCheckModal && (
        <CheckModal
          checkMessage={"비밀번호가 변경 되었습니다."}
          closeModal={() => setShowCheckModal(false)} // closeModal 프로퍼티 추가
        />
      )}
    </>
  );
};

export default ChangePw;

const ChangePwContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 흐린 배경을 위한 투명한 검은색 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChangePwWrapper = styled.div`
  background: white; /* 모달 배경색 */
  padding: 20px;
  border-radius: 25px;
  width: 40%;
  border: 3px solid #e6e6e6;
  height: 55vh;
  text-align: center;
  position: relative;
`;

const ChangePwTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #078675;
  }

  img:hover {
    cursor: pointer;
  }
`;

const CurrentPw = styled.div`
  p {
    font-size: 1.1rem;
    margin-bottom: 2%;
    text-align: left;
    margin-top: 7%;
  }

  input {
    width: 98%;
    height: 5vh;
    margin-top: 10px;
    font-size: 1.1rem;
    border: 1px solid #078675;
    border-radius: 7px;
    padding-left: 10px;
    outline: none;
    font-family: "Pretendard";
    margin-bottom: 3%;
  }
`;

const ErrorText = styled.p`
  color: #e94439;
  font-size: 14px;
  margin-top: 0;
`;

const NewPw = styled.div`
  p {
    font-size: 1.1rem;
    margin-bottom: 2%;
    text-align: left;
  }

  input {
    width: 98%;
    height: 5vh;
    margin-top: 10px;
    font-size: 1.1rem;
    border: 1px solid #078675;
    border-radius: 7px;
    padding-left: 10px;
    outline: none;
    font-family: "Pretendard";

    &.newInputError {
      border-color: #e94439;
    }
  }
`;

const ErrorNewText = styled.p`
  font-size: 0.85rem;
  color: #e94439;
`;

const ChangeButtonWrapper = styled.div`
  button {
    background-color: #078675;
    color: #fff;
    padding: 10px 50px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: "Pretendard";
    font-size: 1.1rem;
    transition: 0.2s;

    &:hover {
      background-color: #067264;
    }
  }
`;
