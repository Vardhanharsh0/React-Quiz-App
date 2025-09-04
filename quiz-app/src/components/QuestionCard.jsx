import React from 'react';

// A utility to decode HTML entities (e.g., &quot; becomes ")
const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const QuestionCard = ({ questionData, onAnswerSelect, timer }) => {
  const { question, options } = questionData;

  return (
    <div className="question-card">
      {/* This is the new element to display the timer */}
      <div className="timer">
        Time Left: <span>{timer}s</span>
      </div>
      
      <h2 dangerouslySetInnerHTML={{ __html: question }} />
      
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className="option-button"
            onClick={() => onAnswerSelect(option)}
            dangerouslySetInnerHTML={{ __html: option }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;