// external imports
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require("mongoose")

// internal imports
const useSignupRouter = require("./router/user/useSignupRouter")
const useLoginRouter = require("./router/user/useLoginRouter")

const useAddDivision = require("./router/useAddDivision")
const useAddDistrict = require("./router/useAddDistrict")
const useAddSubDistrict = require("./router/useAddSubDistrict")
const useAddUnion = require("./router/useAddUnion")

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
app.use("/sign-up", useSignupRouter)

// address route
app.use("/division", useAddDivision)
app.use("/district", useAddDistrict)
app.use("/sub-district", useAddSubDistrict)
app.use("/union", useAddUnion)

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