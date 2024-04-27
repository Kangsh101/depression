// Main.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Main.css';
import Footer from './Footer';
// import { ReactComponent as CatIcon } from '../logo.svg'; //

import { motion } from 'framer-motion';

const Main = () => {
  const [selectedSection, setSelectedSection] = useState('overview');

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };
  const variants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div className='main-main'
      initial="enter"
      animate="center"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <div className="main-container">
        <header className='main-header'>
          <img src={`${process.env.PUBLIC_URL}/images/dndnfwmd123.png`} alt="로고" className="logo" />

          <h1>DEPRESSION</h1>
          <p id='smailgood'>웃으면 행복이 찾아옵니다.</p>
        </header>
        <motion.nav className='main-nav'
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
        >
          <button onClick={() => handleSectionClick('overview')} className={selectedSection === 'overview' ? 'active' : ''}>개요</button>
          <button onClick={() => handleSectionClick('symptoms')} className={selectedSection === 'symptoms' ? 'active' : ''}>증상</button>
          <button onClick={() => handleSectionClick('treatment')} className={selectedSection === 'treatment' ? 'active' : ''}>치료</button>
          <button onClick={() => handleSectionClick('support')} className={selectedSection === 'support' ? 'active' : ''}>지원 받기</button>
        </motion.nav>
        
        <motion.div className="section-content"
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
        >
          {selectedSection === 'overview' && <p>우울증 관련 내용 우울증은 나빠요<p>우울증은 나빠요<p>우울증은 나빠요</p></p></p>}
          {selectedSection === 'symptoms' && <p>우울증 증상 정보...</p>}
          {selectedSection === 'treatment' && <p>치료 방법 정보...</p>}
          {selectedSection === 'support' && <p>지원 서비스 정보...</p>}
        </motion.div>
        
        <div className="additional-content">
          <section className="infographics">
          <img src={`${process.env.PUBLIC_URL}/images/dndnfwmd12.png`} alt="귀여운 고양이" />

          </section>
          <section className="self-test">
            <Link to="/self-test" className="start-test-button">우울증 자가진단 테스트 시작하기</Link>
          </section>
          <section className="live-chat">
            <Link to="/contents" className="live-content-button">프로그램 콘텐츠 바로가기</Link>
          </section>
        </div>
        
      </div>
      <Footer />
    </motion.div>
  );
};

export default Main;
