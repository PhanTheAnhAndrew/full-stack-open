import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((each) => (
        <Part key={each.id} part={each} />
      ))}
    </div>
  );
};

export default Content;
