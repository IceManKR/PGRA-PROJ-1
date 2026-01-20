const store = require('../data/store');

exports.getTasks = (req, res) => {
  res.json(store.tasks);
};

exports.createTask = (req, res) => {
  const task = { id: Date.now(), title: req.body.title };
  store.tasks.push(task);
  res.status(201).json(task);
};

exports.deleteTask = (req, res) => {
  store.tasks = store.tasks.filter(t => t.id != req.params.id);
  res.json({ message: 'Task deleted' });
};
