import React from 'react';
import banner3Image from '../shared/banner3.png';  // 이미지를 직접 임포트합니다.
import '../css/Banner3.css'; // 배너3 CSS 파일 임포트

const Banner3 = () => {
    return (
        <div className="banner3">
            <div className="banner3-content">
                <div className="banner3-text">
                    <h1 style={{ fontSize: '2.5rem', lineHeight: '1.35', marginBottom: '2.4rem', fontWeight: '800' }}>
                        이웃과 함께 하는 <br /> 동네 생활
                    </h1>
                    <p style={{ fontSize: '17px', lineHeight: '1.5' }}>
                        우리 동네의 다양한 이야기를 이웃과 함께 나누어요.
                    </p>
                </div>
                <img src={banner3Image} alt="Banner 3" className="banner3-image" />
            </div>
        </div>
    );
};

export default Banner3;
