// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';
// import { ReactComponent as LogoIcon } from '../path-to-your-logo.svg'; // 로고 파일 경로는 실제 파일 위치에 맞게 수정

const Footer = () => {
  return (
    <footer className="footer-container">
                {/* <img src={`${process.env.PUBLIC_URL}/images/dndnfwmd123.png`} alt="로고" className="logo2" /> */}
      <Link to="/terms" className="footer-link">이용약관</Link>
      <Link to="/privacy" className="footer-link">개인정보 처리방침</Link>
      <div className="footer-info">
        © 2024 Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
