import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/qnacontent.css';

const QnADetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState(null);

  useEffect(() => {
    fetch(`/api/qna/posts/${id}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('게시글 상세 정보 가져오기 실패:', error));
    
    fetch(`/api/qna/posts/${id}/comments`)
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('댓글 가져오기 실패:', error));

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
    navigate(-1);
  };

  const handleEditPost = () => {
    navigate(`/qnaup/${id}`); 
  };

  const handleDeletePost = () => {
    fetch(`/api/qna/posts/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        alert('게시글이 삭제되었습니다.');
        navigate(-1);
      } else {
        alert('게시글 삭제에 실패했습니다.');
      }
    })
    .catch(err => console.error('게시글 삭제 실패:', err));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    fetch(`/api/qna/posts/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: newComment })
    })
    .then(response => response.json())
    .then(data => {
      if (data.id) {
        setComments([...comments, data]);
        setNewComment('');
      } else {
        alert('댓글 추가에 실패했습니다.');
      }
    })
    .catch(error => console.error('댓글 추가 실패:', error));
  };

  const handleEditComment = (commentId, newContent) => {
    fetch(`/api/qna/posts/${id}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: newContent })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        setComments(comments.map(comment => comment.id === commentId ? { ...comment, content: newContent } : comment));
        alert('댓글이 수정되었습니다.');
      } else {
        alert('댓글 수정에 실패했습니다.');
      }
    })
    .catch(error => console.error('댓글 수정 실패:', error));
  };

  const handleDeleteComment = (commentId) => {
    fetch(`/api/qna/posts/${id}/comments/${commentId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        setComments(comments.filter(comment => comment.id !== commentId));
        alert('댓글이 삭제되었습니다.');
      } else {
        alert('댓글 삭제에 실패했습니다.');
      }
    })
    .catch(error => console.error('댓글 삭제 실패:', error));
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
      <div className="qna-comments-container">
        <h3>댓글</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="qna-comment">
            <div className="qna-comment-author">{comment.author}</div>
            <div className="qna-comment-content">{comment.content}</div>
            <div className="qna-comment-date">{formatDateTime(comment.created_at)}</div>
            {isLoggedIn && loggedInUserName === comment.author && (
              <div className="qna-comment-actions">
                <button onClick={() => {
                  const newContent = prompt('댓글을 수정하세요:', comment.content);
                  if (newContent !== null) {
                    handleEditComment(comment.id, newContent);
                  }
                }}>수정</button>
                <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
              </div>
            )}
          </div>
        ))}
        {isLoggedIn && (
          <div className="qna-add-comment">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <button className="button" onClick={handleAddComment}>댓글 추가</button>
          </div>
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
