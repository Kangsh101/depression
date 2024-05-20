import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/QnA.css';
import '../css/Notice.css';

const Notice = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/notices')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('공지사항 목록 가져오기 실패:', error));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='notice-page'>
      <div className="notice-header">
        <div className="notice-options">
          <select className="notice-select">
            <option value="title">제목</option>
            <option value="author">작성자</option>
          </select>
          <input type="text" placeholder="검색어를 입력하세요" className="notice-search" />
          <button className="notice-button">검색</button>
        </div>
      </div>
      
      <div className="notice-content">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>분류</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post, index) => (
              <tr className='notice-tdcss' key={post.id} onClick={() => navigate(`/noticedetail/${post.id}`)}>
                <td>{indexOfFirstPost + index + 1}</td>
                <td>공지사항</td>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{new Date(post.date).toLocaleDateString()}</td>
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
    <div className="pagebtt">
      {pageNumbers.map(number => (
        <button key={number} onClick={() => paginate(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Notice;
