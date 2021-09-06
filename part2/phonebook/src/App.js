import React, { useState, useEffect } from "react";

import personService from "./services";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const handleChangeFilter = (evt) => setFilter(evt.target.value);

  const handleSubmitForm = (newPerson) => {
    personService.createPerson(newPerson).then((res) => {
      setPersons(persons.concat(res));
      setErrorMessage(`Added ${newPerson.name}`);
    });
  };

  const handleDeletePerson = (person) => {
    personService.deletePerson(person).then((res) => {
      if (res) {
        const newPersons = persons.filter((each) => each.id !== person.id);
        setPersons(newPersons);
        setErrorMessage(`Deleted ${person.name}`);
      } else {
        setErrorMessage(
          `Information of ${person.name} has already been removed from server`
        );
      }
    });
  };

  const handleUpdatePerson = (person) => {
    personService
      .updatePerson(person)
      .then((res) => {
        setPersons(persons.map((each) => (each.id !== res.id ? each : res)));
        setErrorMessage(`Updated ${person.name}`);
      })
      .catch(() => {
        alert(`the person ${person.name} was already deleted from server`);
        setPersons(persons.filter((each) => each.id !== person.id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} onChange={handleChangeFilter} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        onSubmit={handleSubmitForm}
        onUpdate={handleUpdatePerson}
        onClearError={() => setErrorMessage("")}
      />
      <h2>Numbers</h2>
      <Persons
        filter={filter}
        persons={persons}
        onDelete={handleDeletePerson}
      />
    </div>
  );
};

export default App;
