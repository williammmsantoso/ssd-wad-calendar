import React from "react";
import { weekdaysList } from "../helpers/date";

const WeekOfDays = () => {
    return (
        <>
            {weekdaysList.map(weekday => {
                return (
                    <span key={weekday} className={`weekday`}>
                        {weekday}
                    </span>
                );
            })}
        </>
    );
}

export default WeekOfDays;