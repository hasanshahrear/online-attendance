// external imports
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require("mongoose")

// internal imports
const useSignupRouter = require("./router/user/useSignupRouter")
const useLoginRouter = require("./router/user/useLoginRouter")

const useTodoRouter = require("./router/useTodoRouter")
const useAddTodoRouter = require("./router/useAddTodoRouter")
const useDeleteTodoRouter = require("./router/useDeleteTodoRouter")
const useUpdateTodoRouter = require("./router/useUpdateTodoRouter")

// app
const app = express()
dotenv.config()

// database connection
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, {
    autoIndex: true,
})
.then(()=> console.log("Database connection successfully"))
.catch(err => console.log(err))


// request parse
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// routing setup
// login route
app.use("/", useLoginRouter )
app.use("/signup", useSignupRouter)

// todo route
app.use("/todos", useTodoRouter)
app.use("/todo-add", useAddTodoRouter)
app.use("/todo-delete", useDeleteTodoRouter)
app.use("/todo-update", useUpdateTodoRouter)


app.delete("/todo-remove", (req, res, next)=>{
    res.send("Your deleting")
})
app.patch("/todo-update", (req, res, next)=>{
    res.send("Your Updating")
})



// start server 
app.listen(process.env.PORT, ()=>{
    console.log(`Server Running at ${process.env.PORT}`)
})