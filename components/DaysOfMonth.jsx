import { firstDayOfMonth } from "../helpers/date";
import React from "react";
import Loader from "./Loader";
import _ from "lodash";
import ScheduleContainer from "./ScheduleContainer";

const DaysOfMonth = ({days, month, now, schedules, loading}) => {
    const mappingDays = Array.from({ length: days }, (k, v) => v + 1);
    const dayToBeginTheMonthFrom = firstDayOfMonth(month);
    const currentDate = now && now.getDate();
    const style = { gridColumnStart: dayToBeginTheMonthFrom + 1 };

    return <>
      {
        !loading && schedules && schedules.length > 0 ?
          schedules.map((item, i) => {
            return <div
              key={i}
              className={`day-wrapper ${i === 0 ? "first-day" : ""}
                ${item.id === currentDate ? "today" : ""}
                ${
                  (i + dayToBeginTheMonthFrom) % 7 === 0
                    ? "sunday"
                    : ""
                }
              `}
              style={i === 0 ? style : {}}
            >
              <span>{item.id}</span>
              {
                _.get(item, 'data.length') > 0 && item.data.map((schedule, idx) => {
                  return <ScheduleContainer key={idx} schedule={schedule} />
                })
              }
            </div>
          })
          : <Loader />
      }
    </>
}

export default DaysOfMonth;