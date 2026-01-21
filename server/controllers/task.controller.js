const Task =  require('../models/Task');

exports.getTasks=async(req,res)=>{
  const page = Math.max(parseInt(req.query.page)||1,1);
  const limit=Math.min(parseInt(req.query.limit)||10,50);
  const skip=(page-1)*limit;

  const sort = req.query.sort || '-createdAt';

  const filter={userId:req.userId};

  const tasks =  await Task.find(filter)
   .sort(sort)
   .skip(skip)
   .limit(limit);
   
   const total  = await Task.countDocuments(filter);

   res.json({
    page,
    limit,
    total,
    results:tasks.length,
    data:tasks
   });
};
exports.createTask = async (req, res) => {
  if (!req.body.title) {
    throw new ApiError(400, 'Task title is required');
  }

  const task = await Task.create({
    title: req.body.title,
    userId: req.userId
  });

  res.status(201).json(task);
};

exports.deleteTask = async (req, res) => {
  const deleted = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId
  });

  if (!deleted) {
    throw new ApiError(404, 'Task not found');
  }

  res.json({ message: 'Task deleted' });
};