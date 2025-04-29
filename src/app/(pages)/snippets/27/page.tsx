"use client"

import React, { useEffect } from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
interface Props {
  title? :string;
  contents?: string;
  children: React.ReactNode;
}
const TestPage1: React.FC = ({}) => {
  useEffect(() => {
  }, []);
  return (
    <div>
      <Container>
        <h1>
          기본 Component Snippets
        </h1>
        <p>
          - asdf
        </p>
      </Container>
    </div>
  );
};