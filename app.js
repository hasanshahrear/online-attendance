// external imports
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const geolib = require('geolib');

// internal imports
const useSignupRouter = require("./router/user/useSignupRouter")
const useLoginRouter = require("./router/user/useLoginRouter")
const useUpdateLocation = require("./router/user/useUpdateLocation")
const useGetLocation = require("./router/user/useGetLocation")

const useAddDivision = require("./router/useAddDivision")
const useAddDistrict = require("./router/useAddDistrict")
const useAddSubDistrict = require("./router/useAddSubDistrict")
const useAddUnion = require("./router/useAddUnion")
const useAttendanceRouter = require("./router/useAttendanceRouter")

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
app.use("/login", useLoginRouter )
app.use("/sign-up", useSignupRouter)
app.use("/update-location", useUpdateLocation)
app.use("/get-location", useGetLocation)

// address route
app.use("/division", useAddDivision)
app.use("/district", useAddDistrict)
app.use("/sub-district", useAddSubDistrict)
app.use("/union", useAddUnion)

// attendance route
app.use("/attendance", useAttendanceRouter)


app.use("/todo-add", useAddTodoRouter)
app.use("/todo-delete", useDeleteTodoRouter)
app.use("/todo-update", useUpdateTodoRouter)


app.delete("/todo-remove", (req, res, next)=>{
    res.send("Your deleting")
})
app.patch("/todo-update", (req, res, next)=>{
    res.send("Your Updating")
})



const location1 = { latitude: 51.5103, longitude: 7.49347 };
const location2 = { latitude: 51.5081, longitude: 7.4934 };

const distance = geolib.getDistance(location1, location2);
console.log(distance); // Output: 286
console.log(distance/1000 + 'km'); // Output : 0.286km




// start server 
app.listen(process.env.PORT, ()=>{
    console.log(`Server Running at ${process.env.PORT}`)
})