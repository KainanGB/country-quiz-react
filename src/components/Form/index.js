import { useEffect, useState } from "react";

export const Form = () => {
  const [countryData, setcountryData] = useState([]);

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

      return api;
    });

    console.log(data.map((item) => item));
    setcountryData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {countryData.map((country, index) => {
        return (
          <div key={index}>
            <img src={country.flag} alt="" />
            <h1>{country.name}</h1>
            <h2>{country.capital}</h2>
            <h2>{country.continent}</h2>
            <h2>{country.languages.join(" | ")}</h2>
          </div>
        );
      })}
    </>
  );
};
