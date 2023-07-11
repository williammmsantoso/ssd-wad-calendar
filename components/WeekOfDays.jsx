import React from "react";
import { weekdaysList } from "../helpers/date";

const WeekOfDays = () => {
    return (
        <div className="week-row-wrapper">
            {weekdaysList.map(weekday => {
                return (
                    <span key={weekday} className={`weekday`}>
                        {weekday}
                    </span>
                );
            })}
        </div>
    );
}

export default WeekOfDays;