import React from 'react'
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const MyDatePicker = ({ setSelectedDate, selectedDate }) => {

    function handleChange(val) {
        setSelectedDate(val)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                disableFuture
                label="Date"
                openTo="day"
                views={['year', 'month', 'day']}
                value={selectedDate}
                onChange={(val) => handleChange(val.format('YYYY-MM-DDTHH:mm:ss'))}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}

export default MyDatePicker