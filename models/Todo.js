const mongoose= require('mongoose')

//This gives us our Todo Schema which gives us our structure, we use this model to talk to the DB

const TodoSchema= new mongoose.Schema({
    todo:{
        type: String,
        required: true,
    },
    completed:{
        type: Boolean,
        required: true,
    },
    userId:{
        type: String,
        required: true
    }
})

//export mongoose schema (model)

module.exports= mongoose.model('Todo', TodoSchema)