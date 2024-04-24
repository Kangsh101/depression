import React, { useState } from 'react';
import '../css/Page3.css'; 
import { Link } from 'react-router-dom';

const Page3 = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCancel = () => {
    // 취소 버튼을 클릭했을 때 수행할 작업
  };

  const handleSave = () => {
    // 저장 버튼을 클릭했을 때 수행할 작업
  };
  return (
    <div className="qna-page">
        <nav className="qna-navigation">
          <sapn className="qna-nav-ALL">전체</sapn>
          <Link to="/Page2" className="qna-nav-item-Q">QnA게시판</Link>
          <Link to="/Page4" className="qna-nav-item">공지사항</Link>
          <Link to="/Page5" className="qna-nav-item">자주묻는질문</Link>
        </nav>
      <div className="qnaplus">
        <h2 className='aaaaaa'>QnA 게시글 작성</h2>
        <div className="form-group">
          <label>제목:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className="form-group">
          <label>이름:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div className="form-group1">
          <label>내용:</label>
          <textarea value={content} onChange={handleContentChange} />
        </div>
        <div className="button-group">
          <Link to="/Page2"><button className="cancel-button" onClick={handleCancel}>취소</button></Link>
          <button className="save-button" onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
};

export default Page3;
