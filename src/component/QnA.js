import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/QnA.css';

const QnAPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 상태 확인 로직 (예: API 호출 또는 로컬 스토리지 확인)
    const checkLoginStatus = () => {
      // 로그인 상태를 확인하는 실제 로직 추가
      // 여기서는 예제로 로컬 스토리지 사용
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();

    fetch('/api/qna/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('게시글 목록 가져오기 실패:', error));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleWriteButtonClick = () => {
    if (!isLoggedIn) {
      alert('로그인을 해주세요');
      navigate('/login'); // 로그인 페이지로 이동
    } else {
      navigate('/qnaup'); // 글쓰기 페이지로 이동
    }
  };

  return (
    <div className="qna-page">
      <div className="qna-header">
        <div className="qna-options">
          <select className="qna-select">
            <option value="title">제목</option>
            <option value="author">작성자</option>
          </select>
          <input type="text" placeholder="검색어를 입력하세요" className="qna-search" />
          <button className="qna-button">검색</button>
        </div>
        <button className="qna-write-button" onClick={handleWriteButtonClick}>
          글쓰기
        </button>
      </div>
      <div className="qna-content">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post, index) => (
              <tr className='QnA-tdcss' key={post.id}>
                <td>{indexOfFirstPost + index + 1}</td>
                <td><Link to={`/qna/${post.id}`}>{post.title}</Link></td>
                <td>{post.author}</td>
                <td>{new Date(post.date).toLocaleDateString('ko-KR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="pagebtt">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QnAPage;
