import { firstDayOfMonth } from "../helpers/date";
import React from "react";
import Loader from "./Loader";
import _ from "lodash";

const DaysOfMonth = ({days, month, now, schedules, loading}) => {
    const mappingDays = Array.from({ length: days }, (k, v) => v + 1);
    const dayToBeginTheMonthFrom = firstDayOfMonth(month);
    const currentDate = now && now.getDate();
    const style = { gridColumnStart: dayToBeginTheMonthFrom + 1 };

    console.log(schedules);

    return <>
      {
        !loading && schedules && schedules.length > 0 ?
          schedules.map((item, i) => {
            return <div
              key={i}
              className={`day ${i === 0 ? "first-day" : ""}
                ${item.id === currentDate ? "today" : ""}
                ${
                  (i + dayToBeginTheMonthFrom) % 7 === 0
                    ? "sunday"
                    : ""
                }
              `}
              style={i === 0 ? style : {}}
              onClick={() => console.log('a')}
            >
              <span>{item.id}</span>
              {
                item.data && item.data.length > 0 && item.data.map((schedule) => {
                  return <div key={i+100}>
                    <p>{item.title}</p>
                  </div>
                })
              }
            </div>
          })
          : <Loader />
      }
    </>
}

export default DaysOfMonth;