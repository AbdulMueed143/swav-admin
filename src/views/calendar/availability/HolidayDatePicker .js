import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range'; 

import { useState } from 'react';

const HolidayDatePicker = (props) => {

    const currentDate = new Date();

    const [selectedRanges, setSelectedRanges] = useState([
        {
            startDate: currentDate,
            endDate: currentDate,
            key: 'selection'
        }
    ]);

    const handleSelect = (ranges) => {
        if (ranges.selection.startDate && ranges.selection.endDate) {
            setSelectedRanges([ranges.selection]);
        }

        function getDatesInArray(selectedDateRange) {
            // debugger
            const startDate = selectedDateRange.startDate;
            const endDate = selectedDateRange.endDate;
            const datesInRange = [];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            const currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                const selectedLeaveDateInShort = `${String(currentDate).split(' ')[2]}-${String(currentDate).split(' ')[1]}-${String(currentDate).split(' ')[3]}`;
                datesInRange.push(selectedLeaveDateInShort);
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return datesInRange;
        }
        const returnArray = getDatesInArray(ranges.selection);

        console.log('Holiday Date Picker:: ', returnArray);
        props.pickDateHandler(returnArray);
    }

    return (
        <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={selectedRanges}
            isSelected={true}
            label="Choose Holiday Date"
            rangeColors={['#6363e8']}
            minDate={currentDate}
            direction="vertical"
            showMonthArrow={true}
            color="#6363e8"
            endDatePlaceholder="Choose end date"
        />
    )
}

export default HolidayDatePicker;
