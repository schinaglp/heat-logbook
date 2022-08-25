import React from 'react';
import { FaSnowflake } from 'react-icons/fa'
import { HiThumbUp } from 'react-icons/hi'
import { FaHotjar } from 'react-icons/fa'

const DonutDescription = ({ percentages }) => {
    return (
        <div className='chart-container small-chart donut-description'>
            <div className='percentage-line'>
                <FaSnowflake className='donut-icon stat-blue' /> 
                <div className='percentage'>{ percentages[0] }%</div>
            </div>
            <div className='percentage-line'>
                <HiThumbUp className='donut-icon stat-green' />            
                <div className='percentage'>{ percentages[1] }%</div>
            </div>
            <div className='percentage-line'>
                <FaHotjar className='donut-icon orange-text' />
                <div className='percentage'>{ percentages[2] }%</div>
            </div>
        </div>

    );
  }

  export default DonutDescription