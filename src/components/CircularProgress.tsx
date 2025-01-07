import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface CircularProgressProps {
  progress: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ progress }) => {
  const radius = 70;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius;
  const [strokeDashoffset, setStrokeDashoffset] =
    useState<number>(circumference);

  useEffect(() => {
    const newOffset = circumference - (progress / 100) * circumference;
    setStrokeDashoffset(newOffset);
  }, [progress]);

  return (
    <SvgContainer width={radius * 2} height={radius * 2}>
      <ProgressBar
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke="#e0e0e0"
        strokeWidth={strokeWidth}
      />
      <ProgressIndicator
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="transparent"
        stroke="#078675"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
      />
      <ProgressText
        x={radius}
        y={radius}
        fontSize="18"
        textAnchor="middle"
        dy=".3em"
      >
        {`${progress}%`}
      </ProgressText>
    </SvgContainer>
  );
};

export default CircularProgress;

const SvgContainer = styled.svg`
  position: relative;
`;

const ProgressBar = styled.circle`
  stroke: #e0e0e0;
`;

const ProgressIndicator = styled.circle`
  transition: stroke-dashoffset 0.5s ease-in-out;
  stroke: #078675;
`;

const ProgressText = styled.text`
  font-size: 30px;
  fill: #078675;
  font-weight: bold;
`;
