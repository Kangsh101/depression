import React from 'react';
import banner1Image from '../shared/banner1.png';  // 이미지를 직접 임포트합니다.
import '../css/Banner1.css'; // 배너1 CSS 파일 임포트

const Banner1 = () => {
    return (
        <div className="banner1">
            <div className="banner1-content">
                <div className="banner1-text">
                    <h1 style={{ fontSize: '3.2rem', lineHeight: '1.3', marginBottom: '2rem', fontWeight: '900' }}>
                        당신 근처의
                        <br />
                        당근마켓
                    </h1>
                    <p style={{ fontSize: '17px' }}>
                        중고 거래부터 동네 정보까지, 이웃과 함께 해요
                        <br />
                        가깝고 따뜻한 당신의 근처를 만들어요.
                    </p>
                </div>
                <img src={banner1Image} alt="Banner 1" className="banner1-image" />
            </div>
        </div>
    );
};

export default Banner1;
