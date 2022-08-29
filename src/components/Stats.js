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
    if(tempList.length > 0)
    {
      extremes.push(
        tempList.reduce(function(prev, curr) {
          return prev.temp < curr.temp ? prev : curr;
        })
      );
      if(tempList.length > 1)
        extremes.push(
          tempList.reduce(function(prev, curr) {
            return prev.temp > curr.temp ? prev : curr;
          })
        );
    }



    return (
      tempList.length > 0 ?
        <div>
            <EntryHeader entryHeader={'Alle Werte'} noPlus={true} />
            <ScatterChart tempList={tempListSeperated} />
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
            <div className='avg-header'>
              <EntryHeader entryHeader={'Durchschnittswerte'} noPlus={true} />
            </div>
            <BarChart tempList={tempList} />
        </div>
      :
        <p className='no-entries'>Keine Einträge für dieses Jahr gefunden!</p>
    );
  }

  export default Stats;