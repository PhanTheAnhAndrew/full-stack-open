import React, { useState } from "react";
import Country from "./Country";

function Summary({ country }) {
  const [show, setShow] = useState(false);
  const { name } = country;

  return (
    <div key={name}>
      <div>
        {name}{" "}
        <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      </div>
      <Country show={show} country={country} />
    </div>
  );
}

export default Summary;
