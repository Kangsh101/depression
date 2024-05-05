// Main.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Main.css';
import Footer from './Footer';
import messages from './messages';

import Banner1 from "../components/Banner1";
import Banner2 from "../components/Banner2";
import Banner3 from "../components/Banner3";
import Banner4 from "../components/Banner4";

const Main = () => {
  const [title, setTitle] = useState(getRandomMessage());

  function getRandomMessage() {
    const index = Math.floor(Math.random() * messages.length);
    return messages[index];
  }  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitle(prevTitle => {
        const index = (messages.indexOf(prevTitle) + 1) % messages.length;
        return messages[index];
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='main-main'>
      <header className='main-header'>
        <img src={`${process.env.PUBLIC_URL}/images/dndnfwmd123.png`} alt="로고" className="logo" />
        <h1 className="main-title">{title}</h1>
        <div className="header-buttons">
          <Link to="/download" className="download-button">Google Play</Link>
          <Link to="/download" className="download-button">App Store</Link>
        </div>
      </header>
      <div className="main-nav">
        <Link to="/community" className="nav-link">임시1</Link>
        <Link to="/news" className="nav-link">임시2</Link>
        <Link to="/content" className="nav-link">임시3</Link>
        <Link to="/support" className="nav-link">임시4</Link>
      </div>
      <React.Fragment>
        <Banner1></Banner1>
        <Banner2></Banner2>
        <Banner3></Banner3>
        <Banner4></Banner4>
      </React.Fragment>
    </div>
  );
};

export default Main;
