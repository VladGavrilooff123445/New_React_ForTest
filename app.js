const apiRoute = require("./router/api");

const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();


app.use(cors());

const router = express.Router();

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use(express.json({limit: '50mb'}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoute);

app.listen(3000);


router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

