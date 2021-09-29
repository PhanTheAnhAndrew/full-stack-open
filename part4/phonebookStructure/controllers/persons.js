const personRouter = require('express').Router();
const Person = require('../models/person');

personRouter.get('/', (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

personRouter.get('/api/info', (req, res) => {
  Person.find({}).then((people) => {
    const phonebookLength = people.length;
    res.send(
      `<p>Phonebook has info for ${phonebookLength} ${
        phonebookLength <= 1 ? 'person' : 'people'
      }</p>
    <p>${new Date().toString()}</p>
    `
    );
  });
});

personRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(400).end();
      }
    })
    .catch((error) => next(error));
});

personRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

personRouter.post('', (req, res, next) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({
      error: 'name missing',
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: 'number missing',
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});


personRouter.put('/:id', (req, res, next) => {
  const {
    body: { name, number },
  } = req;

  const person = {
    name,
    number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error));
});

module.export = personRouter;