import React, { useState, useEffect } from 'react';
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
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      // Mock data to simulate the chart without Firebase
      const mockData = [
        { date: '2023-01-01', value: 50 },
        { date: '2023-01-02', value: 60 },
        { date: '2023-01-03', value: 70 },
        { date: '2023-01-04', value: 65 },
        { date: '2023-01-05', value: 80 },
      ];

      // Simulate fetching data from Firebase
      const labels = mockData.map(item => item.date);
      const data = mockData.map(item => item.value);

      setChartData({
        labels,
        datasets: [{
          label: 'Your Progress',
          data,
          borderColor: '#636AE8',
          backgroundColor: 'rgba(99, 106, 232, 0.2)',
          tension: 0.4,
        }],
      });

      setLoading(false);
    };

    fetchChartData();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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
