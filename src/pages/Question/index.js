import { useQuestion } from "../../hooks/useQuestion";
import "./style.css";

export const Question = (props) => {
  const question = useQuestion();

  const formattedQuestion = question[0];

  return formattedQuestion ? (
    <div className="container">
      <h1 className="container-title">Country Quiz</h1>
      <div className="question">
        <img src={formattedQuestion.flag} alt="" />
        <h1>{formattedQuestion.question}</h1>

        <ul className="questions">
          {formattedQuestion.otherOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
          <button onClick={(event) => props.onClick(event, formattedQuestion)}>
            Confirmar
          </button>
        </ul>
      </div>
    </div>
  ) : (
    "loading....."
  );
};
