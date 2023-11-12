import Attendance from "../models/attendance.model";
import IsHolidayCheck from "../models/isHolidayCheck.model";
import User from "../models/user.model";
import { useCheckHoliday } from "./isHolidayCheck";

export const cron = async () => {
    await useCheckHoliday();
    try {
      const users = await User.find().exec();
      const day = await IsHolidayCheck.findOne().exec();
      const date = new Date().toLocaleDateString();
  
      if (!day) {
        console.error('Error finding weekly day');
        return;
      }
  
      const attendancePromises = users.map(user => {
        const remarks = day.holyDay ? day.remarks : "Absent";
        const attendance = new Attendance({
          user_id: user._id,
          date: date,
          status: false,
          remarks: remarks,
          leave: false,
          district: user.district,
          upazila: user.upazila,
          union: user.union
        });
        return attendance.save();
      });
  
      await Promise.all(attendancePromises);
    } catch (error) {
      console.error('Error:', error);
    }

};