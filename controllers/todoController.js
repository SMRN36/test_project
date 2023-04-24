const Todo = require('../models/Todo');

exports.getAllTodos = async (req, res) => {
  const todos = await Todo.findAll();
  res.render('index', { todos });
};

exports.addTodo = async (req, res) => {
  const { name, description } = req.body;

  const todo = await Todo.create({
    name,
    description
  });

  res.redirect('/');
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  await Todo.destroy({
    where: {
      id
    }
  });

  res.sendStatus(200);
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByPk(id);
  todo.completed = !todo.completed;

  await todo.save();

  res.sendStatus(200);
};
