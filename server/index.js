const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.options('/sign-up', cors());

const users = [];

app.post('/sign-up', cors(corsOptions), jsonParser, (req, res) => {
  const { body } = req;
  if (users.find(user => user.email === body.email)) {
    res.status(400).send('Пользователь с такой почтой уже есть');
    return;
  }
  const filteredBody = { ...body };
  delete filteredBody.acceptTerms;
  users.push(filteredBody);
  res.status(200).send();
  console.log(users);
});

app.listen(2400, () => console.log('Сервер стартовал'));
