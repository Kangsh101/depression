import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Cms.css';

const Cmsuser = () => {
  const [posts] = useState([
    { id: 1, type: '보호자', name: '강석현', birth:'00.01.23', gender:'남', phone:'010-3360-4932', date: '2024-01-01' },
    { id: 2, type: '환자', name: '강석현', birth:'00.01.23', gender:'남', phone:'010-3360-4932', date: '2024-01-01' },
    { id: 3, type: '보호자', name: '강석현', birth:'00.01.23', gender:'남', phone:'010-3360-4932', date: '2024-01-01' },
    { id: 4, type: '환자', name: '강석현', birth:'00.01.23', gender:'남', phone:'010-3360-4932', date: '2024-01-01' },
    { id: 5, type: '환자', name: '강석현', birth:'00.01.23', gender:'남', phone:'010-3360-4932', date: '2024-01-01' },
    { id: 6, type: '보호자', name: '강석현', birth:'00.01.23', gender:'남', phone:'010-3360-4932', date: '2024-01-01' },
    { id: 7, type: '보호자', name: '강석현', birth:'00.01.23', gender:'남', phone:'010-3360-4932', date: '2024-01-01' },
    { id: 8, type: '보호자', name: '강석현', birth:'00.01.23', gender:'남', phone:'010-3360-4932', date: '2024-01-01' },
    { id: 9, type: '보호자', name: '강석현', birth:'00.01.23', gender:'남', phone:'010-3360-4932', date: '2024-01-01' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7); 

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const location = useLocation(); 

  return (
    <>
      <div className="sidebar">
        <img src="/images/logo192.png" alt="Your Logo" />
        <h2>관리자 페이지</h2>
        <ul>
          <li className="cms-item"><Link to="/Cmscontents">프로그램 컨텐츠</Link></li>
          <li className="cms-item"><Link to="/Cmss">게시판 관리</Link></li>
          <li className={`cms-item ${location.pathname === "/Cmsuser" ? "cms-active" : ""}`}><Link to="/Cmsuser">사용자 관리</Link></li>
        </ul>
      </div>
      <div className="cms-container">
        <div className="Cmss-header">
          <h2>사용자 관리</h2>
          <div className="Cmss-options">
            <select className="Cmss-select">
              <option value="환자">환자</option>
              <option value="보호자">보호자</option>
            </select>
            <input type="text" placeholder="사용자 정보를 입력해주세요." className="Cmss-search" />
            <button className="Cmss-button">검색</button>
          </div>
        </div>
        <div className="Cmss-content">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>분류</th>
                <th>성함</th>
                <th>생년월일</th>
                <th>성별</th>
                <th>전화번호</th>
                <th>가입일</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.type}</td>
                  <td>{post.name}</td>
                  <td>{post.birth}</td>
                  <td>{post.gender}</td>
                  <td>{post.phone}</td>
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
    </>
  );
};

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="Cmss-pagebtt">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cmsuser;
