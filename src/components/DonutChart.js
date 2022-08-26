import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartContainer from './ChartContainer';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)


const DonutChart = ({ tempList }) => {

    const options = {
      plugins: {
        title: {
          display: false,
          text: 'Alle Temperaturwerte',
        },
        legend: {
          display: true,
          labels: {
            font: {
              weight: 'bold'
            }
          }
        },
        tooltip: {
          callbacks: {
              label: function(context) {
                  let label = ' Messungen: ' + context.parsed;
                  return label;
              }
          }
        }
      },
      responsive: true,
      animation: {
        animateRotate: true
      }
    };
      

    const data = {
        datasets: [
          {
            label: 'Kalt',
            data: [tempList.cold.length, tempList.good.length, tempList.hot.length],
            backgroundColor: [
              '#5DADE2',
              '#28B463',
              '#EC8656'
            ],
            borderColor: [
              '#FFFFFF',
              '#FFFFFF',
              '#FFFFFF'
            ],
            borderWidth: 4
          }
        ]
    };

    const chart = <Doughnut className='donut'
                      data={data}
                      options={options}
                      // height={220}
                  />


    return (
        <div className='small-chart'>
            <ChartContainer chart={chart} />
        </div>
    );
  }

  export default DonutChart;