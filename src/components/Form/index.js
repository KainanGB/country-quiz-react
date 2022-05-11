import { useEffect, useState } from "react";
import "./style.css";

export const Form = () => {
  const [countryData, setcountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [question, setQuestion] = useState([]);

  const fetchData = async () => {
    const api = await fetch("https://restcountries.com/v3.1/all").then((res) =>
      res.json()
    );
    const data = [];

    api.map(({ name, flags, continents, languages, capital }, index) => {
      let filteredLanguages = [];
      for (let key in languages) {
        filteredLanguages.push(languages[key]);
      }
      data.push({
        id: index,
        name: name["common"],
        flag: flags.svg,
        continent: continents,
        languages: filteredLanguages,
        capital: capital,
      });

      return data;
    });

    setcountryData(data);
    createRandomQuestion(data);
  };

  const createRandomQuestion = (data) => {
    const randomIndex = Math.floor(Math.random() * 250);
    let randomQuestion = Math.floor(Math.random() * 4);
    //const threeRandomNums = Math.floor(Math.random() * 3);

    const questions = [
      { data: "capital", question: "What's the capital of" },
      {
        data: "languages",
        question:
          "Some Countries can speak more than one language, but this one can?",
      },
      {
        data: "continent",
        question: "Which Continent this country is part of",
      },
      { data: "flag", question: "Which country this flag is from" },
    ];
    let finalQuestionObject = [];
    let threeRandomOptions = [];

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
      });

    let capitalTree = threeRandomOptions.map(({ capital }) => capital);
    let continentTree = threeRandomOptions.map(({ continent }) => continent);
    let multipleLangTree = threeRandomOptions.map(({ languages }) => languages);
    //let flagTree = threeRandomOptions.map(({ flag }) => flag);
    let countryTree = threeRandomOptions.map(({ country }) => country);

    //console.log(data[randomIndex].continent);

    console.log(questions[randomQuestion].question);

    if (questions[randomQuestion].data === "capital") {
      console.log(capitalTree);

      capitalTree.push([data[randomIndex].capital]);
      capitalTree.sort();

      console.log(capitalTree);

      finalQuestionObject.push({
        data: questions[randomQuestion].data,
        question: questions[randomQuestion].question,
        country: data[randomIndex].name,
        answer: data[randomIndex].capital,
        otherOptions: capitalTree,
      });
    }

    if (questions[randomQuestion].data === "continent") {
      console.log(continentTree);

      continentTree.push(data[randomIndex].continent);
      continentTree.sort();
      console.log(continentTree);

      finalQuestionObject.push({
        data: questions[randomQuestion].data,
        question: questions[randomQuestion].question,
        country: data[randomIndex].name,
        answer: data[randomIndex].continent,
        otherOptions: continentTree,
      });
    }

    if (questions[randomQuestion].data === "languages") {
      console.log(multipleLangTree);

      multipleLangTree.push([data[randomIndex].languages]);
      multipleLangTree.sort();
      console.log(multipleLangTree);

      finalQuestionObject.push({
        data: questions[randomQuestion].data,
        question: questions[randomQuestion].question,
        country: data[randomIndex].name,
        answer: data[randomIndex].languages,
        otherOptions: multipleLangTree,
      });
    }

    if (questions[randomQuestion].data === "flag") {
      console.log(countryTree);

      countryTree.push(data[randomIndex].name);
      countryTree.sort();
      console.log(countryTree);

      finalQuestionObject.push({
        data: questions[randomQuestion].data,
        question: questions[randomQuestion].question,
        country: data[randomIndex].name,
        flag: data[randomIndex].flag,
        otherOptions: countryTree,
      });
    }

    setQuestion(finalQuestionObject);
  };

  useEffect(() => {
    fetchData();
    //createRandomQuestion();
  }, []);

  return (
    <>
      {question.map((item, index) => {
        if (item.data === "flag") {
          return (
            <div className="question" key={index}>
              <h1>{item.question} </h1>
              <img src={item.flag} alt="" />
              <ul>
                {item.otherOptions.map((moreCountry, index) => (
                  <li key={index}>
                    <p>{moreCountry}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        if (item.data === "capital") {
          return (
            <div className="question" key={index}>
              <h1>
                {item.question}: {item.country}
              </h1>
              <ul>
                {item.otherOptions.map((capital, index) => (
                  <li key={index}>{capital}</li>
                ))}
              </ul>
            </div>
          );
        }

        if (item.data === "continent") {
          return (
            <div className="question" key={index}>
              <h1>
                {item.question}: {item.country}
              </h1>
              <ul>
                {item.otherOptions.map((continent, index) => (
                  <li key={index}>{continent}</li>
                ))}
              </ul>
            </div>
          );
        }

        if (item.data === "languages") {
          return (
            <div className="question" key={index}>
              <h1>
                {item.question}: {item.country}
              </h1>
            </div>
          );
        }
      })}
    </>
  );
};
