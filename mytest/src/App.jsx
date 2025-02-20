import React, { useState, useEffect } from "react";


const questions = [
  { question: "User interface developed with React is made of small and isolated pieces of code called ___.?", options: ["Hook", "Component", "Function", "Snippet"], answer: "Component" },
  { question: "What are the two main types of components in React.js?", options: ["Class-based and functional", "Functional and stateful", "UI and container", "Presentational and container"], answer: "Class-based and functional" },
  { question: "A React component takes in parameters called ___?", options: ["Attributes", "Events", "Props", "Children"], answer: "Props" },
  { question: "To write HTML in React we make use of ___?", options: ["React.createElement()", "HTTP", "XML", "JSX"], answer: "JSX" },
  { question: "JSX Stands for ___?", options: ["JavaScript Extension", "JavaScript Extreme", "JavaScript XML", "JavaScript XScript"], answer: "JavaScript XML" },
  { question: "React DOM uses ___ case property naming convention?", options: ["Camel", "Pascal", "Snake", "Kebab"], answer: "Camel" },
  { question: "Which method is used to update state in a React class component?", options: ["updateState()", "setState()", "update()", "modifyState()"], answer: "setState()" },
  { question: "What hook is used to handle side effects in functional components?", options: ["useEffect", "useState", "useReducer", "useMemo"], answer: "useEffect" },
  { question: "Which hook is used to add state to a functional component?", options: ["useState", "useEffect", "useReducer", "useContext"], answer: "useState" },
  { question: "Which React function renders components to the DOM?", options: ["ReactDOM.render()", "React.render()", "renderComponent()", "ReactDOM.createRoot()"], answer: "ReactDOM.createRoot()" },
  { question: "Which lifecycle method is invoked immediately after a component is inserted into the DOM?", options: ["componentDidMount", "componentWillMount", "componentDidUpdate", "componentWillUpdate"], answer: "componentDidMount" },
  { question: "What is the correct way to pass data from parent to child component?", options: ["Using state", "Using props", "Using context", "Using Redux"], answer: "Using props" },
  { question: "Which React feature allows state to be managed globally?", options: ["Props", "Hooks", "Redux", "React Router"], answer: "Redux" },
  { question: "What is the purpose of React Fragments?", options: ["To return multiple elements without adding extra DOM nodes", "To improve performance", "To wrap components inside another div", "To manage state"], answer: "To return multiple elements without adding extra DOM nodes" },
  { question: "Which hook allows you to cache the result of a function to improve performance?", options: ["useState", "useEffect", "useMemo", "useRef"], answer: "useMemo" }
];



