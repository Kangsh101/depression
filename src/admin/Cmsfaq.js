import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Cms.css';

const Cmsfaq = () => {
  const [posts, setPosts] = useState([
    { id: '1', title: '계정을 어떻게 만드나요?', content: '우측 상단의 회원가입을 클릭하여 필요한 정보를 입력해주세요.', create_at: '2023-05-01' },
    { id: '2', title: '비밀번호를 잊어버렸어요. 어떻게 해야 하나요?', content: '로그인 페이지에서 비밀번호 찾기를 클릭하고 등록한 이메일 주소를 입력해주세요.', create_at: '2023-04-25' },
    { id: '3', title: '환불 정책은 어떻게 되나요?', content: '구매 후 30일 이내에는 전액 환불이 가능합니다.', create_at: '2023-04-20' }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); 
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);

  const handleClick = (index) => {
    if (selectedPostIndex === index) {
      setSelectedPostIndex(null);
    } else {
      setSelectedPostIndex(index);
    }
  };

  const handleDelete = (id, index) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const location = useLocation();

  return (
    <div className="cms-container">
      <div className="cms-sidebar">
        <h2 className='Cms-Depression'>Depression</h2>
        <h2>관리자</h2>
        <ul>
          <li className={`cms-item2 ${location.pathname === "/Cms" ? "cms-active" : ""}`}><Link to="/Cms">게시판 관리</Link></li>
          <li className="cms-item"><Link to="/Cmsuser">사용자 관리</Link></li>
        </ul>
      </div>
      <div className="cms-main-content">
        <header className='major' id='major-rest'> 
          <h2 className='Cms-Htitle'>FAQ</h2>
        </header>
        <div className="Cmss-header">
          <div className='Cmss-chch'>
            <Link to="/Cms"><button id='cms-nodice'>공지사항 게시판</button></Link>
            <Link to="/Cmsfaq"><button id='cms-nodicego1'>FAQ 게시판</button></Link>
          </div>
          <div className="Cmss-options">
            <select className="Cmss-select">
              <option value="title">제목</option>
              <option value="author">작성자</option>
            </select>
            <input type="text" placeholder="검색어를 입력하세요" className="Cmss-search" />
            <button id='search-btt'>검색</button>
          </div>
          <Link to="/faqup">
            <button id='saddasdasd'>FAQ 등록</button>
          </Link>
        </div>
        <div className="Cmss-content">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Q</th>
                <th>A</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <React.Fragment key={post.id}>
                  <tr className='Cms-trtdcss' onClick={() => handleClick(indexOfFirstPost + index)}>
                    <td>{indexOfFirstPost + index + 1}</td>
                    <td className="ellipsis">{post.title}</td>
                    <td className="ellipsis">{post.content}</td>
                  </tr>
                  {selectedPostIndex === indexOfFirstPost + index && (
                    <tr className='sang-trtag'>
                      <td colSpan="5">
                        <div className="selected-post">
                          <p className='sang-title wrap-text'><span className='cms-QA'>Q </span> : {post.title}</p>
                          <p className='sang-description wrap-text'><span className='cms-QA'>A </span> : {post.content}</p>
                          <div className='sang-bttcon'>
                            <button  id='notice-u'>게시글 수정</button>
                            <button id='notice-x' onClick={() => handleDelete(post.id, indexOfFirstPost + index)}>게시글 삭제</button>
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

export default Cmsfaq;
