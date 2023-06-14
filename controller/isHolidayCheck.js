const WeeklyHolidays = require("../models/weeklyHolidays.model")
const Holidays = require("../models/holidays.model")
const IsHolidayCheck = require("../models/isHolidayCheck.model")


async function useCheckHoliday() {
  try {
    const day = new Date().toLocaleDateString('en-US', { weekday: 'short' });

    const weeklyHoliday = await WeeklyHolidays.findOne({ day: day }).exec();
    if (weeklyHoliday && weeklyHoliday.isHoliday) {
      await saveIsHolidayCheck(true, "Weekly Holiday");
      console.log("Holiday week");
      return;
    }

    const date = new Date().toISOString().split('T')[0];
    const holiday = await Holidays.findOne({ holyDay: date }).exec();
    if (holiday) {
      await saveIsHolidayCheck(true, holiday.remarks);
      console.log("Holiday day");
      return;
    }

    await saveIsHolidayCheck(false, "");
    console.log("Not a holiday");
  } catch (error) {
    console.error('Error in useCheckHoliday:', error);
  }
}

async function saveIsHolidayCheck(holyDay, remarks) {
  const existingCheck = await IsHolidayCheck.findOne().exec();

  if (existingCheck) {
    existingCheck.holyDay = holyDay;
    existingCheck.remarks = remarks;
    await existingCheck.save();
    console.log('Document updated successfully.');
  } else {
    const isHolidayCheck = new IsHolidayCheck({
      holyDay: holyDay,
      remarks: remarks
    });

    await isHolidayCheck.save();
    console.log('Document saved successfully.');
  }
}
  

module.exports ={
    useCheckHoliday
}
