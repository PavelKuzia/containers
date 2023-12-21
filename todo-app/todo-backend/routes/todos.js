const express = require('express');
const { Todo } = require('../mongo')
const redis = require('../redis')
const router = express.Router();

let add = 0

/* GET todos listing. */
router.get('/', async (_, res) => {
  console.log('In get!')
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const currentVal = await redis.getAsync('added_todos')
  let val = 0
  if (!currentVal) {
    await redis.setAsync('added_todos', 1)
    val = 1
  } else {
    val = parseInt(currentVal) + 1
    await redis.setAsync('added_todos', val)
  }

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  await Todo.findByIdAndUpdate(req.todo._id, {...req.body}, {useFindAndModify: false })
  const todo = await Todo.findById(req.todo._id)
  res.send(todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
