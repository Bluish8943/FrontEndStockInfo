import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ chartData, symbol }) => {
  if (!Array.isArray(chartData) || chartData.length === 0) return null;

  const series = [
    {
      name: "Closing Price",
      data: chartData.map(item => ({
        x: new Date(item.time),
        y: item.close
      }))
    }
  ];

  const options = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true
      },
      toolbar: {
        show: false
      }
    },
    title: {
      text: symbol,
      align: "left",
      style: {
        color: '#FFFFFF'
      }
    },
    xaxis: { 
        type: "datetime" ,
        labels : {
            style: {
                    colors: "#FFFFFF"
            },
            datetimeFormatter: {
              hour: 'hh:mm TT',
              minute: 'hh:mm TT'
            }
        }
    },
    yaxis: 
        {labels : {
            style: {
                    colors: "#FFFFFF"
            }
        }},
    stroke: {
      curve: "smooth",
      width: 2
    },
    tooltip: {
      shared: true,
      theme: "dark"
    }
  };

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default LineChart;
