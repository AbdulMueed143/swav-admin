import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'; // add this import
import HighlightOffIcon from '@material-ui/icons/HighlightOff'; // add this import
import { DatePicker } from 'components/ui';
import TimeInput from 'components/ui/TimeInput'
import dayjs from 'dayjs'
import { preventOverflow } from '@popperjs/core';


const AvailableTimes = () => {
    const [availableTimes, setAvailableTimes] = useState({
        Monday: ["09:00 - 17:00"],
        Tuesday: ["09:00 - 17:00"],
        Wednesday: ["09:00 - 17:00"],
        Thursday: ["09:00 - 17:00"],
        Friday: ["09:00 - 17:00"],
        Saturday: ["09:00 - 14:00"],
        Sunday: ["Closed"],
    });
    
    const [holidays, setHolidays] = useState([]);

    const handleTimeChange = (day, newTime, index) => {
        setAvailableTimes(prevTimes => ({
            ...prevTimes,
            [day]: prevTimes[day].map((time, i) => i === index ? newTime : time)
        }));
    };

    const addNewTime = (day) => {
        setAvailableTimes(prevTimes => ({
            ...prevTimes,
            [day]: [...prevTimes[day], ""]
        }));
    };

    const removeTime = (day, index) => {
        setAvailableTimes(prevTimes => ({
            ...prevTimes,
            [day]: prevTimes[day].filter((time, i) => i !== index)
        }));
    };

    const handleHolidayChange = (date) => {
        setHolidays(prevHolidays => [prevHolidays, date]);
    };

    const handleSave = () => {
        // Save the available times and holidays here.
        console.log('Saved times:', availableTimes);
        console.log('Saved holidays:', holidays);
    };

    return (
        <div style={preventOverflow}>
                {Object.entries(availableTimes).map(([day, times]) => (
                    <div key={day} >
                        <Typography variant="subtitle1">{day}</Typography>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            {times.length === 0 ? (
                                <div style={{ marginRight: 10 }}>
                                    <h5>Not Working</h5>
                                </div>
                            ) : (
                                times.map((time, index) => (
                                    <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                                        <TimeInput.TimeInputRange
                                            defaultValue={[
                                                new Date(),
                                                dayjs(new Date()).add(60, 'minutes').toDate(),
                                            ]}
                                        />
                                        <IconButton onClick={() => removeTime(day, index)}>
                                            <HighlightOffIcon />
                                        </IconButton>
                                    </div>
                                ))
                            )}
                            <IconButton onClick={() => addNewTime(day)}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </div>
                    </div>
                ))}

            <h4>Holidays</h4>
            <DatePicker
                renderInput={(props) => <TextField {...props} />}
                onChange={handleHolidayChange}
            />
                {holidays.map((holiday, index) => (
                    <Typography variant="subtitle1" key={index}>{holiday}</Typography>
                ))}
            <Button onClick={handleSave}>Save</Button>
        </div>
    );
    
};

export default AvailableTimes;
