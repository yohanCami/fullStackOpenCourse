const express = require("express");
const app = express();

const morgan = require("morgan");

// Definir un formato personalizado para morgan
morgan.token("postData", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

// Configurar morgan con el nuevo formato personalizado
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postData"
  )
);

//Creando un Middelware

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(express.json());
app.use(requestLogger);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },

  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },

  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },

  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
  console.log(persons);
});

const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  console.log(body);

  const exist = persons.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (exist) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.get("/info", (request, response) => {
  const totalPerson = persons.length;
  const date = new Date();

  response.send(
    `<div>Phonebook has info for ${totalPerson} people <br /><br /> ${date}</div>`
  );
});

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
