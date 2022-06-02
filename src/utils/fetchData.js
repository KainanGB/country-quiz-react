export const fetchData = async () => {
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
  });

  return data;
};
