import styled from "styled-components";
import { useProject } from "../contexts/ProjectProvider";

const StyledCounters = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 850px) {
    grid-template-columns: repeat(3, 1fr);

    margin-top: 3rem;
  }
`;

const Box = styled.div`
  padding: 1rem;
  background-color: var(--neutral-200);
  border-radius: 0.75rem;

  @media (min-width: 850px) {
    background-repeat: no-repeat;
    background-position: 120% 20%;
    background-size: contain;
  }

  @media (min-width: 900px) {
    background-position: 110% 50%;
  }

  &::after {
    position: absolute;
    bottom: 0;
    right: 0;
    max-height: 100%;

    @media (min-width: 850px) {
      display: none;
    }
  }

  & h2 {
    @media (min-width: 850px) {
      font-size: 3rem;
      font-weight: 800;
    }

    color: #000;
    font-weight: 700;
  }
`;

const PurpleBox = styled(Box)`
  background-color: var(--purple-blue-400);
  position: relative;
  overflow: hidden;

  &::after {
    content: url("/images/pattern-character-count.svg");
  }

  @media (min-width: 850px) {
    background-image: url("/images/pattern-character-count.svg");
  }
`;

const YellowBox = styled(Box)`
  background-color: var(--yellow-500);
  position: relative;
  overflow: hidden;

  &::after {
    content: url("/images/pattern-word-count.svg");
  }

  @media (min-width: 850px) {
    background-image: url("/images/pattern-word-count.svg");
  }
`;

const OrangeBox = styled(Box)`
  background-color: var(--orange-500);
  position: relative;
  overflow: hidden;

  &::after {
    content: url("/images/pattern-sentence-count.svg");
  }

  @media (min-width: 850px) {
    background-image: url("/images/pattern-sentence-count.svg");
  }
`;

function Counters() {
  const { text, excludeSpaces } = useProject();

  return (
    <StyledCounters>
      <PurpleBox>
        <h2>
          {text.length === 0
            ? "00"
            : excludeSpaces
            ? text.replaceAll(" ", "").length === 0
              ? "00"
              : text.replaceAll(" ", "").length
            : text.length}
        </h2>
        <p>Total Characters</p>
      </PurpleBox>

      <YellowBox>
        <h2>{text.trim() === "" ? "00" : text.trim().split(/\s+/).length}</h2>
        <p>Word Count</p>
      </YellowBox>

      <OrangeBox>
        <h2>
          {text.split(".").length - 1 === 0 ? "00" : text.split(".").length - 1}
        </h2>
        <p>Sentence Count</p>
      </OrangeBox>
    </StyledCounters>
  );
}

export default Counters;
