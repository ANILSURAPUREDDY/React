import { useRef } from "react";

export default function Answers({
  answers,
  answerState,
  selectedAnswer,
  onSelect,
}) {
  const shuffingAnswer = useRef();

  if (!shuffingAnswer.current) {
    shuffingAnswer.current = [...answers];
    shuffingAnswer.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffingAnswer.current.map((answer) => {
        let isSelected = selectedAnswer === answer;
        let cssClass = "";

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li className="answer" key={answer}>
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
