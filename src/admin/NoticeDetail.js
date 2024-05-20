import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/NoticeDetail.css';

const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState(null);

  useEffect(() => {
    fetch(`/api/notices/${id}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('공지사항 상세 정보 가져오기 실패:', error));

    fetch('/api/checklogin')
      .then(response => response.json())
      .then(data => {
        setIsLoggedIn(data.isLoggedIn);
        if (data.isLoggedIn) {
          fetch('/api/getUserName')
            .then(response => response.json())
            .then(userData => {
              setLoggedInUserName(userData.userName);
            })
            .catch(error => console.error('사용자 이름 가져오기 실패:', error));
        }
      })
      .catch(error => console.error('로그인 상태 확인 실패:', error));
  }, [id]);

  const handleGoBackToList = () => {
    const selectedPage = localStorage.getItem('selectedPage') || 'QnA';
    navigate(`/community?tab=${selectedPage}`);
  };

  const handleEditPost = () => {
    navigate(`/noticeup/${id}`);
  };

  const handleDeletePost = () => {
    fetch(`/api/notices/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('공지사항이 삭제되었습니다.');
        navigate(`/community?tab=Notice`);
      } else {
        alert('공지사항 삭제에 실패했습니다.');
      }
    })
    .catch(error => console.error('공지사항 삭제 실패:', error));
  };

  return (
    <div className="notice-detail-page">
      <div className="notice-detail-container">
        {post ? (
          <>
            <div className="notice-detail-title">
              <h2>{post.title}</h2>
            </div>
            <div className="notice-detail-info">
              <span className="notice-detail-author">작성자: {post.author}</span>
              <span className="notice-detail-date">등록일: {new Date(post.date).toLocaleString()}</span>
            </div>
            <div className="notice-detail-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
            <div className="notice-detail-buttons">
              <button className="button" onClick={handleGoBackToList}>목록</button>
              {isLoggedIn && post.author === loggedInUserName && (
                <>
                  <button className="button" onClick={handleEditPost}>수정</button>
                  <button className="button" onClick={handleDeletePost}>삭제</button>
                </>
              )}
            </div>
          </>
        ) : (
          <p>공지사항을 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
};

export default NoticeDetail;
