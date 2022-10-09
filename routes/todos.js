const express= require('express')
const router= express.Router()
const todosController= require('../controllers/todos')
//authentication
const {ensureAuth}= require('../middleware/auth')

/*ROUTES*/

//GET ensure authenticate, then go to todosController.getTodos
router.get('/', ensureAuth, todosController.getTodos)


//POST createTodo
router.post('/createToDo', todosController.createTodo)

//PUT markComplete
router.put('/markComplete', todosController.markComplete)

//PUT markIncomplete
router.put('/markIncomplete', todosController.markComplete)

//Delete deleteTodo
router.delete('/deleteTodo', todosController.deleteTodo)


//Export the router
module.exports= router