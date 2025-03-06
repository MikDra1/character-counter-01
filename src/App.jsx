import styled from "styled-components";
import Header from "./components/Header";
import FormText from "./components/FormText";
import { ProjectProvider, useProject } from "./contexts/ProjectProvider";
import Counters from "./components/Counters";
import LetterDensity from "./components/LetterDensity";
import { useEffect } from "react";

const Wrapper = styled.div`
  min-height: 100vh;

  background: ${({ isDarkMode }) =>
    isDarkMode
      ? 'url("./images/bg-dark-theme.png")'
      : 'url("./images/bg-light-theme.png")'};
`;

const Container = styled.div`
  padding-inline: 2rem;

  background-size: cover;
  max-width: 60rem;
  margin-inline: auto;
`;

const Title = styled.h1`
  margin-block: 2rem;
  text-align: center;
  line-height: 1.1;
  color: var(--neutral-900);

  @media (min-width: 600px) {
    font-size: 3rem;
  }


`;

function App() {
  const { isMobile, setIsDarkMode, isDarkMode } = useProject();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark-mode");
    }
  }, [setIsDarkMode]);

  return (
    <Wrapper isDarkMode={isDarkMode}>
      <Container>
        <Header />
        {isMobile ? (
          <Title>
            Analyze your text in<br></br> real-time.
          </Title>
        ) : (
          <Title>
            Analyze your text<br></br> in real-time.
          </Title>
        )}
        <FormText />
        <Counters />
        <LetterDensity />
      </Container>
    </Wrapper>
  );
}

export default App;
