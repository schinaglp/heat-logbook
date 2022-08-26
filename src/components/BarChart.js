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

  let tempsPerMonthKeys = [];

  tempsPerMonth.forEach((month, index) => {
    avgTempPerMonth.push(avg(month, 'temp'));
    avgFeedbackPerMonth.push(avg(month, 'feedback'))
    tempsPerMonthKeys.push(index);
  });


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
                let label = ' Durchschnitt: ' + Math.floor(context.parsed.y*10)/10 + ' Grad';
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
    },
    animation: {
    }
  };

  var xLabels = {
    0: 'Jan.', 1: 'Feb.', 2: 'März', 3: 'Apr.', 4: 'Mai', 5: 'Jun.',
    6: 'Jul.', 7: 'Aug.', 8: 'Sept.', 9: 'Okt.', 10: 'Nov.', 11: 'Dez.'
  }
    
  // console.log(tempsPerMonthKeys);
  // console.log([...Array(12).keys()].slice(tempsPerMonthKeys[0], tempsPerMonthKeys[tempsPerMonthKeys.length-1]+1));



  const data = {
    // labels: [...Array(avgPerMonth.length).keys()],
    labels: tempsPerMonthKeys,
    datasets: [{
      data: avgTempPerMonth,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  const chart = <Bar
                    data={data}
                    options={options}
                    // height={220}
                />
                
  return (
      <div>
          <ChartContainer chart={chart} />
      </div>
  );
}

  export default BarChart;