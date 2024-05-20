import React from 'react';
import banner1Image from '../shared/Banner1.jpeg';  // 이미지를 직접 임포트합니다.
import '../css/Banner1.css'; // 배너1 CSS 파일 임포트

const Banner1 = () => {
    return (
        <div className="banner1">
            <div className="banner1-content">
                <div className="banner1-text">
                    <h1 style={{ fontSize: '3.2rem', lineHeight: '1.3', marginBottom: '2rem', fontWeight: '900' }}>
                        당신 친구
                        <br />
                        버디
                    </h1>
                    <p style={{ fontSize: '17px' }}>
                        버디는 당신의 일상을 함께하며
                        <br />
                        일상을 기록하고 함께 성장합니다.
                    </p>
                </div>
                <img src={banner1Image} alt="Banner 1" className="banner1-image" />
            </div>
        </div>
    );
};

export default Banner1;
