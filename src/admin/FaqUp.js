import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../css/FaqUp.css';

const FaqUp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/getUserName')
      .then(response => response.json())
      .then(data => {
        setName(data.userName);
      })
      .catch(error => console.error('사용자 이름 가져오기 실패:', error));

    if (id) {
      fetch(`/api/faqs/${id}`)
        .then(response => response.json())
        .then(data => {
          setTitle(data.title);
          setContent(data.content);
        })
        .catch(error => console.error('FAQ 상세 정보 가져오기 실패:', error));
    }
  }, [id]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (content) => {
    setContent(content);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 작성해주세요.');
      return;
    }

    const postData = {
      title,
      content,
    };

    try {
      const response = await fetch(id ? `/api/faqs/${id}` : '/api/faqs', {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert(`FAQ가 성공적으로 ${id ? '수정' : '등록'}되었습니다.`);
        navigate('/Cmsfaq');
      } else {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        throw new Error(`FAQ를 ${id ? '수정' : '등록'}하지 못했습니다.`);
      }
    } catch (error) {
      console.error(`FAQ ${id ? '수정' : '등록'} 중 오류 발생:`, error);
    }
  };

  const handleCancel = () => {
    navigate('/Cmsfaq');
  };

  return (
    <div className="faqup-page">
      <div className="faqup-container">
        <h2>FAQ {id ? '수정' : '등록'}</h2>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력하세요."
          />
        </div>
        <div className="button-group">
          <button className="button" onClick={handleCancel}>취소</button>
          <button className="button primary" onClick={handleSave}>{id ? '수정' : '등록'}</button>
        </div>
      </div>
    </div>
  );
};

export default FaqUp;
