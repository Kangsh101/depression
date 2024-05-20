import React, { useState, useEffect } from 'react';
import '../css/FAQ.css';

const FAQ = () => {
  const [faqItems, setFaqItems] = useState([]);
  const [answersVisible, setAnswersVisible] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/faqs')
      .then(response => response.json())
      .then(data => {
        setFaqItems(data);
        setAnswersVisible(new Array(data.length).fill(false));
        setLoading(false);
      })
      .catch(error => {
        console.error('FAQ 목록 가져오기 실패:', error);
        setLoading(false);
      });
  }, []);

  const toggleAnswer = (index) => {
    const newAnswersVisible = [...answersVisible];
    newAnswersVisible[index] = !newAnswersVisible[index];
    setAnswersVisible(newAnswersVisible);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='faq-page'>
      <div className="faq-content">
        {faqItems.map((item, index) => (
          <div key={item.id} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              Q 질문 : {item.title}
            </div>
            <div className="faq-answer">
              {answersVisible[index] ? (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: item.content.substring(0, 40) }} />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className='bottom'></div>
    </div>
  );
};

export default FAQ;
