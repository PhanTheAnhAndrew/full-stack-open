import React from "react";

const Total = ({ parts }) => {
  const total = parts.reduce((res, cur) => {
    return res + cur.exercises;
  }, 0);

  return (
    <p>
      <strong>
        total of {total} {total > 1 ? "exercises" : "exercise"}
      </strong>
    </p>
  );
};

export default Total;
