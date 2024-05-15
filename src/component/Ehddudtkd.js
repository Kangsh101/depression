import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Ehddudtkd.css';
const DepressionRecoveryVideos = () => {
  const videos = [
    { id: 'video1', title: '우울증 이해하기', src: 'https://www.youtube.com/embed/video1', description: '우울증의 기본적인 이해와 초기 증상을 알아봅니다.' },
    { id: 'video2', title: '일상 속에서 우울증 극복하기', src: 'https://www.youtube.com/embed/video2', description: '일상 생활에서 쉽게 실천할 수 있는 우울증 극복 방법.' },
    { id: 'video3', title: '전문가의 조언', src: 'https://www.youtube.com/embed/video3', description: '우울증을 극복하기 위한 전문가의 조언과 팁.' }
  ];

  return (
    <div className="container">
      <h1>우울증 극복 돕기</h1>
      <div className="videos-grid">
        {videos.map(video => (
          <div key={video.id} className="video-box">
            <iframe
              src={video.src}
              title={video.title}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <p className="video-description">{video.description}</p>
          </div>
        ))}
      </div>
      {/* <Link to="/more-info" className="more-info-link">더 많은 정보</Link> */}
    </div>
  );
};

export default DepressionRecoveryVideos;
