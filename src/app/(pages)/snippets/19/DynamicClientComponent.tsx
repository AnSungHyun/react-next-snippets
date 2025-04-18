'use client'

import React, {useEffect} from "react";
import Button from "@mui/material/Button";
import UseQueryClientComponent from "./UseQueryClientComponent";

const DynamicClientComponent: React.FC = () => {
  const [buttonTwo, setButtonTwo] = React.useState(false);


  const handleButtonTwoClick = () => {
    setButtonTwo(!buttonTwo);
  }

  // 동적 렌더링을 바로 렌더링 하고 싶은 경우 하단 코드 주석 해제
  // useEffect(() => {
  //   setButtonTwo(!buttonTwo);
  // }, []);

  return (
    <div>
      <h2>I'm Dynamic Client Component</h2>
      <Button variant="outlined" onClick={handleButtonTwoClick}>클라이언트 컴포넌트</Button>
      <br/>
      {buttonTwo && <div><UseQueryClientComponent /></div>}
    </div>
  );
};

export default DynamicClientComponent;