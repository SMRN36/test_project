const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

// connect to the database
const sequelize = new Sequelize('test_project', 'root', 'Mysql@simran', {
  dialect: 'mysql',
  host: 'localhost'
});

// test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// define the Todo model
const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// sync the database
(async () => {
  try {
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to sync the database:', error);
  }
})();

// set up the view engine
app.set('view engine', 'ejs');

// set up middleware
app.use(express.urlencoded({ extended: true }));

// set up routes
app.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.render('index', { todos });
  } catch (error) {
    console.error('Unable to fetch todos:', error);
    res.status(500).send('Something went wrong');
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { name, description } = req.body;
    const todo = await Todo.create({ name, description });
    res.redirect('/');
  } catch (error) {
    console.error('Unable to create todo:', error);
    res.status(500).send('Something went wrong');
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    todo.completed = true;
    await todo.save();
    res.send('Todo marked as completed');
  } catch (error) {
    console.error('Unable to update todo:', error);
    res.status(500).send('Something went wrong');
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    await todo.destroy();
    res.send('Todo deleted');
  } catch (error) {
    console.error('Unable to delete todo:', error);
    res.status(500).send('Something went wrong');
  }
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
