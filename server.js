const express= require('express')
const app= express()
const mongoose= require('mongoose')
const passport= require('passport')
const session= require('express-session')
const MongoStore= require('connect-mongo') (session)
const flash= require('express-flash')
const logger= require('morgan')
const connectDB= require('./config/database')
const mainRoutes= require('./routes/main') //defines main routes path
const todoRoutes= require('./routes/todos') //defines todos routes path

//need to add all of our dependencies still************************

//add env depedency
//create DB and get connection string

require('dotenv').config({path: './config/.env'})

//passport config
require('./config/passport') (passport)

connectDB()

//this is our API

app.set('view engine', 'ejs')
//middleware that enables us to serve our static files (not able to do this with express unless we include this line)
app.use(express.static('public'))
//the 2 lines below this replace bodyparser
app.use(express.urlencoded({extended: true}))
app.use(express.json())
//telling the app to use morgan as our logger
app.use(logger('dev'))

//Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection})
    })
)


//passport midddleware
app.use(passport.initialize())
app.use(passport.session())

//ROUTES *************************************
//our /signup etc goes to the mainRoutes (the only thing using /todos routes is the todos)
//when you go to routes/main you can see all of the .signup methods on the routes etc
app.use('/', mainRoutes)   // says if you're looking for the root route next stop is the mainRoutes (file path is defined above)
app.use('/todos', todoRoutes) //says if you're looking for the todoRoutes next stop is the todos routes (file path to get there is defined above)


//using our environment variable for the PORT which enables us to setup our app for deployment, dont want to hard code the port because the
//place deploying your app on will prob want to use their own port (this makes it be able to do that)
app.listen(process.env.PORT, () =>{
    console.log('Server is running you better catch it')
})