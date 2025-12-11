import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ chartData, symbol }) => {
  
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
            datetimeUTC: false,
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
    },
    noData: {
      text: "No Live Data Available - Market opens at 8:30 cst",
      style: { color: "#FFFFFF" }
    }
  };
  if (!Array.isArray(chartData) || chartData.length === 0) {
    return (
      <Chart
        options={options}
        series={[{ name: "Closing Price", data: [] }]}
        type="line"
        height={350}
      />
    );
  }
  const series = [
    {
      name: "Closing Price",
      data: chartData.map(item => ({
        x: item.time,
        y: item.close
      }))
    }
  ];
  return <Chart options={options} series={series} type="line" height={350} />;
};

export default LineChart;
