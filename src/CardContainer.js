import React from 'react';
import './CardContainer.css';

const CardContainer = ({ title, link, comments }) => {
  const heading = title;
  return (
    <div className='Card-container'>
      <div className='Card-animated'>
        <a href={link} alt='url'>
          <i className='fas fa-external-link-alt'></i>
        </a>
        <span>
          <i className='fas fa-comments'></i>
        </span>
        <span>{comments}</span>
      </div>
      <div className='Card-title'>
        <h3>{heading}</h3>
      </div>
    </div>
  );
};

export default CardContainer;
