import React from 'react';
import banner2Image from '../shared/banner2-1.png';  // 이미지를 직접 임포트합니다.
import '../css/Banner2.css'; // 배너2 CSS 파일 임포트

const Banner2 = ({ onPopularClick, onTrustClick }) => {
    return (
        <div className="banner2">
            <div className="banner2-content">
                <div className="banner2-text">
                    <h1 style={{ fontSize: '2.5rem', lineHeight: '1.35', marginBottom: '2.4rem', fontWeight: '800' }}>
                        더 나은 행복을 위해
                        <br />
                        함께합니다.
                    </h1>
                    <p style={{ fontSize: '17px', lineHeight: '1.5' }}>
                        평사시 처럼 일기를 기록하듯, <br /> 버디와 함께 하루를 기록하고 성장하세요.
                    </p>
                    <div style={{ marginTop: '3.2rem' }}>
                        {/* <button onClick={onPopularClick} style={{ backgroundColor: '#f1f3f5', color: '#212529', border: 'none', borderRadius: '6px', padding: '15px 20px', fontSize: '18px', fontWeight: '900', margin: '0px 10px' }}>
                            인기매물 보기
                        </button> */}
                        {/* <a href="https://www.daangn.com/trust" style={{ backgroundColor: '#f1f3f5', color: '#212529', textDecoration: 'none', padding: '15px 20px', display: 'inline-block', fontSize: '18px', fontWeight: '900', margin: '0px 10px' }}>
                            믿을 수 있는 중고거래
                        </a> */}
                    </div>
                    <p style={{ fontSize: '17px', color: 'gray' }}>
                        <br />
                        <br />
                        ※ 이미지는 어플 화면 예시입니다.
                    </p>
                </div>
                <img src={banner2Image} alt="Banner 2" className="banner2-image" />
            </div>
        </div>
    );
};

export default Banner2;
