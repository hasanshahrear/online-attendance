// external imports
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const geolib = require('geolib');
const helmet = require('helmet');
const cron = require("node-cron");

// internal imports
// employee 
const useSignupRouter = require("./router/user/useSignupRouter")
const useLoginRouter = require("./router/user/useLoginRouter")
const useUpdateLocation = require("./router/user/useUpdateLocation")
const useGetLocation = require("./router/user/useGetLocation")
const useCheckInRouter = require("./router/useCheckInRouter")
const useCheckOutRouter = require("./router/useCheckOutRouter")
const useGetLeave = require("./router/user/useGetLeave")

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

// reports
const useGetEmployeeReport = require("./router/report/useGetEmployeeReport")
const useGetAllReport = require("./router/report/useGetAllReport")
const useInactive = require("./router/user/useInactive")
const useIdleTime = require("./router/useIdleTime")

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
app.use("/api/login", useLoginRouter )
app.use("/api/sign-up", useSignupRouter)
app.use("/api/update-location", useUpdateLocation)
app.use("/api/get-location", useGetLocation)

// attendance route
app.use("/api/check-in", useCheckInRouter)
app.use("/api/check-out", useCheckOutRouter)
app.use("/api/employee-report", useGetEmployeeReport)
app.use("/api/leave", useGetLeave)
app.use("/api/inactive", useInactive)

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

// reports
app.use("/api/report", useGetAllReport)

// idle time
app.use("/api/idle-time", useIdleTime)


app.use(notFound);
app.use(errorHandler);

// start server 
app.listen(5000, ()=>{
    console.log(`Server Running at ${5000}`)
})