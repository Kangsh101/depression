import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../css/NoticeUp.css';

const NoticeUp = () => {
  const { id } = useParams(); // id 파라미터 가져오기
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const quillRef = useRef(null);

  useEffect(() => {
    fetch('/api/getUserName')
      .then(response => response.json())
      .then(data => setName(data.userName))
      .catch(error => console.error('사용자 이름 가져오기 실패:', error));
    if (id) {
      fetch(`/api/notices/${id}`)
        .then(response => response.json())
        .then(data => {
          setTitle(data.title);
          setContent(data.content);
        })
        .catch(error => console.error('공지사항 정보 가져오기 실패:', error));
    }
  }, [id]);

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('서버에서 이미지를 처리할 수 없습니다.');
          }

          const data = await response.json();
          const range = quillRef.current.getEditor().getSelection(true);
          quillRef.current.getEditor().insertEmbed(range.index, 'image', data.imageUrl);
        } catch (error) {
          console.error('이미지 업로드 중 오류 발생:', error);
        }
      }
    };
  }, []);

  const modules = React.useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        'image': imageHandler
      }
    },
  }), [imageHandler]);

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
      const response = await fetch(`/api/notices${id ? `/${id}` : ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert('공지사항이 성공적으로 저장되었습니다.');
        navigate('/Cms');
      } else {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        throw new Error('공지사항을 저장하지 못했습니다.');
      }
    } catch (error) {
      console.error('공지사항 저장 중 오류 발생:', error);
    }
  };

  const handleCancel = () => {
    navigate('/Cms');
  };

  return (
    <div className="noticeup-page">
      <div className="noticeup-container">
        <h2>공지사항 {id ? '수정' : '등록'}</h2>
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
            ref={quillRef}
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력하세요."
            modules={modules}
          />
        </div>
        <div className="button-group">
          <button className="button" onClick={handleCancel}>취소</button>
          <button className="button primary" onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
};

export default NoticeUp;
