import React, {
  useState,
  useEffect,
  useRef,
  FormEvent,
  ChangeEvent,
} from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useLanguage } from "../context/LanguageContext";
import styled from "styled-components";

interface Message {
  user: string;
  text: string;
  isUser: boolean;
}

const NurseMind: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messageWrapperRef = useRef<HTMLDivElement>(null);
  const { selectedLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage); // 언어 변경 함수 호출
  };

  useEffect(() => {
    if (messageWrapperRef.current) {
      messageWrapperRef.current.scrollTop =
        messageWrapperRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage: Message = {
      user: "나",
      text: userInput,
      isUser: true, // 사용자 메시지 여부 추가
    };

    setMessages((messages) => [...messages, userMessage]);

    setIsTyping(true);

    try {
      const response = await fetch("https://www.neusenseback.com/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      const data = await response.json();
      const aiMessage: Message = {
        user: "널스 멘토",
        text: data.response,
        isUser: false, // 널스 멘토 메시지 여부 추가
      };

      setMessages((messages) => [...messages, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }

    setUserInput("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <AiContainer>
      <Header onLanguageChange={handleLanguageChange} />
      <AiWrapper>
        <NurseMentoTitle>
          <img
            src={`${process.env.PUBLIC_URL}/img/nurseMentoLogo.png`}
            alt="img"
          />
        </NurseMentoTitle>
        <MessageWrapper ref={messageWrapperRef}>
          <ul>
            {messages.map((message, index) => (
              <MessageContainer
                className={
                  message.isUser ? "userMessageWrapper" : "aiMessageWrapper"
                }
                key={index}
              >
                <li key={index}>
                  <span>{message.user}</span>{" "}
                  <SpeechBubble
                    className={
                      message.isUser ? "userSpeechBubble" : "aiSpeechBubble"
                    }
                  >
                    {message.text}
                  </SpeechBubble>
                </li>
              </MessageContainer>
            ))}
            {isTyping && (
              <MessageContainer className="aiMessageWrapper">
                <li>
                  <span>널스 멘토</span> 입력중...
                </li>
              </MessageContainer>
            )}
          </ul>
        </MessageWrapper>
        <MentoInputWrapper>
          <form onSubmit={sendMessage}>
            <QuestionInput
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder={
                selectedLanguage === "ko"
                  ? "널스 멘토에게 질문 해보세요!"
                  : "Ask Nurse Mento a question!"
              }
            />
            <AiSendButton type="submit">Send</AiSendButton>
          </form>
        </MentoInputWrapper>
      </AiWrapper>
      <Footer />
    </AiContainer>
  );
};

export default NurseMind;

const AiContainer = styled.div``;

const AiWrapper = styled.div`
  width: 30%;
  height: 100%;
  margin: auto;
  border-radius: 10px;
  border: 2px solid #078675;
  margin-top: 3%;

  @media only screen and (max-width: 768px) {
    width: 90%;
    height: 100%;
    margin: auto;
    border-radius: 10px;
    border: 2px solid #078675;
    margin-top: 3%;
  }
  /* 반응형 추가 */
`;

const MessageWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 57vh;
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #078675;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const NurseMentoTitle = styled.div`
  margin-top: 3%;
  margin-bottom: 3%;
  text-align: center;
  img {
    width: 50%;
  }
`;

const MessageContainer = styled.div`
  list-style: none;
  li {
    width: 90%;
    text-align: ${(props) =>
      props.className === "userMessageWrapper" ? "right" : "left"};
  }
  p {
    width: 90%;
    height: 100%;
    background-color: ${(props) =>
      props.className === "userMessageWrapper" ? "#078675" : "white"};
    color: ${(props) =>
      props.className === "userMessageWrapper" ? "white" : "#078675"};
    border: ${(props) =>
      props.className === "userMessageWrapper" ? "none" : "2px solid #078675"};
    border-radius: 10px;
    padding: 5% 5%;
    display: flex;
    align-items: center;
    justify-content: ${(props) =>
      props.className === "userMessageWrapper" ? "right" : "left"};
  }
`;

const SpeechBubble = styled.p``;

const MentoInputWrapper = styled.div`
  width: 90%;
  position: relative;
  border-top: 1px solid #078675;
  margin: auto;
  padding-top: 3%;
  form {
    position: sticky;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    margin-bottom: 3%;
  }
`;

const QuestionInput = styled.input`
  width: 90%;
  height: 6vh;
  border: 2px solid #078675;
  padding-left: 5%;
  font-size: 1.1rem;
  border-radius: 10px 0px 0px 10px;
  color: #078675;
  font-family: "Pretendard-regular";
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: #078675;
    font-family: "Pretendard-regular";
    font-size: 1.1rem;
  }
`;

const AiSendButton = styled.button`
  width: 20%;
  height: 6.6vh;
  border: 2px solid #078675;
  background-color: #078675;
  border-radius: 0px 10px 10px 0px;
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
  &:hover {
    cursor: pointer;
  }
`;
