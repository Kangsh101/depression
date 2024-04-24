import React, { useState } from 'react';
import { Link, useLocation  } from 'react-router-dom';
import '../css/Cms.css';

const Cmss = () => {
  const [posts, setPosts] = useState([
    { id: 1, type: '공지사항',title: '공지사항제목1', author: '관리자', date: '2024-01-01',description:'공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 ' },
    { id: 2, type: '공지사항',title: '공지사항제목2', author: '매니저', date: '2024-01-21' },
    { id: 3, type: '공지사항',title: '공지사항제목3', author: '관리자', date: '2024-01-11' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3); 
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleClick = (index) => {
    setSelectedPostIndex(index);
  };

  const location = useLocation(); 
  return (
    <>
      <div className="sidebar">
        <img src="/images/logo192.png" alt="Your Logo" />
        <h2>관리자 페이지</h2>
        <ul>
          <li className="cms-item"><Link to="/Cmscontents">프로그램 컨텐츠</Link></li>
          <li className={`cms-item ${location.pathname === "/Cmss" ? "cms-active" : ""}`}><Link to="/Cmss">게시판 관리</Link></li>
          <li className="cms-item"><Link to="/Cmsuser">사용자 관리</Link></li>
        </ul>
      </div>
      <div className="cms-container">

      <div className="Cmss-header">
        <div className='Cmss-chch'>
          <Link to="/Cmss"><button className='chchbtt1'>공지사항 게시판</button></Link>
          <Link to="/Cmsfaq"><button className='chchbtt'>FAQ 게시판</button></Link>
        </div>

        <div className="Cmss-options">
          
          <select className="Cmss-select">
            <option value="title">제목</option>
            <option value="author">작성자</option>
          </select>
          <input type="text" placeholder="검색어를 입력하세요" className="Cmss-search" />
          <button className="Cmss-button">검색</button>
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
          <tbody >
          {posts.map((post, index) => (
                
                <React.Fragment key={post.id}>
                  <tr onClick={() => handleClick(index)}>
                    <td>{post.id}</td>
                    <td>{post.type}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.date}</td>
                  </tr>
                  {selectedPostIndex === index && (
                    <tr className='sang-trtag'>
                      <td colSpan="5">
                        <div className="selected-post">
                          <p className='sang-title'>{post.title}</p>
                          <p className='sang-description'>{post.description}</p>
                          <div className='sang-bttcon'>
                            <button className='sang-btt'>게시글 수정</button>
                            <button className='sang-btt'>게시글 삭제</button>
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

export default Cmss;
