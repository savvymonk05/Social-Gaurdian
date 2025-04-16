import React, { useState } from "react";
import Cards from "../components/Questioncard";
import Footer from "../components/Footer";

function Addictiontest() {
  // Questions and their input types
  const questions = [
    {
      id: 1,
      text: "Q1. How much time do you spend on Instagram?",
      type: "multiple-option",
      options: [
        "0 - 1 Hrs",
        "1 - 2 Hrs",
        "2 - 3 Hrs",
        "3 - 4 Hrs",
        "4 - 5 Hrs",
        "5 - 6 Hrs",
        "6 - 7 Hrs",
      ],
    },
    {
      id: 2,
      text: "Q2. How often do you open Instagram in a day? (Enter only a number)",
      type: "text",
    },
    {
      id: 3,
      text: "Q3 .Have you experienced FOMO (Fear of Missing Out)? On a scale of 1 to 10, how intense was it?",
      type: "multiple-option",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      id: 4,
      text: "Q4. Has using Instagram disrupted your sleep cycle?",
      type: "yes-no",
    },
    {
      id: 5,
      text: "Q5. Have you tried to reduce your Instagram usage and found it difficult?",
      type: "yes-no",
    },
    {
      id: 6,
      text: "Q6. Do you use Instagram as an escape mechanism?",
      type: "yes-no",
    },
    {
      id: 7,
      text: "Q7. Has using Instagram ever interfered with your work, studies, or responsibilities?",
      type: "yes-no",
    },
    {
      id: 8,
      text: "Q8. Do you stay up late at night for using Instagram?",
      type: "yes-no",
    },
    {
      id: 9,
      text: "Q9. Do you feel anxious when you're not using Instagram?",
      type: "multiple-option",
      options: ["1", "2", "3", "4", "5"],
    },
    {
      id: 10,
      text: "Q10. Has using Instagram disrupted your daily routine?",
      type: "yes-no",
    },
  ];

  // State to track the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State to store user responses
  const [responses, setResponses] = useState({});

  // Function to handle the user's answer
  const handleAnswer = (answer) => {
    setResponses({
      ...responses,
      [currentQuestionIndex]: answer, // Store the answer with the question index as the key
    });
  };

  // Function to move to the next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to move to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    alert("Test completed! Responses: " + JSON.stringify(responses));
    // You can now send the responses to your backend or model
  };

  return (
    <div>
      <h1 className="text-center relative top-[50px] font-archivo text-4xl leading-[48px] font-bold text-neutral-900">
        GIVE THE ADDICTION TEST BY ANSWERING THE BELOW QUESTIONS!!
      </h1>
      <Cards
        question={questions[currentQuestionIndex]}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
}

export default Addictiontest;