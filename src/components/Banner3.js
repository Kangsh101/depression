import React from 'react';
import banner3Image from '../shared/banner3.webp';  // 이미지를 직접 임포트합니다.
import '../css/Banner3.css'; // 배너3 CSS 파일 임포트

const Banner3 = () => {
    return (
        <div className="banner3">
            <div className="banner3-content">
                <div className="banner3-text">
                    <h1 style={{ fontSize: '2.5rem', lineHeight: '1.35', marginBottom: '2.4rem', fontWeight: '800' }}>
                        버디와 함께 하기전 <br /> 간단한 검사를
                    </h1>
                    <p style={{ fontSize: '17px', lineHeight: '1.5' }}>
                        CES-D 검사를 통해 우울증 증상을 확인하고, <br /> 버디와 함께 하루를 기록하며 성장하세요.
                    </p>
                    <p style={{ fontSize: '17px', color: 'gray' }}>
                        <br />
                        <br />
                        ※ 이미지는 어플 화면 예시입니다.
                    </p>
                </div>
                <img src={banner3Image} alt="Banner 3" className="banner3-image" />
            </div>
        </div>
    );
};

export default Banner3;
