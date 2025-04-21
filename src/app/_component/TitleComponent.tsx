'use client'

import { Container } from "@mui/material";
import useTitleStore from "@/app/_store/useTitleStore";

const TitleComponent: React.FC = () => {
  const { menuTitle, setMenuTitle } = useTitleStore();

  return (
    <div>
      <Container>
        <h1>
          {menuTitle}
        </h1>
      </Container>
    </div>
  );
};

export default TitleComponent;