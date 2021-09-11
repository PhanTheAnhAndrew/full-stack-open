/* eslint-disable no-undef */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const Person = require('./models/person');

const app = express();

const getBodyContent = (req, res, next) => {
  if (req.method === 'POST' && req.body) {
    req.bodyContent = JSON.stringify(req.body);
  } else {
    req.bodyContent = '';
  }
  next();
};

morgan.token('bodyContent', (req) => {
  return req.bodyContent;
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(getBodyContent);
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :bodyContent'
  )
);

app.get('/api/persons', (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get('/api/info', (req, res) => {
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

app.get('/api/persons/:id', (req, res, next) => {
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

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
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

app.put('/api/persons/:id', (req, res, next) => {
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
