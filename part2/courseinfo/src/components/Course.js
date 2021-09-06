import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ courses }) => {
  const courseElems = courses.map((each) => {
    const { name, id, parts } = each;
    return (
      <div key={id}>
        <Header isSubHeader course={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    );
  });

  return (
    <div>
      <Header course="Web development curriculum" />
      {courseElems}
    </div>
  );
};

export default Course;
