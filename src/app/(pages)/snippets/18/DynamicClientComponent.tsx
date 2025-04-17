'use client'

import React from "react";
import Button from "@mui/material/Button";
import UseQueryClientComponent from "@/app/(pages)/snippets/18/UseQueryClientComponent";

const DynamicClientComponent: React.FC = () => {
  const [buttonTwo, setButtonTwo] = React.useState(false);


  const handleButtonTwoClick = () => {
    setButtonTwo(!buttonTwo);
  }

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