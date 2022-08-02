import React from 'react';
import { FaSnowflake } from 'react-icons/fa'
import { HiThumbUp } from 'react-icons/hi'
import { FaHotjar } from 'react-icons/fa'


const Entry = ({ entry }) => {

    const date = new Date(entry.date*1000);
    const day = date.getDate().toString().padStart(2, '0');

    let temp = parseFloat(entry.temp).toFixed(1).toString().padStart(4, '0');
    if(temp.includes('-') && temp.length === 4) {
        temp = '-0'.concat(temp.substring(1,4));
    }
    const feedback = entry.feedback;
    const monthNames = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni',
                        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const feedbackIcons = {
        0: <FaSnowflake />,
        1: <HiThumbUp />,
        2: <FaHotjar />,
    }


    return (
        <>
            <div className='temp-entry'>
                <div className='temp-date'>{ day }. { monthNames[date.getMonth()] } { date.getFullYear() }</div>
                <div className='temp-temp'><strong>{ temp }&deg;C</strong></div>
                <div className='temp-feedback'>{ feedbackIcons[feedback] }</div>
            </div>
        </>
    );
}

export default Entry;