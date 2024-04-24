import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Cms.css';


const Cms = () => {
  return (
    <div className="cms-container">
      <div className="sidebar">
        <h2>Navigation</h2>
        <ul>
          <li><Link to="/Cms">Cms 페이지 내용</Link></li>
          <li><Link to="/Cmss">Cmss</Link></li>
        </ul>
      </div>
      <div className="content">
        <h1>Cms 페이지 내용</h1>
      </div>
    </div>
  );
};

export default Cms;
