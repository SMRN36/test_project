const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRouter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
// specify the views directory
app.set('views', './views');


app.use(todoRoutes);
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
