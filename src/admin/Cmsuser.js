import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Cms.css';

const Cmsuser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/getUserRole')
      .then(response => response.json())
      .then(data => {
        if (data.role !== 'admin') {
          navigate('/accessdenied');
        } else {
          setUserRole(data.role);
        }
      })
      .catch(error => console.error('사용자 역할 가져오기 실패:', error));

    fetch('/api/cmsusers')
      .then(response => response.json())
      .then(data => setUsers(data.map(user => ({ 
        ...user, 
        joinDate: user.joinDate.split('T')[0],
        birthdate: user.birthdate.split('T')[0] 
      }))))
      .catch(error => console.error('Error fetching users:', error));
  }, [navigate]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const location = useLocation();
  const handleUserClick = (index) => {
    setSelectedUserIndex(selectedUserIndex === index ? null : index); 
  };

  const handleDeactivateUser = (userId) => {
    fetch(`/api/deactivateUser/${userId}`, {
      method: 'PUT',
      credentials: 'include',
    })
    .then(response => {
      if (response.ok) {
        alert('비활성화 되었습니다.');
      } else {
        console.log('비활성화 실패 오류')
      }
    })
    .catch(error => console.error('사용자 비활성화 오류:', error));
  };

  const handleActivateUser = (userId) => {
    fetch(`/api/activateUser/${userId}`, {
      method: 'PUT',
      credentials: 'include',
    })
    .then(response => {
      if (response.ok) {
        alert('활성화 되었습니다.');
      } else {
        console.log('활성화 실패 오류');
      }
    })
    .catch(error => console.error('사용자 활성화 오류:', error));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (userRole !== 'admin') {
    return null;
  }

  return (
    <div className={`cms-container ${isSidebarOpen ? 'open' : ''}`}>
      <div className={`cms-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2 className='Cms-Depression'>Depression</h2>
        <h2 id='cms-h2id'>관리자</h2>
        <ul>
          <li className="cms-item"><Link to="/Cms">게시판 관리</Link></li>
          <li className={`cms-item2 ${location.pathname === "/Cmsuser" ? "cms-active" : ""}`}><Link to="/Cmsuser">사용자 관리</Link></li>
        </ul>
      </div>
      <div className="cms-main-content">
        <header className='major' id='major-rest'>
          <button className="mobile-menu-icon" onClick={toggleSidebar}>
            &#9776;
          </button>
        </header>
        {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
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
                <th>성함</th>
                <th>가입일</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((user, index) => (
                <React.Fragment key={index}>
                  <tr className='Cms-trtdcss' onClick={() => handleUserClick(index)}>
                    <td>{indexOfFirstPost + index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.joinDate}</td>
                  </tr>
                  {selectedUserIndex === index && (
                    <tr>
                      <td colSpan="6">
                        <div className="user-details">
                          <p>아이디: {user.username}</p>
                          <p>이름: {user.name}</p>
                          <p>이메일: {user.email}</p>
                          <p>생년월일: {user.birthdate}</p>
                          <p>전화번호: {user.phoneNumber}</p>
                          <p>가입일: {user.joinDate}</p>
                          <button className='cmsuser-bttt' onClick={()=> handleActivateUser(user.id)}>활성화</button>
                          <button className='cmsuser-btt' onClick={() => handleDeactivateUser(user.id)}>비활성화</button>
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
