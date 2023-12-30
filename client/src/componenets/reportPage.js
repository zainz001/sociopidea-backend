import React, { useState } from 'react';
//import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import makeStyles from './ReportFormStyles';

const questions = [
  {
    id: 1,
    question: 'What is the capital of France?',
    answers: ['London', 'Paris', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    answers: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  {
    id: 3,
    question: 'What is the largest mammal in the world?',
    answers: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctAnswer: 'Blue Whale',
  },
  {
    id: 4,
    question: 'In which year did the Titanic sink?',
    answers: ['1905', '1912', '1920', '1931'],
    correctAnswer: '1912',
  },
  {
    id: 5,
    question: 'Who wrote "Romeo and Juliet"?',
    answers: ['Charles Dickens', 'Jane Austen', 'William Shakespeare', 'Mark Twain'],
    correctAnswer: 'William Shakespeare',
  },
];

const ReportForm = () => {
  const classes = makeStyles();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState('');

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check answers for each question
    const result = questions.map((q) => {
      const selectedAnswer = selectedAnswers[q.id];
      return {
        id: q.id,
        isCorrect: selectedAnswer === q.correctAnswer,
      };
    });

    // Provide feedback
    const correctCount = result.filter((r) => r.isCorrect).length;
    setFeedback(`You got ${correctCount} out of ${questions.length} correct!`);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.quizTitle}>Quiz</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        {questions.map((q) => (
          <div key={q.id} className={classes.questionContainer}>
            <p className={classes.question}>{q.question}</p>
            <select
              value={selectedAnswers[q.id] || ''}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              className={classes.dropdown}
            >
              <option value="" disabled>
                Select an answer
              </option>
              {q.answers.map((answer) => (
                <option key={answer} value={answer}>
                  {answer}
                </option>
              ))}
            </select>
          </div>
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Submit
        </Button>
        {feedback && <p className={classes.feedback}>{feedback}</p>}
      </form>
    </div>
  );
};
export default ReportForm;
