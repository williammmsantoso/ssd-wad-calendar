import { firstDayOfMonth } from "../helpers/date";
import React from "react";
import Loader from "./Loader";
import _ from "lodash";
import { getRandomColor } from "../helpers/color";
import { getFormatTime } from "../helpers/text";

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
                _.get(item, 'data.length') > 0 && item.data.map((schedule, idx) => {
                  return <div key={idx+100} className="schedules-wrapper" style={{ background: `#${getRandomColor()}` }}>
                    <p>{_.get(schedule, 'title', '')}</p>
                    <p>{_.get(schedule, 'email', '')}</p>
                    <p>{getFormatTime(schedule.time)}</p>
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