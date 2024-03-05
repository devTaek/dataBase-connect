import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.get('/places', async (req, res) => {
  const fileContent = await fs.readFile('./data/places.json');

  /* JSON.parse() 함수는 JavaScript에서 JSON 형식의 문자열을 파싱하고 JavaScript 객체로 변환하는 데 사용하는 함수입니다. 이것으로 JSON 문자열을 JavaScript 객체로 변환할 수 있습니다. JSON.parse() 함수는 주로 서버에서 받은 JSON 데이터를 JavaScript 객체로 변환하거나 웹 애플리케이션에서 JSON 데이터를 처리할 때 사용합니다. 이를 통해 데이터를 읽고 조작하는 데 유용하며, reviver 함수를 사용하여 파싱 중에 특정 값 변환을 수행할 수 있습니다. */
  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

app.get('/user-places', async (req, res) => {
  const fileContent = await fs.readFile('./data/user-places.json');

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put('/user-places', async (req, res) => {
  const places = req.body.places;

  await fs.writeFile('./data/user-places.json', JSON.stringify(places));

  res.status(200).json({ message: 'User places updated!' });
});

// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000);
