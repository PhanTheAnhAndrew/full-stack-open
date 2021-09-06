import React, { useState } from "react";

function PersonForm({ persons, onSubmit, onUpdate, onClearError }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleChangeNewNumber = (evt) => {
    setNewNumber(evt.target.value);
    onClearError();
  };
  const handleChangeNewName = (evt) => {
    setNewName(evt.target.value);
    onClearError();
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    const existedName = persons.some((each) => each.name === newName);
    let flag = false;
    if (
      (existedName &&
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with the new one?`
        )) ||
      !existedName
    ) {
      flag = true;
    }
    if (!flag) {
      return;
    }
    setNewName("");
    setNewNumber("");
    if (existedName) {
      const existedPerson = persons.find((each) => each.name === newName);
      const newPerson = { ...existedPerson, name: newName, number: newNumber };
      onUpdate(newPerson);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      onSubmit(newPerson);
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div>
        name: <input value={newName} onChange={handleChangeNewName} />
      </div>
      <br />
      <div>
        number: <input value={newNumber} onChange={handleChangeNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
