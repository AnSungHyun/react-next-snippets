'use client'

import React from "react";
import Button from "@mui/material/Button";
import UseQueryClientComponent from "@/app/(pages)/snippets/17/UseQueryClientComponent";

interface Props {
  children: React.ReactNode;
}

const DynamicClientComponent: React.FC<Props> = ({children}) => {
  const [buttonOne, setButtonOne] = React.useState(false);
  const [buttonTwo, setButtonTwo] = React.useState(false);

  const handleButtonOneClick = () => {
    setButtonOne(!buttonOne);
  }

  const handleButtonTwoClick = () => {
    setButtonTwo(!buttonTwo);
  }

  return (
    <div>
      <h2>I'm Dynamic Client Component</h2>
      <Button variant="outlined" onClick={handleButtonOneClick}>서버 컴포넌트</Button>
      <Button variant="outlined" onClick={handleButtonTwoClick}>클라이언트 컴포넌트</Button>
      <br/>
      {buttonOne && <div>{children}</div>}
      {buttonTwo && <div><UseQueryClientComponent /></div>}
    </div>
  );
};

export default DynamicClientComponent;