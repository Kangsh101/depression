import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/qnacontent.css';

const QnADetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState(null);

  useEffect(() => {
    fetch(`/api/qna/posts/${id}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('게시글 상세 정보 가져오기 실패:', error));
    
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

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    return new Date(dateTimeString).toLocaleString('ko-KR', options).replace(/\. /g, '-').replace(/\./g, '');
  };

  const handleGoBackToList = () => {
    navigate('/qnapage');
  };

  const handleEditPost = () => {
    // 글 수정 로직 추가
  };

  const handleDeletePost = () => {
    fetch(`/api/qnaposts/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('게시글이 삭제되었습니다.');
        navigate('/qnapage');
      } else {
        alert('게시글 삭제에 실패했습니다.');
      }
    })
    .catch(err => console.error('게시글 삭제 실패:', err));
  };

  return (
    <div className="qnadetail-page">
      <div className="qna-content-container">
        {post && (
          <>
            <div className="qna-title">
              <h2>{post.title}</h2>
            </div>
            <div className="qna-author-date">
              <span>작성자: {post.author}</span>
              <span>등록일: {formatDateTime(post.date)}</span>
            </div>
            <div className="qna-content">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </>
        )}
      </div>
      <div className="qna-content-buttons">
        <button className="button" onClick={handleGoBackToList}>목록</button>
        {isLoggedIn && post && loggedInUserName === post.author && (
          <>
            <button className="button" onClick={handleEditPost}>수정</button>
            <button className="button" onClick={handleDeletePost}>삭제</button>
          </>
        )}
      </div>
    </div>
  );
};

export default QnADetailPage;
