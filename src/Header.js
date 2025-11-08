import React from 'react';
import './Header.css';
import SideBar from './SideBar';

function Header({sideBar,setSideBar}) {

  return (
    <header className = "header" style={{display: "flex", color: 'white' }}>
      <h1  onClick={() => setSideBar(SideBar)} style={{cursor: 'pointer'}}>☰</h1>
      <h2 style={{paddingTop: "2px", paddingLeft: "10px"}}>Dominic Gomez - Stock Charts</h2>
    </header>
  );
}

export default Header