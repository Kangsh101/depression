import React from 'react';
import banner4Image from '../shared/banner4.png';  // 이미지를 직접 임포트합니다.
import '../css/Banner4.css'; // 배너4 CSS 파일 임포트

const Banner4 = () => {
    return (
        <div className="banner4">
            <div className="banner4-content">
                <div className="banner4-text">
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
                <img src={banner4Image} alt="Banner 4" className="banner4-image" />
            </div>
        </div>
    );
};

export default Banner4;
