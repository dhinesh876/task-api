const { fakeDbFind, tasks} = require('../model/db_model.js')
const { validationResult } = require('express-validator');

const getalldata = (req, res) => {
  try{
  res.json(tasks);
   }
  catch(err) //this also err send res as 404 with err message
  {
      res.status(404).json({status : false, message : err.message});
  }
}

const gettask_id = async (req, res) => {
  try{
  const id = Number(req.params.id); //this is change need to change string number
  const task = await fakeDbFind(id);

  //check username is match with current user
  if(req.user.username !== req.body.username){
      res.status(404).json({status : false, message : "invaild user"});
  }

  res.json(task);
  }
  catch(err) //this also err send res as 404 with err message
  {
      res.status(404).json({status : false, message : err.message});
  }
}

const post_task = (req, res) => {
  try{

    const errordata = validationResult(req);

    if(!errordata.isEmpty())
    {
        res.status(400).json({status : false, error : errordata.array()});
    }

  const title = req.body.title;

  //check username is match with current user
  if(req.user.username !== req.body.username){
      res.status(404).json({status : false, message : "invaild user"});
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    done: false
  };

  tasks.push(newTask);
  res.json(newTask);
   }
  catch(err) //this also err send res as 404 with err message
  {
      res.status(404).json({status : false, message : err.message});
  }
}

const update_task = (req, res) => {
  try{
  const id = Number(req.params.id);

    //check username is match with current user
  if(req.user.username !== req.body.username){
      res.status(404).json({status : false, message : "invaild user"});
  }

  const task = tasks.find(t => t.id === id);

  if (!task) {
   return res.status(404).json({ error: 'Task not found' }); //not found mean it should return back
  }
  
  task.title = req.body.title;
  task.done = req.body.done;

  res.json(task);
   }
  catch(err) //this also err send res as 404 with err message
  {
      res.status(404).json({status : false, message : err.message});
  }
}

const delete_task = (req, res) => {

  try{
  const id = Number(req.params.id);

    //check username is match with current user
  if(req.user.username !== req.body.username){
      res.status(404).json({status : false, message : "invaild user"});
  }

    const task = tasks.filter(t => t.id !== id);

    console.log(task," sdfcv ");

     res.json({ message: 'Task deleted' });
  }
  catch(err)
  {
    res.status(404).json({status : false, message : err.message});
  }

}

module.exports = {
getalldata,
gettask_id,
post_task,
update_task,
delete_task
};
