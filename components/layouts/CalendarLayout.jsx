import React from "react";
import { useEffect, useState } from 'react';
import Headers from '../Headers';
import WeekOfDays from '../WeekOfDays';
import DaysOfMonth from '../DaysOfMonth';
import { daysInMonth } from '../../helpers/date';
import { toast } from 'react-toastify';
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
            let data = _.get(newArr[values.date - 1], 'data');
            if (data.length >= 3) {
                toast.error('Sorry, on the day you choose the schedule is full', {
                    toastId: '14',
                });
            } else {
                _.get(newArr[values.date - 1], 'data').push(values);
            }
            
            localStorage.setItem('schedules', JSON.stringify(newArr));

            return newArr;
        });

        toast.success('Congratulation! You have successfully created a schedule', {
            toastId: '14',
        });

        setLoading(false);
    }

    useEffect(() => {
        const tempMonth = localStorage.getItem('localMonth');
        const tempSchedule = JSON.parse(localStorage.getItem('schedules'));

        if (parseInt(tempMonth) !== parseInt(currentMonth)) {
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