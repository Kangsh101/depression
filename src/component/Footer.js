import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={`${process.env.PUBLIC_URL}/images/mascot.png`} alt="로고" />
        </div>
        <div className="footer-links">
          <Link to="/terms" className="footer-link footer-link1">이용약관</Link>
          <Link to="/privacy" className="footer-link">개인정보 처리방침</Link>
        </div>
      </div>
      <div className="footer-info">
        © 2024 Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
