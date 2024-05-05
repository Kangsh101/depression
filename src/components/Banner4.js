import React from 'react';
import banner4Image from '../shared/banner4.png';  // 이미지를 직접 임포트합니다.

const Banner4 = () => {
    const bannerStyle = {
        padding: '6rem 0',
        display: 'block'
    };

    const imageStyle = {
        backgroundImage: `url(${banner4Image})`,  // 직접 임포트한 이미지 사용
        backgroundSize: '526px 735px',
        width: '526px',
        height: '735px'
    };

    return (
        <div style={bannerStyle}>
            <div style={{ width: '1024px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={imageStyle}></div>
                <div>
                    <h1 style={{ fontSize: '2.5rem', lineHeight: '1.35', marginBottom: '2.4rem', fontWeight: '800' }}>
                        내 근처에서 찾는 <br /> 우리 동네 가게
                    </h1>
                    <p style={{ fontSize: '17px', lineHeight: '1.5' }}>
                        우리 동네 가게를 찾고 있나요? <br /> 동네 주민이 남긴 진짜 후기를 함께 확인해보세요!
                    </p>
                    <a href="https://town.daangn.com/" style={{ backgroundColor: '#f1f3f5', color: '#212529', textDecoration: 'none', padding: '15px 20px', display: 'inline-block', fontSize: '18px', fontWeight: '900' }}>
                        당근마켓 동네가게 찾기
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Banner4;
