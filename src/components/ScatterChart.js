import React from 'react';
import { Scatter } from 'react-chartjs-2';
import ChartContainer from './ChartContainer';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)


const ScatterChart = ({ tempList }) => {

    let coldScatter = [];
    let goodScatter = [];
    let hotScatter = [];

    tempList.cold.forEach(temp => {
        coldScatter.push({
            x: (new Date(temp.date*1000).getMonth() + 1) + new Date(temp.date*1000).getDate()/30,
            y: temp.temp
          });
    });

    tempList.good.forEach(temp => {
        goodScatter.push({
            x: (new Date(temp.date*1000).getMonth() + 1) + new Date(temp.date*1000).getDate()/30,
            y: temp.temp
          });
    });
    
    tempList.hot.forEach(temp => {
        hotScatter.push({
            x: (new Date(temp.date*1000).getMonth() + 1) + new Date(temp.date*1000).getDate()/30,
            y: temp.temp
          });
    });


    var xLabels = {
        // 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: ''
        // 1: 'J', 2: 'F', 3: 'M', 4: 'A', 5: 'M', 6: 'J', 7: 'J', 8: 'A', 9: 'S', 10: 'O', 11: 'N', 12: 'D', 13: ''
        // 1: 'Jänner', 2: 'Februar', 3: 'März', 4: 'April', 5: 'Mai', 6: 'Juni',
        // 7: 'Juli', 8: 'August', 9: 'September', 10: 'Oktober', 11: 'November', 12: 'Dezember', 13: ''
        1: 'Jan.', 2: 'Feb.', 3: 'März', 4: 'Apr.', 5: 'Mai', 6: 'Jun.',
        7: 'Jul.', 8: 'Aug.', 9: 'Sept.', 10: 'Okt.', 11: 'Nov.', 12: 'Dez.', 13: ''
      }


    const scatterOptions = {
      plugins: {
        title: {
          display: false,
          text: 'Alle Temperaturwerte',
        },
        legend: {
          display: false,
          labels: {
            font: {
              weight: 'bold'
            }
          }
        },
        tooltip: {
          callbacks: {
              label: function(context) {
                  let label = Math.floor((context.parsed.x % 1)*30) + '.' + Math.floor(context.parsed.x) + '. - ' + context.parsed.y + ' Grad';
                  return label;
              }
          }
        }
      },
      responsive: true,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          min: 1,
          max: 13,
          ticks: {
            stepSize: 1,
            align: 'start',
            callback: function(value, index, values) {
              return xLabels[value];
            },
            font: {
              weight: 'bold'
            }
          }
        },
        y: {
          type: 'linear',
          suggestedMin: 0,
          suggestedMax: 50,
          ticks: {
            stepSize: 10,
            font: {
              weight: 'bold'
            }
          }
        }
      },
    };
      

    const scatterData = {
        datasets: [
          {
            label: 'Kalt',
            data: coldScatter,
            backgroundColor: '#5DADE2',
            borderColor: '#5DADE2',
            borderWidth: 2
          },
          {
            label: 'Angenehm',
            data: goodScatter,
            backgroundColor: '#28B463',
            borderColor: '#28B463',
            borderWidth: 2
          },
          {
            label: 'Heiß',
            data: hotScatter,
            backgroundColor: '#EC8656',
            borderColor: '#EC8656',
            borderWidth: 2
          },
        ]
    };

    const chart = <Scatter 
                      data={scatterData}
                      options={scatterOptions}
                      height={220}
                  />


    return (
        <div>
            <ChartContainer chart={chart} />
        </div>
    );
  }

  export default ScatterChart;