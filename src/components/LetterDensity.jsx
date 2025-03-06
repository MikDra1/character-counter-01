import styled from "styled-components";
import { useProject } from "../contexts/ProjectProvider";
import { letterDensity } from "../helpers/helpers";
import { useState } from "react";

const StyledLetterDensity = styled.div`
  margin-top: 1rem;
`;

const Title = styled.h2`
  margin-block: 1rem;
  color: var(--neutral-900);

  @media (min-width: 400px) {
    margin-top: 1.5rem;
  }
`;

const StyledLetterDensityItem = styled.div`
  display: flex;
  align-items: center;
`;

const LetterDensityItemContainer = styled.div`
  padding-bottom: 1rem;

  @media (min-width: 400px) {
    display: grid;
    gap: 0.3rem;
  }
`;

const SeeMoreButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
  color: var(--neutral-900);

  @media (min-width: 600px) {
    margin-top: 0.3rem;
  }
`;

const SeeMoreButtonImage = styled.img`
  filter: ${({ isDarkMode }) =>
    isDarkMode
      ? "brightness(0) saturate(100%) invert(100%) sepia(5%) saturate(2%) hue-rotate(202deg) brightness(105%) contrast(101%)"
      : "none"};
`;

const StyledProgress = styled.progress`
  appearance: none;
  height: 15px;
  border-radius: 10px;
  background-color: var(--neutral-200);
  overflow: hidden;
  border: none;
  flex: 1;

  &::-webkit-progress-bar {
    background-color: var(--neutral-200);
    border-radius: 10px;
  }

  &::-webkit-progress-value {
    background-color: var(--purple-blue-400);
    border-radius: 10px;
    transition: width 0.3s ease;
  }

  &::-moz-progress-bar {
    background-color: var(--purple-blue-400);
    border-radius: 10px;
  }
`;

const StyledLetter = styled.p`
  font-weight: 600;
  color: var(--neutral-900);
  width: 2rem;
`;

const StyledScore = styled.p`
  font-size: 0.875rem;
  color: var(--neutral-900);
  width: 6rem;
  text-align: end;

  @media (min-width: 375px) {
    font-size: 1rem;
  }
`;

const NoTextError = styled.p`
  color: var(--neutral-900);
`;

function LetterDensity() {
  const [shouldSeeMore, setShouldSeeMore] = useState(true);
  const { text, isDarkMode } = useProject();

  const density = letterDensity(text);

  function handleSeeMore() {
    setShouldSeeMore(!shouldSeeMore);
  }

  return (
    <StyledLetterDensity>
      <Title>Letter Density</Title>
      {text.length > 0 || (
        <NoTextError>
          No characters found. Start typing to see letter density
        </NoTextError>
      )}
      <LetterDensityItemContainer>
        {shouldSeeMore
          ? density.map((letter, index) => (
              <>
                {index < 5 && (
                  <StyledLetterDensityItem key={letter.letter}>
                    <StyledLetter>{letter.letter.toUpperCase()}</StyledLetter>
                    <StyledProgress
                      value={letter.count}
                      max={text.length}
                    ></StyledProgress>
                    <StyledScore>
                      {letter.count} ({letter.percentage})
                    </StyledScore>
                  </StyledLetterDensityItem>
                )}
              </>
            ))
          : density.map((letter) => (
              <StyledLetterDensityItem key={letter.letter}>
                <StyledLetter>{letter.letter.toUpperCase()}</StyledLetter>
                <StyledProgress
                  value={letter.count}
                  max={text.length}
                ></StyledProgress>
                <StyledScore>
                  {letter.count} ({letter.percentage})
                </StyledScore>
              </StyledLetterDensityItem>
            ))}
        {density.length > 5 && (
          <SeeMoreButton onClick={handleSeeMore}>
            {!shouldSeeMore ? "See less" : "See more"}
            {!shouldSeeMore ? (
              <SeeMoreButtonImage
                isDarkMode={isDarkMode}
                src="/images/icon-up.svg "
                alt=""
              />
            ) : (
              <SeeMoreButtonImage
                isDarkMode={isDarkMode}
                src="/images/icon-down.svg "
                alt=""
              />
            )}
          </SeeMoreButton>
        )}
      </LetterDensityItemContainer>
    </StyledLetterDensity>
  );
}

export default LetterDensity;
