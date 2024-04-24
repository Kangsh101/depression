import React from 'react';
import '../css/Contents.css';

const ContentPage = () => {
  return (
    <div className='content-main'>
    <div className='content-container'>
      <div>
        <div className="content-layout">
          <h2 className='content-lg'>프로그램 콘텐츠</h2>

          <div className="row">
            <div className="content-box col-lg-2">
              <div className="video-description-wrapper">
                <div className="video-box">
                  <iframe 
                    
                    src="https://www.youtube.com/embed/e_UYhqrL8ic" 
                    title="YouTube" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                  ></iframe>
                </div>
                <div className="description-box">
                  <a href='https://www.youtube.com/embed/e_UYhqrL8ic'>Understanding the Role of Genetics in Cardiovascular Disease
                  </a>
                  <p>Explore the intricate relationship between genetic factors and cardiovascular health. This video provides insights into the latest research findings and how genetic predispositions contribute to the development of heart conditions. Gain a deeper understanding of the molecular mechanisms underlying cardiovascular diseases and potential implications for personalized treatment strategies</p>
                </div>
              </div>
              
              <div className="video-description-wrapper">
                <div className="video-box">
                  <iframe  
                    src="https://www.youtube.com/embed/NjgBnx1jVIU" 
                    title="YouTube" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                  ></iframe>
                </div>
                <div className="description-box">
                  <a href='https://www.youtube.com/embed/NjgBnx1jVIU'>Unraveling the Mysteries of Neurodegenerative Disorders</a>
                  <p>Delve into the complexities of neurodegenerative diseases, such as Alzheimer's and Parkinson's. Discover the underlying mechanisms driving these conditions and explore emerging therapies aimed at slowing disease progression. Gain valuable insights into the future of neurology research and potential breakthroughs in treatment.</p>
                </div>
              </div>
              
              <div className="video-description-wrapper">
                <div className="video-box">
                  <iframe 
                    src="https://www.youtube.com/embed/qqBUw9BR-Us" 
                    title="YouTube" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                  ></iframe>
                </div>
                <div className="description-box">
                  <a href='https://www.youtube.com/embed/qqBUw9BR-Us'>Exploring Innovations in Cancer Immunotherapy</a>
                  <p>Discover the cutting-edge advancements in cancer treatment through immunotherapy. This video explores how harnessing the power of the immune system can revolutionize cancer care. Learn about novel immunotherapeutic approaches, their mechanisms of action, and their potential to enhance patient outcomes and survival rates.</p>
                </div>
              </div>
              <div className="video-description-wrapper">
                <div className="video-box">
                  <iframe 
                    src="https://www.youtube.com/embed/qivFeoW6oMQ" 
                    title="YouTube" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                  ></iframe>
                </div>
                <div className="description-box">
                  <a href='https://www.youtube.com/embed/qivFeoW6oMQ'>Navigating Mental Health Challenges in Today's Society</a>
                  <p>Navigate the complexities of mental health in the modern world. Explore the prevalence of mental illnesses, such as depression and anxiety, and the impact of societal factors on mental well-being. Gain insights into effective coping strategies, available resources, and the importance of destigmatizing mental health issues for improved community support and wellness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContentPage;
