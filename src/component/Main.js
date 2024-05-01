// Main.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Main.css';
import Footer from './Footer';

const Main = () => {
  return (
    <div className='main-main'>
      <header className='main-header'>
        <img src={`${process.env.PUBLIC_URL}/images/dndnfwmd123.png`} alt="로고" className="logo" />
        <h1 className="main-title">오늘은 자갈밭이었지만 내일은 다르게</h1>
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
      <div className="content-area">
        {/* 상세 내용 구역, 필요한 경우 이미지나 텍스트 추가 */}
      </div>
      <Footer />
    </div>
  );
};

export default Main;
