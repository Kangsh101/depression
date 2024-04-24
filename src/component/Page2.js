import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Page2.css';

const QnAPage = () => {
  const [posts] = useState([
    { id: 1, title: '질문 있습니다.', author: '강석현', date: '2024-01-01' },
    { id: 2, title: '질문 있습니다.', author: '오징어', date: '2024-01-01' },
    { id: 3, title: '질문 있습니다.', author: '강석현', date: '2024-01-01' },
    { id: 4, title: '질문 있습니다.', author: '홍길동', date: '2024-01-01' },
    { id: 5, title: '질문 있습니다.', author: '122', date: '2024-01-01' },
    { id: 6, title: '질문 있습니다.', author: '112', date: '2024-01-01' },
    { id: 7, title: '질문 있습니다.', author: '333', date: '2024-01-01' },
    { id: 8, title: '질문 있습니다.', author: '3332', date: '2024-01-01' },
    { id: 9, title: '질문 있습니다.', author: '421421', date: '2024-01-01' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3); 


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="qna-page">
        <nav className="qna-navigation">
          <span className="qna-nav-ALL">전체</span>
            <Link to="/Page2" className="qna-nav-item-Q">QnA게시판</Link>
            <Link to="/Page4" className="qna-nav-item">공지사항</Link>
            <Link to="/Page5" className="qna-nav-item">자주묻는질문</Link>
        </nav>
      </div>

      <div className="qna-header">
        <div className="qna-options">
          <h2 className='aaaaaa'>QnA 게시판</h2>
          <select className="qna-select">
            <option value="title">제목</option>
            <option value="author">작성자</option>
          </select>
          <input type="text" placeholder="검색어를 입력하세요" className="qna-search" />
          <button className="qna-button">검색</button>
        </div>
        <Link to="/Page3">
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
            {currentPosts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td><Link to={`/post/${post.id}`}>{post.title}</Link></td>
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
