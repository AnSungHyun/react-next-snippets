import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import UseAxiosClientComponent from "./UseAxiosClientComponent";

const TestPage24: React.FC = () => {

  return (
    <div>
      <Container>
        <p>
          -
        </p>
        <p>
          -
        </p>
        <ResultBlock>
          <Suspense fallback={<Loading/>}>
            <UseAxiosClientComponent />
          </Suspense>
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage24;