'use client'
// Create Prop Client React Component with Nextjs
import React from "react";

interface PropClientComponentProps {
  title: string;
  description: string;
}

const PropClientComponent: React.FC<PropClientComponentProps> = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default PropClientComponent;