import React from "react";

import _ from "lodash";
import { getRandomColor } from "../helpers/color";
import { getFormatTime } from "../helpers/text";

const ScheduleContainer = ({key, schedule}) => {
    return <div key={key+100} className="schedules-wrapper" style={{ background: `#${getRandomColor()}` }}>
        <div className="icon-wrapper">
            <img className="icon delete" src="./delete.png" alt="delete" />
            <img className="icon edit" src="./edit.png" alt="edit" />
        </div>
        
        <p>{_.get(schedule, 'title', '')}</p>
        <p>{_.get(schedule, 'email', '')}</p>
        <p>{getFormatTime(schedule.time)}</p>
    </div>
}

export default ScheduleContainer;