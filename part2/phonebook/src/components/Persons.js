import React from "react";

function Persons({ persons, filter, onDelete }) {
  const filteredPersons = persons.filter((each) => each.name.includes(filter));

  const handleDelete = (person) => () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      onDelete(person);
    }
  };

  return (
    <>
      {filteredPersons.map((each) => (
        <p key={each.id}>
          {each.name} {each.number}{" "}
          <button onClick={handleDelete(each)}>delete</button>
        </p>
      ))}
    </>
  );
}

export default Persons;
