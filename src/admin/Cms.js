import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Cms.css';

const Cms = () => {
  const [posts, setPosts] = useState([
    { id: '1', number: 1, board_type: '공지', title: '중요 업데이트', name: '관리자', create_at: '2023-05-01', content: '사이트 유지 관리에 관한 중요 업데이트입니다.' },
    { id: '2', number: 2, board_type: '뉴스', title: '휴일 공지', name: '인사팀', create_at: '2023-04-25', content: '다가오는 휴일 일정에 대한 세부 정보입니다.' },
    { id: '3', number: 3, board_type: '업데이트', title: '버전 2.5 출시', name: '개발팀', create_at: '2023-04-20', content: '우리 소프트웨어의 버전 2.5를 출시하게 되어 기쁩니다.' }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const navigate = useNavigate();

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleClick = (index) => {
    setSelectedPostIndex(index);
  };

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
  return (
    <div className="cms-container">
      <div className="cms-sidebar">
        <h2 className='Cms-Depression'>Depression</h2>
        <h2>관리자</h2>
        <ul>
          {/* <li className="cms-item"><Link to="/Cmscontents">프로그램 컨텐츠</Link></li> */}
          <li className={`cms-item2 ${location.pathname === "/Cms" ? "cms-active" : ""}`}><Link to="/Cms">게시판 관리</Link></li>
          <li className="cms-item"><Link to="/Cmsuser">사용자 관리</Link></li>
        </ul>
      </div>
      <div className="cms-main-content">
      <header className='major' id='major-rest'> 
          <h2 className='Cms-Htitle'>공지사항</h2>
        </header>
        <div className="Cmss-header">
          <div className='Cmss-chch'>
            <Link to="/Cms"><button id='cms-nodicego'>공지사항 게시판</button></Link>
            <Link to="/Cmsfaq"><button  id='cms-nodice'>FAQ 게시판</button></Link>
          </div>

          <div className="Cmss-options">
            <select className="Cmss-select">
              <option value="title">제목</option>
              <option value="author">작성자</option>
            </select>
            <input type="text" placeholder="검색어를 입력하세요" className="Cmss-search" />
            <button id='search-btt'>검색</button>
          </div>
          <Link to="/noticeup">
            <button id='saddasdasd'>공지사항 등록</button>
          </Link>
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
              {posts.map((post, index) => (
                <React.Fragment key={post.id}>
                  <tr className='Cms-trtdcss' onClick={() => handleClick(index)}>
                    <td>{post.number}</td>
                    <td>{post.board_type}</td>
                    <td>{post.title}</td>
                    <td>{post.name}</td>
                    <td>{post.create_at}</td>
                  </tr>
                  {selectedPostIndex === index && (
                    <tr className='sang-trtag'>
                      <td colSpan="5">
                        <div className="selected-post">
                          <p className='sang-title wrap-text'><span className='cms-QA'>제목 </span> : {post.title}</p>
                          <p className='sang-description wrap-text'><span className='cms-QA'>내용 </span> : {post.content}</p>
                          <div className='sang-bttcon'>
                            <button id='notice-u'>게시글 수정</button>
                            <button id='notice-x' onClick={() => handleDelete(post.board_id, index)}>게시글 삭제</button>
                          </div>
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

export default Cms;
