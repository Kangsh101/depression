import React from 'react';
import banner4Image from '../shared/Banner4.jpeg';  // 이미지를 직접 임포트합니다.
import '../css/Banner4.css'; // 배너4 CSS 파일 임포트

const Banner4 = () => {
    return (
        <div className="banner4">
            <div className="banner4-content">
                <div className="banner4-text">
                    <h1 style={{ fontSize: '2.5rem', lineHeight: '1.35', marginBottom: '2.4rem', fontWeight: '800' }}>
                        우리 모두 <br /> 행복한 삶을
                    </h1>
                    <p style={{ fontSize: '17px', lineHeight: '1.5' }}>
                        버디를 함께 한다면 <br /> 하루를 한 번 더 생각하고 감정을 추스를 수 있습니다.
                    </p>
                    {/* <a href="https://town.daangn.com/" style={{ backgroundColor: '#f1f3f5', color: '#212529', textDecoration: 'none', padding: '15px 20px', display: 'inline-block', fontSize: '18px', fontWeight: '900' }}>
                        당근마켓 동네가게 찾기
                    </a> */}
                    <p style={{ fontSize: '17px', color: 'gray' }}>
                        <br />
                        ※ 이미지는 어플 화면 예시입니다.
                    </p>
                </div>
                <img src={banner4Image} alt="Banner 4" className="banner4-image" />
            </div>
        </div>
    );
};

export default Banner4;
