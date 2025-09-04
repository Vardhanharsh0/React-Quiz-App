import { useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard';
import Results from './components/Results';
import './App.css';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  // 1. New state for the timer
  const [timer, setTimer] = useState(30);

  // Function to fetch questions from the API
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    setQuizFinished(false);
    setUserAnswers([]);
    setScore(0);
    setCurrentQuestionIndex(0);

    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple&category=18');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      
      const formattedQuestions = data.results.map((question) => {
        const incorrectAnswers = question.incorrect_answers;
        const correctAnswer = question.correct_answer;
        const options = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);
        return { ...question, options };
      });

      setQuestions(formattedQuestions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  // 2. New useEffect hook for the timer logic
  useEffect(() => {
    if (quizFinished || loading) return; // Stop the timer if quiz is finished or loading

    // Reset the timer to 30 for the new question
    setTimer(30);

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(intervalId);
          // Time's up: move to the next question, mark as incorrect
          handleAnswerSelect(null); // Pass null for no answer
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Cleanup: clear the interval when the question changes or component unmounts
    return () => clearInterval(intervalId);
  }, [currentQuestionIndex, loading, quizFinished]); // Reruns when the question changes

  // Handle user's answer selection
  const handleAnswerSelect = (answer) => {
    const isCorrect = answer !== null && questions[currentQuestionIndex].correct_answer === answer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: questions[currentQuestionIndex].question,
        selectedAnswer: answer, // Can be null if time ran out
        correctAnswer: questions[currentQuestionIndex].correct_answer,
        isCorrect,
      },
    ]);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizFinished(true);
    }
  };

  // Restart the quiz
  const handleRestart = () => {
    fetchQuestions();
  };

  if (loading) return <div className="loading">Loading questions... 🤔</div>;
  if (error) return <div className="error">Error: {error} 😟</div>;

  return (
    <div className="app-container">
      <h1>Quiz App</h1>
      {quizFinished ? (
        <Results
          score={score}
          totalQuestions={questions.length}
          userAnswers={userAnswers}
          onRestart={handleRestart}
        />
      ) : (
        questions.length > 0 && (
          <>
            <p className="progress-indicator">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            {/* 3. Pass timer as a prop */}
            <QuestionCard
              questionData={questions[currentQuestionIndex]}
              onAnswerSelect={handleAnswerSelect}
              timer={timer} 
            />
            <p className="score-display">Current Score: {score}</p>
          </>
        )
      )}
    </div>
  );
};

export default App;
