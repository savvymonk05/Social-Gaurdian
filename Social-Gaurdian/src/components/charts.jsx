import React from 'react'
import { Chart } from 'react-google-charts';


const MyChart = ({ values, dates }) => {
    const chartData = [['Date', 'Value']].concat(dates.map((date, index) => [date, values[index]]));
  
    return (
      <Chart
        chartType="LineChart"
        data={chartData}
        options={{
          title: 'My Chart',
          hAxis: {
            title: 'Date',
          },
          vAxis: {
            title: 'Value',
          },
        }}
        width="100%"
        height="400px"
      />
    );
  };

export default MyChart
