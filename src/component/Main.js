// Main.jsx
import React, { useState, useEffect } from 'react'; // useState와 useEffect 추가
import { Link } from 'react-router-dom';
import '../css/Main.css';
import Footer from './Footer';

const Main = () => {
  const [title, setTitle] = useState('어제와 내일은 다르게'); // 초기 타이틀 설정
  const messages = [ // 표시될 메시지 배열
    "어제와 내일은 다르게",
    "힘든 오늘도, 잘 견뎌냈습니다",
    "작은 발걸음이 모여 큰 길이 됩니다",
    "오늘 하루도 당신은 충분히 잘하고 있어요",
    "어떤 날은 느리게 가도 괜찮아요"
  ];

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
      <Footer />
    </div>
  );
};

export default Main;
