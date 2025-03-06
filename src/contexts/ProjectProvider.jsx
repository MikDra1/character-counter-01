import { useContext, useEffect, useState, createContext } from "react";
import useScreenSize from "../hooks/useScreenSize";

const ProjectContext = createContext();

function ProjectProvider({ children }) {
  const [isMobile, setIsMobile] = useState(null);
  const [isTablet, setIsTablet] = useState(null);
  const [text, setText] = useState("");
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [characterLimit, setCharacterLimit] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const screenSize = useScreenSize();

  useEffect(
    function () {
      setIsMobile(screenSize.width <= 600);
      setIsTablet(screenSize.width <= 1200);
    },
    [screenSize.width]
  );

  function handleChangeText(e) {
    setText(e.target.value);
  }

  return (
    <ProjectContext.Provider
      value={{
        isMobile,
        isTablet,
        text,
        handleChangeText,
        excludeSpaces,
        setExcludeSpaces,
        characterLimit,
        setCharacterLimit,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined)
    throw new Error("ProjectContext was used outside the ProjectProvider");
  return context;
}

export { ProjectProvider, useProject };
