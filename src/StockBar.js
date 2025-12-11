import "./StockBar.css"
import CandlestickChart from "./CandleChart";
import LineChart from "./LineChart";
import "./btn.css"
import "./sep.css"
import React, { memo, useEffect, useState } from 'react';

function StockBar({sym,stocks,setStocks}) {
  const [data,setData] = useState(null);
  const [liveData,setLiveData] = useState(null)
  const [showLine,setShowLine] = useState(true);
  const [dataType,setDataType] = useState(true)
  const [showError,setShowError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {    
        const resHis = await fetch(`https://backendstockinfo.onrender.com/api/fetchStock?symbol=${sym}`);
        const jsonHis = await resHis.json();
        setData(jsonHis);
        const resIntra = await fetch(`https://backendstockinfo.onrender.com/api/fetch15MinStock?symbol=${sym}`);
        const jsonIntra = await resIntra.json();
        setLiveData(jsonIntra);
      } catch (err) {
        console.error(err);
        setShowError(true);
      }
    };
    fetchData();
  }, [sym]);

  const symbol = data?.["Meta Data"]?.["2. Symbol"];
  const timeSeries = data?.["Time Series (Daily)"];
  const invalidData = !symbol || !timeSeries;

  useEffect(() => {
    if (invalidData) {
      setShowError(true);

      const timer = setTimeout(() => setShowError(false), 10000); 
      return () => clearTimeout(timer);
    }
  }, [invalidData]);

  if (!data) return <p>Loading...</p>;
  if (!liveData) return <p>Loading...</p>;

  if (showError && invalidData) {
    return (
      <div className="error-box">
        <strong>Error:</strong> Invalid or missing symbol data - {sym}
      </div>
    );
  }
  if (!timeSeries) return null;
  const chartData = Object.entries(timeSeries)
  .map(([timestamp, values]) => {
    return {
      time: timestamp, 
      open: Number(parseFloat(values['1. open']).toFixed(2)),
      high: Number(parseFloat(values['2. high']).toFixed(2)),
      low: Number(parseFloat(values['3. low']).toFixed(2)),
      close: Number(parseFloat(values['4. close']).toFixed(2)),
    };}).reverse();

  const prevClose = chartData.at(-1).close
  const timeSeries15Min = liveData['Time Series (5min)'];
  const now = new Date();


  const centralNow = new Date(
  now.toLocaleString("en-US", { timeZone: "America/Chicago" })
  );

  const centralToday = new Date(centralNow);
  centralToday.setHours(0, 0, 0, 0);


  const marketOpen = new Date(centralToday);
  marketOpen.setHours(8, 30, 0, 0);
  const chartData15Min = Object.entries(timeSeries15Min)
  .map(([timestamp, values]) => {
    const centralDate = new Date(timestamp.replace(' ', 'T') + '-05:00');
    

    console.log(centralDate);
    console.log(Number(values["4. close"]));
    return {
      time: centralDate.getTime(),
      open: Number(values["1. open"]),
      high: Number(values["2. high"]),
      low: Number(values["3. low"]),
      close: Number(values["4. close"]),
      volume: Number(values["5. volume"]),
    };
  })
  .filter(d => d.time >= marketOpen)
  .reverse();
    
  let totalVolume;
  let firstDataPoint;
  let lastDataPoint;
  let minLow;
  let maxHigh;
  let change;
  let pChange;
  let header;

  if (chartData15Min.length === 0) {

    totalVolume = 0;
    firstDataPoint = 0;
    lastDataPoint = 0;
    minLow = 0;
    maxHigh = 0;
    change = 0;
    pChange = 0;
    header = symbol;

  } else {

    totalVolume = chartData15Min.reduce((sum, d) => sum + d.volume, 0);
    firstDataPoint = chartData15Min.at(0).open;
    lastDataPoint = chartData15Min.at(-1).close;
    minLow = Math.min(...chartData15Min.map(d => d.close));
    maxHigh = Math.max(...chartData15Min.map(d => d.close));
    change = (lastDataPoint - prevClose).toFixed(2);
    pChange = (((lastDataPoint - prevClose) / prevClose) * 100).toFixed(2);
    header = symbol + " - $" + lastDataPoint;

  }
  
  const handleDelete = () => {
    setStocks(stocks.filter(stock => stock !== sym))
  }
  const handleLine = () => {
    setShowLine(true)
  }
  const handleCandle = () => {
    setShowLine(false)
  }
  const handleData = () => {
    setDataType(!dataType)
  }

  return (
    <div onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} style={{paddingBottom: "25px",border: "2px solid #111",borderRadius: "8px",marginBottom: "20px"}}>
      <div>
        <div style={{display:"flex",justifyContent: "flex-end",paddingTop: "10px",paddingRight: "10px"}}>
            <button className="btn" onClick={handleLine}>Line</button>
            <button className="btn" style={{ marginLeft: '10px' }} onClick={handleCandle}>Candle</button>
      </div>
      </div>
      {dataType ? 
      (
        showLine ? 
          (<LineChart chartData={chartData15Min} symbol={header}/>) 
          : 
          (<CandlestickChart chartData={chartData15Min} symbol={header}/>)
        
      ) 
      : 
      (
        showLine ? 
          (<LineChart chartData={chartData} symbol={header}/>) 
          : 
          (<CandlestickChart chartData={chartData} symbol={header}/>)
        
      )
    }
      <div style={{display:"flex",justifyContent: "flex-start", marginBottom: "-45px",paddingLeft: "10px"}}>
            <button className="btn" onClick={handleData}>Live</button>
            <div> </div>
            <button className="btn" style={{ marginLeft: '10px' }} onClick={handleData}>Historical</button>
      </div>
      <div style={{display:"flex",justifyContent: "flex-end",marginBottom: "20px",paddingRight: "10px"}}>
              <button className="btn" onClick={handleDelete}>Delete</button>
      </div>
      <div style={{display:"flex",paddingLeft: "10px"}}>
        <div>
          Open: ${firstDataPoint}
          <br />
          Previous Close: ${prevClose}
        </div>
        <div style={{marginLeft: "20px"}}>
          Low: ${minLow}
          <br />
          High: ${maxHigh}
        </div>
        <div style={{ marginLeft: "20px" }}>
          Change:{" "}
          <span style={{ color: change < 0 ? "red" : "green", fontWeight: "bold" }}>
            ${change}
          </span>
          <br />
          % Change:{" "}
          <span style={{ color: change < 0 ? "red" : "green", fontWeight: "bold" }}>
            {pChange}%
          </span>
        </div>
        <div style={{ marginLeft: "20px" }}>
          Volume: {Number(totalVolume).toLocaleString()}
        </div>
      </div>
    </div>
  )
}
  export default memo(StockBar)