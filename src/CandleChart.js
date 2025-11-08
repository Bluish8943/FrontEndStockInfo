import React from "react";
import Chart from "react-apexcharts";

const AlphaCandlestickChart = ({ chartData, symbol }) => {
  const seriesData = chartData.map(item => ({
    x: new Date(item.time),
    y: [item.open, item.high, item.low, item.close],
  }));

  const series = [
    {
      name: "Stock Price",
      type: "candlestick",
      data: seriesData
    }
  ];

  const options = {
    chart: {
      type: "candlestick",
      height: 450,
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
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00B746",
          downward: "#EF403C"
        }
      }
    },
    tooltip: {
      shared: true,
      theme: "dark"
    }
  };

  return <Chart options={options} series={series} type="candlestick" height={450} />;
};

export default AlphaCandlestickChart;
