// external imports


// internal imports
const Todo = require("../models/todo.model")

// get all todos
async function getAllTotods(req, res){
    try{
        const todos = await Todo.find({user: req.user.id})
        res.status(200).json({
            status: true,
            data: todos
        })
    }catch(error){
        res.status(500).json({
            message: error.message,
            status: false,
        })
    }   
}

// add todo
async function addTodo(req, res){
    try {
        const todo = new Todo({
            user: req.user.id,
            ...req.body,
        });       
        await todo.save()
        res.status(200).json({
            message: "Todo added successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Todo did not added"
        })
    }
}

// delete todo
async function deleteTodo(req, res){
    try{
        await Todo.findOneAndDelete(req.body._id)
        res.status(200).json({
            message: "Todo deleted successfully"
        })

    }catch(error){
        res.status(500).json({
            message: "Todo id not match"
        })
    }
}

// update todo
async function updateTodo(req, res){
    try{
        await Todo.findOneAndUpdate(req.body._id, {user: req.user.id, ...req.body})
        res.status(200).json({
            message: "Todo update successfully"
        })
    }catch(error){
        res.status(500).json({
            message: "Todo didn't update"
        })
    }
}


module.exports = {
    getAllTotods,
    addTodo,
    deleteTodo,
    updateTodo
}