const QuizApp = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [overallTimeLeft, setOverallTimeLeft] = useState(600);
  const [timeout, setTimeoutState] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setTimeoutState(true);
      setShowFeedback(true);
      setFeedback(`Time's up! Correct answer: ${questions[currentQuestion].answer}`);
    }
  }, [timeLeft, quizStarted]);

  useEffect(() => {
    if (quizStarted && overallTimeLeft > 0) {
      const overallTimer = setTimeout(() => setOverallTimeLeft(overallTimeLeft - 1), 1000);
      return () => clearTimeout(overallTimer);
    }
  }, [overallTimeLeft, quizStarted]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerClick = (option) => {
    if (selectedAnswers[currentQuestion] === null) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[currentQuestion] = option;
      setSelectedAnswers(updatedAnswers);
      if (option === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setTimeoutState(false);
      setTimeLeft(15);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(null));
    setTimeLeft(15);
    setOverallTimeLeft(600);
    setTimeoutState(false);
    setShowScore(false);
    setScore(0);
  };

  return (
    
    <div style={{ textAlign: "center", padding: "20px", width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      {!quizStarted ? (
        <div>
          <h1>START THE REACT QUIZ CHALLANGE </h1>
          <button 
            onClick={handleStartQuiz} 
            style={{ 
              marginTop: "20px", 
              padding: "15px", 
              borderRadius: "20px", 
              border: "2px solid green", 
              backgroundColor: "green", 
              color: "white", 
              cursor: "pointer",
              fontWeight: "bold",
              fontSize:"20px",
              width:"30%"
            }}
          >
            Start
          </button>
        </div>
      ) : showScore ? (
        <div>
          {((score / questions.length) * 100) > 90 ? (
            <h1>Congratulations! You scored {(score / questions.length) * 100}%</h1>
          ) : (
            <h1>Congratulations! You successfully completed the React Quiz Challenge</h1>
          )}
          <p>Correct Answers: {score}</p>
          <p>Incorrect Answers: {questions.length - score - selectedAnswers.filter(ans => ans === null).length}</p>
          <p>Not Answered: {selectedAnswers.filter(ans => ans === null).length}</p>
          <button 
            onClick={handleRestart} 
            style={{ padding: "15px", cursor: "pointer", border: "2px solid green", backgroundColor: "green", color: "white", borderRadius: "20px", fontWeight: "bold", transition: "background-color 0.3s ease, color 0.3s ease" }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "darkgreen"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "green"; }}
          >
            Restart Quiz
          </button>
        </div>
      ) : timeout ? (
        <div style={{ 
          width: "50%", 
          height: "30%", 
          padding: "15px", 
          backgroundColor: "white", 
          border: "2px solid red", 
          borderRadius: "20px", 
          color: "red", 
          fontSize: "20px", 
          fontWeight: "bold", 
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <p>{feedback}</p>
          <button 
            onClick={handleNext}
            style={{
              padding: "15px", 
              cursor: "pointer", 
              border: "2px solid green", 
              backgroundColor: "green", 
              color: "white", 
              borderRadius: "20px", 
              fontWeight: "bold", 
              width:"40%",
              transition: "background-color 0.3s ease, color 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "darkgreen";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "green";
            }}>
            Next
          </button>
        </div>
      ) : (
        <>
          <h2>{questions[currentQuestion].question}</h2>
          <ul style={{ listStyleType: "none", padding: 0, width: "50%" }}>
            {questions[currentQuestion].options.map((option) => {
              let borderColor = "gray", textColor = "gray";
              if (selectedAnswers[currentQuestion] !== null) {
                if (option === questions[currentQuestion].answer) {
                  borderColor = "green";
                  textColor = "green";
                } else if (option === selectedAnswers[currentQuestion]) {
                  borderColor = "red";
                  textColor = "RED";
                }
              }
              return (
                <li key={option} style={{ margin: "10px 0" }}>
                  <button 
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswers[currentQuestion] !== null}
                    style={{ 
                      padding: "15px", 
                      cursor: "pointer", 
                      width: "100%", 
                      backgroundColor: "white", 
                      border: `2px solid ${borderColor}`,
                      color: textColor,
                      borderRadius: "20px",
                      textAlign: "left",
                      fontWeight: "bold",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "lightgray";
                      e.target.style.color = "black";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white";
                      e.target.style.color = textColor;
                    }}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>

          <div style={{ textAlign: "right", marginTop: "10px", width: "50%" }}>
            <p>Time left: {timeLeft}s</p>
            <p>Overall time left: {Math.floor(overallTimeLeft / 60)}:{String(overallTimeLeft % 60).padStart(2, "0")}</p>
          </div>
            
          <div style={{ display: "flex", justifyContent: "space-between", width: "50%", marginTop: "20px" }}>
            {currentQuestion > 0 && (
              <button 
                onClick={() => setCurrentQuestion(currentQuestion - 1)} 
                style={{ 
                  padding: "15px", 
                  width: "45%", 
                  borderRadius: "20px", 
                  border: "2px solid gray", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  backgroundColor: "white"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "lightgray";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                }}
              >
                Previous
              </button>
            )}
            <button 
            onClick={handleNext}
            style={{
              padding: "15px", 
              cursor: "pointer", 
              border: "2px solid green", 
              backgroundColor: "green", 
              width: currentQuestion > 0 ? "45%" : "100%",
              color: "white", 
              borderRadius: "20px", 
              fontWeight: "bold", 
              transition: "background-color 0.3s ease, color 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "darkgreen";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "green";
            }}
            >
              {currentQuestion < questions.length - 1 ? "Submit" : "Finish"}
            </button>
          </div>
        </> 
      )}
    </div>
  );
};

export default QuizApp;
