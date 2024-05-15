import React, { useState } from 'react';
import '../css/Contents.css';

const ContentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;

  const videos = [
    {
      url: 'https://www.youtube.com/embed/Zzqhu6Y2i_E',
      title: '우울하다고요?',
      description: '우울증 방치하지마세요. 더 우울해집니다',
    },
    {
      url: '',
      title: '우울하면 먹어라!',
      description: '우울할 땐 먹어야 산다',
    },
    {
      url: '',
      title: '많이 웃어라.',
      description: '우울해요?ㅋㅋㅋ웃으세요 ㅋㅋ',
    },
    {
      url: '',
      title: '많이 웃어라.',
      description: '우울해요?ㅋㅋㅋ웃으세요 ㅋㅋ',
    },
    {
      url: 'https://d',
      title: '많이 웃어라.',
      description: '우울해요?ㅋㅋㅋ웃으세요 ㅋㅋ',
    },
    {
      url: 'hd',
      title: '많이 웃어라.',
      description: '우울해요?ㅋㅋㅋ웃으세요 ㅋㅋ',
    },
    {
      url: 'htd',
      title: '우울해하지마세요.',
      description: '우울증은 모든 건강을 해치고 악화시킵니다.',
    },
    {
      url: 'hd',
      title: '우울해하지마세요.',
      description: '우울증은 모든 건강을 해치고 악화시킵니다.',
    },
    {
      url: 'hd',
      title: '우울해하지마세요.',
      description: '우울증은 모든 건강을 해치고 악화시킵니다.',
    },
  ];

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='content-main'>
      <div className="content-topbar">
        <div className='content-topbar-title'>
          <h2>Content</h2>
        </div>
      </div>
      <div className='content-container'>
        <div>
          <div className="content-layout">
            <div className='content-heBox'>
              <div className="content-box col-lg-2">
                {currentVideos.map((video, index) => (
                  <div key={index} className="video-description-wrapper">
                    <div className="video-box">
                      <iframe
                        src={video.url}
                        title="YouTube"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="description-box">
                      <a href={video.url}>{video.title}</a>
                      <p>{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                videosPerPage={videosPerPage}
                totalVideos={videos.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ videosPerPage, totalVideos, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (event, number) => {
    event.preventDefault();
    paginate(number);
  };

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={(event) => handlePageClick(event, number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ContentPage;
