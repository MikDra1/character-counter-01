import styled from "styled-components";
import { useProject } from "../contexts/ProjectProvider";
import { useEffect, useState } from "react";

const StyledArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  height: 10rem;
  padding: 0.75rem;
  outline: none;
  border: ${({ showToMuchLettersError }) =>
    showToMuchLettersError
      ? "1px solid var(--orange-800)"
      : "1px solid var(--neutral-200)"};
  border-radius: 0.75rem;
  background-color: transparent;
  caret-color: var(--neutral-900);
  color: var(--neutral-900);

  &::placeholder {
    color: var(--neutral-600);
  }
`;

const StyledOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledOptions = styled.div`
  margin-top: 0.5rem;

  @media (min-width: 600px) {
    display: flex;
    gap: 1rem;
  }
`;

const InputChangeMaxTextLength = styled.input`
  width: 3rem;
  text-align: center;
  outline: none;
  border: 1px solid var(--neutral-200);
  border-radius: 0.25rem;
  opacity: 0;
  cursor: default;
  background-color: transparent;
  caret-color: var(--neutral-900);
  color: var(--neutral-900);
`;

const InputChangeMaxTextLengthShow = styled(InputChangeMaxTextLength)`
  opacity: 1;
  cursor: text;
`;

const StyledOptionsContainer = styled.div`
  margin-top: 1rem;

  @media (min-width: 750px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.25rem;
  }
`;

const InputCheckboxOption = styled.input`
  appearance: none; /* Remove default styling */
  width: 20px;
  height: 20px;
  border: 2px solid var(--neutral-900);
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  display: inline-block;
  position: relative;

  &:checked {
    background-color: var(--purple-blue-400);
    border: 2px solid var(--purple-blue-400);
  }

  &:checked::after {
    content: "✔";
    font-size: 16px;
    color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const LabelCheckBoxOption = styled.label`
  cursor: pointer;
  user-select: none;
  color: var(--neutral-900);
`;

const ApproxReadingTime = styled.p`
  color: var(--neutral-900);
`;

const ErrorToMuchLetters = styled.div`
  margin-top: 0.5rem;
  color: var(--orange-800);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;

  @media (min-width: 400px) {
    font-size: 0.875rem;
  }

  @media (min-width: 600px) {
    font-size: 1rem;
  }
`;

function FormText() {
  const [showCharacterLimit, setShowCharacterLimit] = useState(false);
  const [showToMuchLettersError, setShowToMuchLettersError] = useState(false);

  const {
    text,
    handleChangeText,
    setCharacterLimit,
    setExcludeSpaces,
    characterLimit,
    excludeSpaces,
  } = useProject();


  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    if (text.trim() === "") {
      setReadingTime(0); // If text is empty, set reading time to 0
    } else {
      const time = text.trim().length / 200;
      setReadingTime(time); // Update reading time
    }
  }, [text]); // Runs every time 'text' state changes

  useEffect(() => {
    if (!characterLimit) {
      setShowToMuchLettersError(false);
    } else if (text.length > characterLimit) {
      setShowToMuchLettersError(true);
    } else if (text.length <= characterLimit) {
      setShowToMuchLettersError(false);
    }
  }, [text, showCharacterLimit, characterLimit]);

  return (
    <div>
      <StyledArea
        onChange={handleChangeText}
        maxLength={characterLimit}
        placeholder="Start typing here... (or paste your text)"
        showToMuchLettersError={showToMuchLettersError}
      ></StyledArea>

      {showToMuchLettersError && (
        <ErrorToMuchLetters>
          <img src="/images/icon-info.svg" alt="error" />
          <p>Limit reached! Your text exceeds {characterLimit} characters.</p>
        </ErrorToMuchLetters>
      )}

      <StyledOptionsContainer>
        <StyledOptions>
          <StyledOption>
            <InputCheckboxOption
              type="checkbox"
              value={excludeSpaces}
              onChange={() => setExcludeSpaces(!excludeSpaces)}
              id="excludeSpaces"
            />
            <LabelCheckBoxOption htmlFor="excludeSpaces">
              Exclude Spaces
            </LabelCheckBoxOption>
          </StyledOption>

          <StyledOption>
            <InputCheckboxOption
              type="checkbox"
              onChange={() => {
                if(showCharacterLimit) {
                  setCharacterLimit(null);
                }
                setShowCharacterLimit(!showCharacterLimit)
              }}
              id="showCharacterLimit"
            />
            <LabelCheckBoxOption htmlFor="showCharacterLimit">
              Set Character Limit
            </LabelCheckBoxOption>
            {showCharacterLimit ? (
              <InputChangeMaxTextLengthShow
                type="text"
                value={characterLimit}
                onChange={(e) => {
                  if (!isFinite(Number(e.target.value))) {
                    return;
                  } else {
                    setCharacterLimit(e.target.value);
                  }
                }}
              />
            ) : (
              <InputChangeMaxTextLength
                type="text"
                value={characterLimit}
                onChange={(e) => {
                  if (!isFinite(Number(e.target.value))) {
                    return;
                  } else {
                    setCharacterLimit(e.target.value);
                  }
                }}
              />
            )}
          </StyledOption>
        </StyledOptions>

        <ApproxReadingTime>
          {`Approx. reading time: ${Math.floor(readingTime)} min ${Math.round(
            (readingTime % 1) * 60
          )} sec`}
        </ApproxReadingTime>
      </StyledOptionsContainer>
    </div>
  );
}

export default FormText;
