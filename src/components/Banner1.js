import React from 'react';
import banner1Image from '../shared/banner1.png';  // 이미지를 직접 임포트합니다.

const Banner1 = () => {
    const bannerStyle = {
        backgroundColor: '#fbf7f2',
        width: '1500px',
        height: '760px',
        margin: '0px 100px 0px 200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    };

    const imageStyle = {
        width: '754px',
        height: '635px',
        backgroundImage: `url(${banner1Image})`,  // 직접 임포트한 이미지 사용
        backgroundSize: '754px 635px',
        margin: '120px 0px 0px 0px'
    };

    return (
        <div style={bannerStyle}>
            <div>
                <h1 style={{ fontSize: '3.2rem', lineHeight: '1.3', paddingTop: '100px', marginBottom: '2rem', fontWeight: '900' }}>
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
            <div style={imageStyle}></div>
        </div>
    );
};

export default Banner1;
