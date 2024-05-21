import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AccessDenied.css';

const AccessDenied = () => {
  return (
    <div className="access-denied-container">
      <h1>접근 불가</h1>
      <p>이 페이지에 접근할 권한이 없습니다. 관리자에게 문의하세요.</p>
      <Link to="/">
        <button className="home-button">홈으로 이동</button>
      </Link>
    </div>
  );
};

export default AccessDenied;
