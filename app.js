const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

// connect to the database
const sequelize = new Sequelize('test_project', 'root', 'Mysql@simran', {
  dialect: 'mysql',
  host: 'localhost'
});

// define the Todo model
const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// sync the database
(async () => {
  await sequelize.sync();
})();

// set up the view engine
app.set('view engine', 'ejs');

// set up middleware
app.use(express.urlencoded({ extended: true }));

// set up routes
app.get('/', async (req, res) => {
  const todos = await Todo.findAll();
  res.render('index', { todos });
});

app.post('/todos', async (req, res) => {
  const { name, description } = req.body;
  const todo = await Todo.create({ name, description });
  res.redirect('/');
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);
  if (!todo) {
    return res.status(404).send('Todo not found');
  }
  todo.completed = true;
  await todo.save();
  res.send('Todo marked as completed');
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);
  if (!todo) {
    return res.status(404).send('Todo not found');
  }
  await todo.destroy();
  res.send('Todo deleted');
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
