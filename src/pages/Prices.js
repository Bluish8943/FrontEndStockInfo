import '../App.css';
import Header from '../Header';
import SideBar from '../SideBar';
import StockBar from '../StockBar';
import '../btn.css'
import '../textbox.css'
import React, { useEffect, useState } from 'react';

function Prices() {
  const [showInput, setShowInput] = useState(false);
  const [stock, setStock] = useState(""); 
  const [stocks, setStocks] = useState(['IBM','DIS','NVDA']); 
  const [debouncedValue, setDebouncedValue] = useState('');
  const [sideBar, setSideBar] = useState(false);

  const openSideBar = () => {
    setSideBar(!sideBar)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(stock);
    }, 500); 

    return () => clearTimeout(handler);
  }, [stock]);

  const handlePlusClick = () => {
    setShowInput(!showInput);
  }

  const handleAddClick = () => {
    if (debouncedValue.trim() === '') return;
    if (stocks.includes(debouncedValue.toUpperCase())) return;
    setStocks([debouncedValue.toUpperCase(), ...stocks]);
    setStock("");
    setDebouncedValue("");
    setShowInput(false); 
  }

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll position:", window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{display: 'flex'}}>
      <div className={`App ${sideBar ? "shrink" : ""}`}>
        <div className='flex'>
          <Header sideBar={sideBar} setSideBar={openSideBar}/>
          <div style={{marginTop: -10}}>{sideBar ? (<SideBar />) : (<></>)}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px',paddingTop: '20px'}}>
          <button className='btn' onClick={handlePlusClick}> + </button>
        </div>
        {showInput ? 
        (
          <><input style={{marginLeft: "15px"}} className='textbox' text='type'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Symbol">
          </input>
          <button className='btn' onClick={handleAddClick}> Add </button></>
        ) 
        : 
        (
          <div> </div>
        )}
        <main className='main' style={{}}>
          {stocks.map((stock) => (
            <StockBar key={stock} sym={stock} stocks={stocks} setStocks={setStocks} />
          ))}
        </main>
      </div>
    </div>

  );
}

export default Prices;
