import React from "react";
import Country from "./Country";
import Summary from "./Summary";

function Countries({ countries }) {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    return <Country show country={countries[0]} />;
  }

  return (
    <div>
      {countries.map((each) => {
        const { name } = each;
        return <Summary key={name} country={each} />;
      })}
    </div>
  );
}

export default Countries;
