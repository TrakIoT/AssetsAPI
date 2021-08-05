const express = require("express");
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const db = require('./util/db');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/assets', routes);

app.listen(PORT, () => {
    console.log('Server running on port %d', PORT);
});