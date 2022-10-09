const { application } = require("express")
const { markComplete, markIncomplete } = require("../../controllers/todos")

const deleteBtn= document.querySelectorAll('.del')          //with a class of .del
const todoItem= document.querySelectorAll('span.not')        //span with a class not on it
const todoComplete= document.querySelectorAll('span.completed')     //span with a class of completed on it


//if it has the del class it will be heard by this smurf
//and run the deletBtn function
Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteBtn)
})

//if it has the not class it will be heard by this smurf
//and run the markComplete function
Array.from(todoItem).forEach((el) => {
    el.addEventListener('click', markComplete)
})


//if it has the completed class it will be heard by this smurf
//and run the markIncomplete function
Array.from(todoComplete).forEach((el) => {
    el.addEventListener('click', markIncomplete)
})

//need to write the 3 above functions
//need to make them all async functions so they dont block


async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{                            //we go to ur router to see whats happening in concert with the deleteTodo thats also in our control and working together with our client side JS
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//this all works in concert with the todos controller markComplete 
async function markComplete(){
    //when we clicked on this in our browser, we are clicking on the span, we need to grab the id which is up a level (the id is on the li not the
    //span) in order to do this we need to grab the parent
                //i just clicked on that text (this.) we're going up a level to the li (parentNode.) then look at the data attribute (dataset.id)
                //note you can use dataset.____ whatever name is it you gave your data attribute, we gave ours .id
    const todoId= this.parentNode.dataset.id
    try{        //we're making the request to our server with fetch
        const response= await fetch('todos/markComplete', {
                //its  put request cause we're updating it by marking it complete
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    //todoId           //we're pasing along the unique id we grabbed and using descturing here again to call it todoId
                    'todoIdFromJSFile': todoId
                })
        })
        const data = await response.json()
        console.log(data)
                //reload the page
        location.reload()
    }catch(err){
        console.log(err)
    }
}


//the mark incomplete function does almost the same exact thing as above except it has a slightly different route

async function markComplete(){
    const todoId= this.parentNode.dataset.id
    try{
        const response= await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body:JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
         const data= await response.json()
         console.log(data)
         location.reload()
    }catch(err){
        console.log(err)
    }
}

