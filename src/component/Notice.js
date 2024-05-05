import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/QnA.css';
import '../css/Notice.css';

const Notice = () => {
  const [posts, setPosts] = useState([
    { id: 1, set:'공지사항', title: '오늘의 공지', author: '매니저', date: '2024-01-01' },
    { id: 2, set:'공지사항', title: '내일의 공지', author: '관리자', date: '2024-01-02' },
    { id: 3, set:'공지사항', title: '약 복 공지', author: '매니저', date: '2024-01-03' },
    { id: 4, set:'공지사항', title: '알림', author: '관리자', date: '2024-01-04' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='notice-page'>
      <div className="notice-header">
        <div className="notice-options">
          {/* <h2 className='aaaaaa'>공지사항</h2> */}
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
            {currentPosts.map(post => (
              <tr className='notice-tdcss' key={post.id}>
                <td>{post.id}</td>
                <td>{post.set}</td>
                <td>{post.title}</td>
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
    <div className="pagebtt">
      {pageNumbers.map(number => (
        <button  key={number} onClick={() => paginate(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Notice;
