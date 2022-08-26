import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import ChartContainer from './ChartContainer';
import ScatterChart from './ScatterChart';
import DonutChart from './DonutChart';
import StatSummary from './StatSummary';
import DonutDescription from './DonutDescription';
import EntryHeader from './EntryHeader';
import Entries from './Entries';
import BarChart from './BarChart';

const Stats = ({ tempList }) => {

    let tempListSeperated = {
      cold: [],
      good: [],
      hot: []
    };

    tempList.forEach(temp => {
      switch (temp.feedback) {
        case 0:
          tempListSeperated.cold.push(temp);
          break;
        case 1:
          tempListSeperated.good.push(temp);
          break;
        case 2:
          tempListSeperated.hot.push(temp);
          break;
      }
    });

    let percentages = [
      Math.floor(tempListSeperated.cold.length / tempList.length * 100),
      Math.ceil(tempListSeperated.good.length / tempList.length * 100)
    ];

    if((percentages[0] + percentages[1] + Math.floor(tempListSeperated.hot.length / tempList.length * 100)) !== 100)
      percentages.push(Math.ceil(tempListSeperated.hot.length / tempList.length * 100));
    else
      percentages.push(Math.floor(tempListSeperated.hot.length / tempList.length * 100));

      
    let extremes = [];
    extremes.push(
      tempList.reduce(function(prev, curr) {
        return prev.temp < curr.temp ? prev : curr;
      })
    );
    extremes.push(
      tempList.reduce(function(prev, curr) {
        return prev.temp > curr.temp ? prev : curr;
      })
    );


    return (
        <div>
          {/* <StatSum<mary tempList={tempList} coldTemps={coldScatter.length} goodTemps={goodScatter.length} hotTemps={hotScatter.length} /> */}
          {/* <ChartContainer chart={chart} /> */}
          <div className='donut-responsive'>
            <div className='donut-line'>
              <DonutDescription percentages={percentages} />
              <div className='donut-box'>
                <DonutChart tempList={tempListSeperated} />
              </div>
            </div>
            <div className='entries-responsive'>
              <EntryHeader entryHeader={'Extremwerte'} noPlus={true} />
              <Entries entries={extremes} />
            </div>
          </div>
          <ScatterChart tempList={tempListSeperated} />
          <BarChart tempList={tempList} />
        </div>
    );
  }

  export default Stats;