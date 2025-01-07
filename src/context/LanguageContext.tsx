import React, { createContext, useState, useContext, ReactNode } from "react";

// 타입 정의
interface LanguageContextType {
  selectedLanguage: string;
  changeLanguage: (newLanguage: string) => void;
}

// 초기값을 undefined로 설정하여 useContext 훅에서 타입 검사 가능
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ko");

  const changeLanguage = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
