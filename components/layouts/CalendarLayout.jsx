import React from "react";
import { useEffect, useState } from 'react';
import Headers from '../Headers';
import WeekOfDays from '../WeekOfDays';
import DaysOfMonth from '../DaysOfMonth';
import { daysInMonth } from '../../helpers/date';
import Loader from "../Loader";
import _ from "lodash";

const CalendarLayout = () => {
    const now = new Date();

    const [currentDate, setCurrentDate] = useState(now);
    const [currentMonth, setCurrentMonth] = useState(now.getMonth());
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);

    const days = daysInMonth(currentMonth);

    const resetSchedule = () => {
        localStorage.setItem('localMonth', currentMonth);
        let tempArr = Array.from({ length: days } , (itm, idx) => ({ id: idx + 1, data: [] }))

        localStorage.setItem('schedules', JSON.stringify(tempArr));
        setSchedules(tempArr);
    }

    const addSchedule = (values) => {
        setSchedules((prevState) => {
            let newArr = [...prevState];

            _.get(newArr[values.date - 1], 'data').push(values);
            
            localStorage.setItem('schedules', JSON.stringify(newArr));

            return newArr;
        });

        setLoading(false);
    }

    useEffect(() => {
        const tempMonth = localStorage.getItem('localMonth');
        const tempSchedule = JSON.parse(localStorage.getItem('schedules'));

        if (!tempMonth || tempMonth !== currentMonth) {
            resetSchedule();
        } else if (tempSchedule && tempSchedule.length > 0) {
            setSchedules(tempSchedule);
        }

    }, []);

    return <div className="calendar-wrapper">
        {currentMonth && currentDate && <Headers
            month={currentMonth}
            year={currentDate.getFullYear()}
            days={days}
            addSchedule={addSchedule}
            setLoading={setLoading}
        />}

        <WeekOfDays/>

        <DaysOfMonth
            days={days}
            month={currentMonth}
            now={currentDate}
            schedules={schedules}
            loading={loading}
        />
    </div>
}

export default CalendarLayout;