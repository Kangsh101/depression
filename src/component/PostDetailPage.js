import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetailPage = ({ posts }) => {
  const { id } = useParams();
  console.log('Post ID:', id); 
  const post = posts.find(post => post.id === parseInt(id));

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>작성자: {post.author}</p>
      <p>등록일: {post.date}</p>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetailPage;
