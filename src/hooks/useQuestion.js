import { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";

const QuestionContext = createContext();

export const QuestionProvider = (props) => {
  const [countryData, setcountryData] = useState([]);
  const [question, setQuestion] = useState({});

  async function getData() {
    const data = await fetchData();
    createRandomQuestion(data);
    setcountryData(data);
    return data;
  }

  const createRandomQuestion = (data) => {
    const randomIndex = Math.floor(Math.random() * 250);
    let randomQuestion = Math.floor(Math.random() * 4);
    //const threeRandomNums = Math.floor(Math.random() * 3);

    const questions = [
      { data: "capital", question: "is the capital of" },
      {
        data: "languages",
        question: "This country can speak more than one language?",
      },
      {
        data: "continent",
        question: "Which Continent",
      },
      { data: "flag", question: "Which country this flag belongs to" },
    ];

    const continents = [
      "Africa",
      "Asia",
      "Europe",
      "South America",
      "North America",
      "Antarctica",
      "Australia",
      "Oceania",
    ];

    let finalQuestionObject = [];
    let threeRandomOptions = [];
    randomQuestion = 3;

    // get random data
    data
      .splice(randomIndex, 3)
      .map(({ name, languages, capital, continent, flag }) => {
        threeRandomOptions.push({
          country: name,
          languages: languages,
          capital: capital,
          continent: continent,
          flag: flag,
        });
        return threeRandomOptions;
      });

    let continentTree = continents.map((continent) => continent);
    let countryTree = threeRandomOptions.map(({ country }) => country);

    if (questions[randomQuestion].data === "capital") {
      countryTree.push(data[randomIndex].name);

      let sortedArray = countryTree.sort();

      finalQuestionObject.push({
        data: questions[randomQuestion].data,
        question: questions[randomQuestion].question,
        capital: data[randomIndex].capital,
        answer: data[randomIndex].name,
        otherOptions: sortedArray,
        id: data[randomIndex].id,
      });
    }

    if (questions[randomQuestion].data === "continent") {
      continentTree.sort();

      finalQuestionObject.push({
        data: questions[randomQuestion].data,
        question: questions[randomQuestion].question,
        country: data[randomIndex].name,
        answer: data[randomIndex].continent,
        otherOptions: continentTree,
      });
    }

    if (questions[randomQuestion].data === "languages") {
      finalQuestionObject.push({
        data: questions[randomQuestion].data,
        question: questions[randomQuestion].question,
        country: data[randomIndex].name,
        flag: data[randomIndex].flag,
        answer: data[randomIndex].languages,
      });
    }

    if (questions[randomQuestion].data === "flag") {
      countryTree.push(data[randomIndex].name);

      let sortedArray = countryTree.sort();

      finalQuestionObject.push({
        data: questions[randomQuestion].data,
        question: questions[randomQuestion].question,
        country: data[randomIndex].name,
        flag: data[randomIndex].flag,
        otherOptions: sortedArray,
        id: data[randomIndex].id,
      });
    }

    setQuestion(finalQuestionObject);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <QuestionContext.Provider value={question}>
      {props.children}
    </QuestionContext.Provider>
  );
};

export function useQuestion() {
  const context = useContext(QuestionContext);
  return context;
}
