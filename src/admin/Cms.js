import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Cms.css';

const Cms = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
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

    fetch('/api/notices')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('공지사항 목록 가져오기 실패:', error));
  }, [navigate]);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleDelete = (id, index) => {
    fetch(`/api/notices/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        const updatedPosts = [...posts];
        updatedPosts.splice(index, 1);
        setPosts(updatedPosts);
      }
    })
    .catch(error => console.error('게시글 삭제 중 에러 발생:', error));
  };

  const location = useLocation();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (userRole === null) {
    return <div>Loading...</div>; // 로딩 화면 표시
  }

  return (
    <div className={`cms-container ${isSidebarOpen ? 'open' : ''}`}>
      <div className={`cms-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2 className='Cms-Depression'>Depression</h2>
        <h2 id='cms-h2id'>관리자</h2>
        <ul>
          <li className={`cms-item2 ${location.pathname === "/Cms" ? "cms-active" : ""}`}><Link to="/Cms">게시판 관리</Link></li>
          <li className="cms-item"><Link to="/Cmsuser">사용자 관리</Link></li>
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
          <div className='Cmss-chch'>
            <Link to="/Cms"><button id='cms-nodicego'>공지사항 게시판</button></Link>
            <Link to="/Cmsfaq"><button id='cms-nodice'>FAQ 게시판</button></Link>
          </div>

          <div className="Cmss-options">
            <select className="Cmss-select">
              <option value="title">제목</option>
              <option value="author">작성자</option>
            </select>
            <input type="text" placeholder="검색어를 입력하세요" className="Cmss-search" />
            <button id='search-btt'>검색</button>
          </div>
          <div className='nticeup-btt'>
            <Link to="/noticeup">
              <button id='saddasdasd'>공지사항 등록</button>
            </Link>
          </div>
        </div>

        <div className="Cmss-content">
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
                <React.Fragment key={post.id}>
                  <tr className='Cms-trtdcss' onClick={() => navigate(`/notice/${post.id}`)}>
                    <td>{indexOfFirstPost + index + 1}</td>
                    <td>공지사항</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{new Date(post.date).toLocaleDateString('ko-KR')}</td>
                  </tr>
                </React.Fragment>
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
    </div>
  );
};

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="Cmss-pagebtt">
      {pageNumbers.map(number => (
        <button key={number} onClick={() => paginate(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Cms;
