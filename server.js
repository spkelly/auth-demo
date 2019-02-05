const path = require("path");
const express = require('express');
const routes = require('./routes');
const requestLogger = require('./middleware').requestLogger;


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('x-powered-by', false);
app.set('views', path.resolve(__dirname,"views"));

app.use(express.static(path.resolve(__dirname,"public")));

app.use(requestLogger);
app.use(routes);

app.listen(port);

