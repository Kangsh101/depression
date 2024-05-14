import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  // 상태 관리를 위한 훅 설정
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 창 크기 변화에 따라 모바일 뷰 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 햄버거 메뉴 토글 함수
  const handleMenuToggle = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      navigate('/main');
    } catch (error) {
      console.error('로그아웃 오류:', error);
      alert('로그아웃에 실패했습니다.');
    }
  };

  return (
    <header className={isMobile ? "header mobile-header" : "header desktop-header"}>
      {/* 로고 섹션 */}
      <div className="div-logo">
        <Link to="/main">
          <img src="/images/free-icon-home-icon-63988.png" alt="Your Logo" className='header-logo' />
        </Link>
      </div>
      {/* 모바일에서는 햄버거 메뉴 표시, 데스크탑에서는 네비게이션 메뉴 표시 */}
      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            <button className='Header-nav' onClick={handleLogout}>로그아웃</button>
            <button className='Header-nav'><Link to="/mypage">내정보</Link></button>
          </>
        ) : (
          <>
            <button className='Header-loginbtt'><Link to="/login">로그인</Link></button>
            <button className='Header-signupbtt'><Link to="/signup">회원가입</Link></button>
          </>
        )}
        {isMobile && (
          <div className="hamburger-menu" onClick={handleMenuToggle}>
            ☰
          </div>
        )}
      </div>
      {!isMobile && (
        <nav className="nav-container">
          <ul>
            <li className='Header-nav'><Link to="/introduction">우울증이란</Link></li>
            <li className='Header-nav'><Link to="/contents">프로그램 콘텐츠</Link></li>
            <li className='Header-nav'><Link to="/community">커뮤니티</Link></li>
            <li className='Header-nav'><Link to="/support">고객센터</Link></li>
          </ul>
        </nav>
      )}
      {isMobile && menuOpen && (
        <div className="mobile-menu">
          <ul>
            <li className='Header-nav'><Link to="/introduction">우울증이란</Link></li>
            <li className='Header-nav'><Link to="/contents">프로그램 콘텐츠</Link></li>
            <li className='Header-nav'><Link to="/community">커뮤니티</Link></li>
            <li className='Header-nav'><Link to="/support">고객센터</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
