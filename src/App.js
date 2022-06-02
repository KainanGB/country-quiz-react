import { useState } from "react";
import { QuestionProvider } from "./hooks/useQuestion";
import { Question } from "./pages/Question";
import "./style.css";

function App() {
  const [selected, setSelected] = useState(false);

  const handleClick = (event, data, id) => {
    console.log(data);
    if (event === data) {
      //setQuestion((question) =>
      //  question.map((item) =>
      //    item.id === data.id ? { ...item, selected: "selected" } : item
      //  )
      //);
      //setQuestion([...question, question.id:{ selected: "selected" }]);
    }
  };

  return (
    <QuestionProvider>
      <Question onClick={handleClick} />
    </QuestionProvider>
  );
}

export default App;
