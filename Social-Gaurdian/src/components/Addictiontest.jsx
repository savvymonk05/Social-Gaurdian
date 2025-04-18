import React, { useState } from "react";
import Cards from "../components/Questioncard";
import Footer from "../components/Footer";

function Addictiontest() {
  const questions = [
    { id: 1, text: "Q1. How much time do you spend on Instagram?", type: "multiple-option", options: ["0 - 1 Hrs", "1 - 2 Hrs", "2 - 3 Hrs", "3 - 4 Hrs", "4 - 5 Hrs", "5 - 6 Hrs", "6 - 7 Hrs"] },
    { id: 2, text: "Q2. How often do you open Instagram in a day? (Enter only a number)", type: "text" },
    { id: 3, text: "Q3. Have you experienced FOMO? On a scale of 1 to 10, how intense was it?", type: "multiple-option", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] },
    { id: 4, text: "Q4. Has using Instagram disrupted your sleep cycle?", type: "yes-no" },
    { id: 5, text: "Q5. Have you tried to reduce your Instagram usage and found it difficult?", type: "yes-no" },
    { id: 6, text: "Q6. Do you use Instagram as an escape mechanism?", type: "yes-no" },
    { id: 7, text: "Q7. Has using Instagram ever interfered with your work, studies, or responsibilities?", type: "yes-no" },
    { id: 8, text: "Q8. Do you stay up late at night for using Instagram?", type: "yes-no" },
    { id: 9, text: "Q9. Do you feel anxious when you're not using Instagram?", type: "multiple-option", options: ["1", "2", "3", "4", "5"] },
    { id: 10, text: "Q10. Has using Instagram disrupted your daily routine?", type: "yes-no" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState(Array(10).fill(null));
  const [result, setResult] = useState(null);

  const handleAnswer = (answer) => {
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      let numericAnswer;

      if (answer === "Yes") numericAnswer = 1;
      else if (answer === "No") numericAnswer = 0;
      else if (/^\d+$/.test(answer)) numericAnswer = parseInt(answer);
      else {
        const match = answer.match(/^(\d+) - (\d+) Hrs$/);
        numericAnswer = match ? (parseInt(match[1]) + parseInt(match[2])) / 2 : parseInt(answer);
      }

      newResponses[currentQuestionIndex] = numericAnswer;
      console.log("Updated Responses Array:", newResponses);
      return newResponses;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting responses:", responses);
    try {
      const response = await fetch("https://predicting-instagram-addiction.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: responses }),
      });
      const data = await response.json();
      console.log("Received Response:", data);
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Error occurred while predicting" });
    }
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
      {result && (
        <div className="text-center mt-4">
          <p>Status: {result.addiction_status === 1 ? "Addicted" : "Not Addicted"}</p>
          <p>Probability: {result.probability ? (result.probability * 100).toFixed(2) + "% chance of addiction" : "N/A"}</p>
          <p>Level: {result.addiction_level !== undefined ? ["Low", "Moderate", "High", "Severe"][result.addiction_level] : "Unknown"}</p>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Addictiontest;
