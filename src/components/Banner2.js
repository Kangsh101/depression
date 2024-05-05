import React from 'react';
import banner2Image from '../shared/banner2.png';  // 이미지를 직접 임포트합니다.

const Banner2 = ({ onPopularClick, onTrustClick }) => {
    const bannerStyle = {
        padding: '6rem 0',
        width: '1024px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    };

    const imageStyle = {
        backgroundImage: `url(${banner2Image})`,  // 직접 임포트한 이미지 사용
        backgroundSize: '532px 684px',
        width: '532px',
        height: '684px'
    };

    return (
        <div style={bannerStyle}>
            <div style={imageStyle}></div>
            <div style={{ flexDirection: 'column', margin: '20px' }}>
                <h1 style={{ fontSize: '2.5rem', lineHeight: '1.35', marginBottom: '2.4rem', fontWeight: '800' }}>
                    우리 동네
                    <br />
                    중고 직거래 마켓
                </h1>
                <p style={{ fontSize: '17px', lineHeight: '1.5' }}>
                    동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.
                </p>
                <div style={{ marginTop: '3.2rem' }}>
                    <button onClick={onPopularClick} style={{ backgroundColor: '#f1f3f5', color: '#212529', border: 'none', borderRadius: '6px', padding: '15px 20px', fontSize: '18px', fontWeight: '900', margin: '0px 10px' }}>
                        인기매물 보기
                    </button>
                    <a href="https://www.daangn.com/trust" style={{ backgroundColor: '#f1f3f5', color: '#212529', textDecoration: 'none', padding: '15px 20px', display: 'inline-block', fontSize: '18px', fontWeight: '900', margin: '0px 10px' }}>
                        믿을 수 있는 중고거래
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Banner2;
