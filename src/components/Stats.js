import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { Scatter } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
Chart.register(...registerables)

const Stats = () => {
    let delayed;
    const options = {
        plugins: {
          title: {
            display: true,
            text: 'Platzhalter Statistik',
          },
        },
        animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
              return delay;
            },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };

      const ScatterOptions = {
        plugins: {
          title: {
            display: true,
            text: 'Platzhalter Statistik',
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
      const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    const scatterData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div>
            <Bar 
                data={data}
                options={options}
                height={400}
                width={600}
            />
            <Line 
                data={scatterData}
                options={ScatterOptions}
                height={400}
                width={600}
            />
        </div>
    );
  }

  export default Stats;