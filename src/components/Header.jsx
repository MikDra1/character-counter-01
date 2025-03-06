import styled from "styled-components";
import { useProject } from "../contexts/ProjectProvider";
import { toggleDarkMode } from "../helpers/helpers";

const StyledHeader = styled.header`
  padding-block: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 600px) {
    padding-block: 2rem;
  }
`;

const Logo = styled.img`
  width: 12rem;

  @media (min-width: 600px) {
    width: 16rem;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: .5rem;
  background-color: var(--neutral-200);
  transition: background 0.3s ease;
`;

function Header() {
  const { isDarkMode, setIsDarkMode } = useProject();

  return (
    <StyledHeader>
      <Logo src={`./images/logo-${isDarkMode ? "dark" : "light"}-theme.svg`} alt="logo" />
      <ToggleButton onClick={() => toggleDarkMode(setIsDarkMode)}>
        {isDarkMode ? (
          <img src="/images/icon-sun.svg" alt="sun" />
        ) : (
          <img src="/images/icon-moon.svg" alt="moon" />
        )}
      </ToggleButton>
    </StyledHeader>
  );
}

export default Header;
