import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Cms.css';

const Cmsuser = () => {
  const [users, setUsers] = useState([
    { username: 'user01', role: 'Admin', name: '홍길동', gender: '남성', joinDate: '2023-01-01', email: 'user01@example.com', birthdate: '1990-05-15', phoneNumber: '010-1234-5678' },
    { username: 'user02', role: 'User', name: '김민지', gender: '여성', joinDate: '2023-01-02', email: 'user02@example.com', birthdate: '1992-08-25', phoneNumber: '010-8765-4321' },
    { username: 'user03', role: 'User', name: '이철수', gender: '남성', joinDate: '2023-01-03', email: 'user03@example.com', birthdate: '1988-11-30', phoneNumber: '010-1357-2468' }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const location = useLocation();
  const handleUserClick = (index) => {
    setSelectedUserIndex(selectedUserIndex === index ? null : index); 
  };

  return (
    <div className="cms-container">
      <div className="cms-sidebar">
        <h2 className='Cms-Depression'>Depression</h2>
        <h2>관리자</h2>
        <ul>
          <li className="cms-item"><Link to="/Cms">게시판 관리</Link></li>
          <li className={`cms-item2 ${location.pathname === "/Cmsuser" ? "cms-active" : ""}`}><Link to="/Cmsuser">사용자 관리</Link></li>
        </ul>
      </div>
      <div className="cms-main-content">
        <div className="Cmss-header">
          <header className='major' id='major-rest'> 
            <h2 className='Cms-Htitle'>사용자 관리</h2>
          </header>
          <div className="Cmss-options">
            <select className="Cmss-select">
              <option value="name">성함</option>
              <option value="role">타입</option>
            </select>
            <input type="text" placeholder="사용자 정보를 입력해주세요." className="Cmss-search" />
            <button id='search-btt'>검색</button>
          </div>
        </div>
        <div className="Cmss-content">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>아이디</th>
                <th>타입</th>
                <th>성함</th>
                <th>성별</th>
                <th>가입일</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((user, index) => (
                <React.Fragment key={index}>
                  <tr className='Cms-trtdcss' onClick={() => handleUserClick(index)}>
                    <td>{indexOfFirstPost + index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>{user.name}</td>
                    <td>{user.gender}</td>
                    <td>{user.joinDate}</td>
                  </tr>
                  {selectedUserIndex === index && (
                    <tr>
                      <td colSpan="6">
                        <div className="user-details">
                          <p>아이디: {user.username}</p>
                          <p>타입: {user.role}</p>
                          <p>이름: {user.name}</p>
                          <p>성별: {user.gender}</p>
                          <p>이메일: {user.email}</p>
                          <p>생년월일: {user.birthdate}</p>
                          <p>전화번호: {user.phoneNumber}</p>
                          <p>가입일: {user.joinDate}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={users.length}
            paginate={paginate}
          />
        </div>
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
