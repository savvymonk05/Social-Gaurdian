import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Required for time scale

// Register ChartJS components
ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch('/api/v1/journal/fetchalljournals', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authtoken')
          }
        });

        if (!response.ok) {
          console.error('Error fetching journal entries:', response.statusText);
          setLoading(false);
          return;
        }

        const data = await response.json();

        const labels = data.map(entry => new Date(entry.date));
        console.log(labels);
        const emotionValues = data.map(entry => entry.emotion);
        console.log(emotionValues);

        setChartData({
          datasets: [{
            label: 'Emotions',
            data: data.map(entry => ({
              x: new Date(entry.date),
              y: parseFloat(entry.emotion),
            })),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
          }],
        });
        

      } catch (error) {
        console.error('Error fetching or rendering graph:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);


  console.log(chartData);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM dd, yyyy',
          displayFormats: {
            day: 'MMM dd',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Emotion Score',
        },
      },
    },
    maintainAspectRatio: false,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p>Loading chart data...</p>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="chart-container" style={{ height: '400px', width: '100%' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
