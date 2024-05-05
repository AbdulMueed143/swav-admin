export function slotToStartAndEndDateTimeArray(slot)  {

    var startTimeHour = slot.startTime.hour % 12;
    var endTimeHour = slot.endTime.hour % 12;

    // Convert 0 hour to 12 (for 12 AM and 12 PM)
    startTimeHour = startTimeHour ? startTimeHour : 12;
    endTimeHour = endTimeHour ? endTimeHour : 12;

    var startTimeAmPM = slot.startTime.hour >= 12 ? "pm" : "am";
    var endTimeAmPM = slot.endTime.hour >= 12 ? "pm" : "am";

    var startTimeMinute = slot.startTime.minute < 10 ? `0${slot.startTime.minute}` : slot.startTime.minute;
    var endTimeMinute = slot.endTime.minute < 10 ? `0${slot.endTime.minute}` : slot.endTime.minute;

    console.log("slotToStartAndEndDateTimeArray ", `${startTimeHour}:${startTimeMinute}${startTimeAmPM}`)

    return [ parseTimeToTodayDate(`${startTimeHour}:${startTimeMinute}${startTimeAmPM}`),
             parseTimeToTodayDate(`${endTimeHour}:${endTimeMinute}${endTimeAmPM}`)]

}

function parseTimeToTodayDate(timeStr){
    const date = new Date(); // uses today's date
    const timeRegex = /(\d+):(\d+)(AM|PM)/i;

    const match = timeStr.match(timeRegex);
    if (!match) return null;

    let [_, hour, minutes, period] = match;
    hour = parseInt(hour);
    minutes = parseInt(minutes);

    // Convert 12-hour time to 24-hour time based on AM/PM
    if (period.toUpperCase() === 'PM' && hour !== 12) {
        hour += 12;
    } else if (period.toUpperCase() === 'AM' && hour === 12) {
        hour = 0;
    }

    date.setHours(hour, minutes, 0, 0); // Sets hours and minutes, resets seconds and milliseconds to 0
    return date;
}

export function isObjectWithAtLeastOneKey(obj) {
    if (obj !== null && typeof obj === 'object' && !Array.isArray(obj)) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return true;
            }
        }
    }
    return false;
}
