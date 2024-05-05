import React from 'react';
import banner3Image from '../shared/banner3.png';  // 이미지를 직접 임포트합니다.

const Banner3 = () => {
    const bannerStyle = {
        padding: '6rem 0',
        backgroundColor: '#E6F3E6',
        display: 'block'
    };

    const imageStyle = {
        backgroundImage: `url(${banner3Image})`,  // 직접 임포트한 이미지 사용
        backgroundSize: '546px 740px',
        width: '546px',
        height: '740px'
    };

    return (
        <div style={bannerStyle}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', width: '1024px', margin: '0 auto', justifyContent: 'space-between' }}>
                <div style={imageStyle}></div>
                <div>
                    <h1 style={{ fontSize: '2.5rem', lineHeight: '1.35', marginBottom: '2.4rem', fontWeight: '800' }}>
                        이웃과 함께 하는 <br /> 동네 생활
                    </h1>
                    <p style={{ fontSize: '17px', lineHeight: '1.5' }}>
                        우리 동네의 다양한 이야기를 이웃과 함께 나누어요.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Banner3;
