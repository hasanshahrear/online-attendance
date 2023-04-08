// external imports
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const geolib = require('geolib');
const helmet = require('helmet');

// internal imports
// employee 
const useSignupRouter = require("./router/user/useSignupRouter")
const useLoginRouter = require("./router/user/useLoginRouter")
const useUpdateLocation = require("./router/user/useUpdateLocation")
const useGetLocation = require("./router/user/useGetLocation")
const useGetEmployeeReport = require("./router/user/useGetEmployeeReport")
const useCheckInRouter = require("./router/useCheckInRouter")
const useCheckOutRouter = require("./router/useCheckOutRouter")

// admin
const useAdminSignupRouter = require("./router/admin/useAdminSignupRouter")
const useAdminLoginRouter = require("./router/admin/useAdminLoginRouter")
const useAddDistrict = require("./router/useAddDistrict")
const useAddSubDistrict = require("./router/useAddSubDistrict")
const useAddUnion = require("./router/useAddUnion")
const useAddDesignation = require("./router/useAddDesignation")
const useAddGender = require("./router/useAddGender")
const useWeeklyHolidays = require("./router/useAddWeeklyHolidays")
const useActiveWeeklyHoliday = require("./router/useActiveWeeklyHolidays")
const useHolidays = require("./router/useAddHolidays")



const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

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
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// routing setup

// login route
app.use("/login", useLoginRouter )
app.use("/api/sign-up", useSignupRouter)
app.use("/update-location", useUpdateLocation)
app.use("/get-location", useGetLocation)

// attendance route
app.use("/check-in", useCheckInRouter)
app.use("/check-out", useCheckOutRouter)
app.use("/employee-report", useGetEmployeeReport)

// admin 
app.use("/api/admin-sign-up", useAdminSignupRouter)
app.use("/api/admin-login", useAdminLoginRouter)

// address route
app.use("/api/district", useAddDistrict)
app.use("/api/sub-district", useAddSubDistrict)
app.use("/api/union", useAddUnion)

// designation route
app.use("/api/designation", useAddDesignation)
app.use("/api/gender", useAddGender)

// holidays route
app.use("/api/weekly-holidays", useWeeklyHolidays)
app.use("/api/active-weekly-holiday", useActiveWeeklyHoliday)
app.use("/api/holidays", useHolidays)






app.use(notFound);
app.use(errorHandler);

// start server 
app.listen(process.env.PORT, ()=>{
    console.log(`Server Running at ${process.env.PORT}`)
})