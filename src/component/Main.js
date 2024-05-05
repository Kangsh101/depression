// Main.jsx
import React, { useState, useEffect } from 'react'; // useState와 useEffect 추가
import { Link } from 'react-router-dom';
import '../css/Main.css';
import Footer from './Footer';
import messages from './messages'; // messages.js에서 메시지 배열 가져오기

const Main = () => {
  const [title, setTitle] = useState(getRandomMessage()); // 초기값을 랜덤 메시지로 설정

    // 랜덤 메시지를 반환하는 함수
    function getRandomMessage() {
      const index = Math.floor(Math.random() * messages.length);
      return messages[index];
    }  

  useEffect(() => { // 컴포넌트가 마운트될 때 메시지 변경 로직 시작
    const intervalId = setInterval(() => {
      setTitle(prevTitle => {
        const index = (messages.indexOf(prevTitle) + 1) % messages.length;
        return messages[index]; // 다음 메시지로 업데이트
      });
    }, 5000); // 5초마다 메시지 변경

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  return (
    <div className='main-main'>
      <header className='main-header'>
        <img src={`${process.env.PUBLIC_URL}/images/dndnfwmd123.png`} alt="로고" className="logo" />
        <h1 className="main-title">{title}</h1> {/* 상태로 관리되는 타이틀 사용 */}
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
        {/* 상세 내용 구역, 필요한 경우 이미지나 텍스트 </div>추가 */}
      </div>
      <div className="content-area">
        {/* 상세 내용 구역, 필요한 경우 이미지나 텍스트 추가 */}
      </div>
      <div className="content-area">
        {/* 상세 내용 구역, 필요한 경우 이미지나 텍스트 추가 */}
      </div>
      <div className="content-area">
        {/* 상세 내용 구역, 필요한 경우 이미지나 텍스트 추가 */}
      </div>
      <div className="content-area">
        {/* 상세 내용 구역, 필요한 경우 이미지나 텍스트 추가 */}
      </div>
      <div className="content-area">
        {/* 상세 내용 구역, 필요한 경우 이미지나 텍스트 추가 */}
      </div>

    </div>
  );
};

export default Main;
