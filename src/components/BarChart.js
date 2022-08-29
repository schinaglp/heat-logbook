import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartContainer from './ChartContainer';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)


const BarChart = ({ tempList }) => {

  let tempsPerMonth = [];

  tempList.forEach(temp => {
    if(!tempsPerMonth[new Date(temp.date*1000).getMonth()])
      tempsPerMonth[new Date(temp.date*1000).getMonth()] = [];
    tempsPerMonth[new Date(temp.date*1000).getMonth()].push(temp);
  });

  let avgTempPerMonth = [];
  let avgFeedbackPerMonth = [];
  let tempsPerMonthKeys = [];

  const avg = (month, mode) => {
    let sum = 0;
    if(mode === 'temp')
      month.forEach(temp => {
        sum += parseFloat(temp.temp)
      })
    else if(mode === 'feedback')
      month.forEach(temp => {
        sum += parseFloat(temp.feedback)
      })
    return sum / month.length
  };


  tempsPerMonth.forEach((month, index) => {
    avgTempPerMonth.push(avg(month, 'temp'));
    avgFeedbackPerMonth[index] = avg(month, 'feedback');
    tempsPerMonthKeys.push(index);
  });

  avgFeedbackPerMonth = avgFeedbackPerMonth.map(feedback => {
                          if(feedback === 1.5)
                            return 1;
                          return Math.round(feedback);
                        });


  const feedbackStrings = ['Kalt', 'Angenehm', 'Heiß'];                      
  const options = {
    plugins: {
      title: {
        display: false,
        text: 'Durchschnitt pro Monat',
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
                let label = []
                label.push(' Durchschnitt: ' + Math.floor(context.parsed.y*10)/10 + ' Grad & ' + feedbackStrings[avgFeedbackPerMonth[context.label]]);
                return label;
            },
            title: () => null
        }
      }
    },
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        ticks: {
          stepSize: 1,
          callback: function(value, index, values) {
            return xLabels[value];
          },
          font: {
            weight: 'bold'
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          font: {
            weight: 'bold'
          },
        },
      }
    }
  };

  var xLabels = {
    0: 'Jan.', 1: 'Feb.', 2: 'März', 3: 'Apr.', 4: 'Mai', 5: 'Jun.',
    6: 'Jul.', 7: 'Aug.', 8: 'Sept.', 9: 'Okt.', 10: 'Nov.', 11: 'Dez.'
  }

  let backgroundColors = [];
  avgFeedbackPerMonth.forEach(feedback => {
    switch (feedback) {
      case 0:
        backgroundColors.push('#5DADE2');
        break;
      case 2:
        backgroundColors.push('#EC8656');
        break;
      default:
        backgroundColors.push('#28B463');
        break;
    }
  });


  const data = {
    labels: tempsPerMonthKeys,
    datasets: [{
      data: avgTempPerMonth,
      backgroundColor: backgroundColors,
      borderWidth: 1
    }]
  };

  const chart = <Bar
                    data={data}
                    options={options}
                    // height={220}
                />
                
  return (
      <div className='bar-chart'>
          <ChartContainer chart={chart} />
      </div>
  );
}

  export default BarChart;