const Todo= require('../models/Todo')    //using our Todo model in conjunction with mongoose so it does alot of stuff for ut
                                         

module.exports= {
    getTodos: async (req, res) =>{
        //this gives us the ability to see the user that's making the request, we can now see everything about that logged in user (every user has their own unique id)
        console.log(req.user)
        try{
            //goes to our db and finds all of our documents, passes those into our todoItems then passes them into our ejs on code line below
            //we're using the userId to grab the todoItems for a specific user
                                //Todo is capitalized because its our Todo model we have to go through out model and find out todo file
                                                //userId equals req.user.id ////remember req.user is the logged in user & the user var is coming from passport 
            const todoItems= await Todo.find({userId:req.user.id,completed: false})
           
            //we dont need toArray() here because we're using mongoose so it automtically does this for us
            //countDocuments({}) is allowing us to count how many items there are left to be its doing this by counting how many documents have the completed property of false
            //notice itemsLeft, the below code: is destructuring it and naming it: left, which we use in our ejs 

            const itemsLeft= await Todo.countDocuments({userId:req.user.id, completed:false})
            //passes our documents into our ejs
            //we are using destructuring to pass our todoItems in as todos so now where we see todos in our ejs 
            //its our todoItems which is all of our 
            //documents we are passing in from our db
                                                      //descturing itemsLeft and naming it: left which is what we use in our todos.ejs
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user:req.user })
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res) =>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Todo has been added')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res) => {
        try{            //we're going to find one  document and update
                        //we're going to find the documents who's id   _id: matches the id we just sent along in our client side JS from the markComplete function from our click even
                                                        //which is also .todoIdFromJSFile 
            await Todo.findOneAndUpdate({_id: req.body.todoIdFromJSFile},{
                            //now that we've found that document we're going to update it the completed and set it to true
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res) => {
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                //almost idental to the markComplete method except its being marked as false  //our client side js is whats doing the reloading for us
                completed:false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteToDo: async (req,res) => {
        console.log(req.body.todoIdFromJSFile)
    try{
        await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
        console.log('Deleted todo item')
        res.json('Deleted It')
    }catch(err){
        console.log(err)
    }
    }
}