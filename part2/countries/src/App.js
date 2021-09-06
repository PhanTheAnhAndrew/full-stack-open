import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => setCountries(res.data));
  }, []);

  const handleChangeFilter = (evt) => setFilter(evt.target.value.toLowerCase());
  const filteredCountries = countries.filter((each) =>
    each.name.toLowerCase().includes(filter)
  );

  return (
    <div>
      <Filter filter={filter} onChange={handleChangeFilter} />
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
