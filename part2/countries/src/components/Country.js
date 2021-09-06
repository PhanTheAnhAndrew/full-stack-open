import React from "react";
import Weather from "./Weather";

const Languages = ({ languages }) => {
  const liElems = languages.map((each) => (
    <li key={`language-${each.name}`}>{each.name}</li>
  ));
  return <ul>{liElems}</ul>;
};

function Country({ country, show }) {
  const { name, capital, population, languages, flag } = country;

  return (
    <div style={{ display: show ? "block" : "none" }}>
      <h1>{name}</h1>
      <div>{capital}</div>
      <div>population {population}</div>
      <h2>languages</h2>
      <Languages languages={languages} />
      <img width={100} height={100} src={flag} alt={name} />
      {show ? <Weather name={name} /> : null}
    </div>
  );
}

export default Country;
