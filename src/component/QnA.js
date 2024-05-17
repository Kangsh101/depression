import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/QnA.css';

const QnAPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  useEffect(() => {
    fetch('/api/qna/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('게시글 목록 가져오기 실패:', error));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

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
        <Link to="/qnaup">
          <button className="qna-write-button">글쓰기</button>
        </Link>
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
                <td>{post.date}</td>
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
