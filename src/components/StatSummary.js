import React from 'react';
import ChartContainer from './ChartContainer';

const StatSummary = ({ tempList, coldTemps, goodTemps, hotTemps }) => {

    const summary = <div>
                        <div className='chart-container top-summary'>{tempList.length} Einträge</div>
                        <div className='stat-summary'>
                            <div className='chart-container sub-summary'>{coldTemps} <br /> Kalt</div>
                            <div className='chart-container sub-summary'>{goodTemps} <br /> Angenehm</div>
                            <div className='chart-container sub-summary'>{hotTemps} <br /> Heiß</div>
                        </div>
                    </div>

    return (
            <ChartContainer chart={summary} />
    );
  }
  export default StatSummary

//   Math.round((goodTemps / tempList.length*100)*100)/100