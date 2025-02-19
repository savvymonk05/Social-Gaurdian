import React, { useState } from "react";

function Cards({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
  onNext,
  onPrevious,
  onSubmit,
}) {
  const [answer, setAnswer] = useState("");

  // Handle input change
  const handleInputChange = (value) => {
    setAnswer(value);
    onAnswer(value); // Pass the answer to the parent component
  };

  // Render input based on question type
  const renderInput = () => {
    switch (question.type) {
      case "yes-no":
        return (
          <div className="flex gap-4">
            <button
              onClick={() => handleInputChange("Yes")}
              className={`px-6 py-2 rounded-lg ${
                answer === "Yes" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleInputChange("No")}
              className={`px-6 py-2 rounded-lg ${
                answer === "No" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              No
            </button>
          </div>
        );
      case "text":
        return (
          <input
            type="text"
            value={answer}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case "multiple-option":
        return (
          <div className="flex flex-col gap-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={answer === option}
                  onChange={() => handleInputChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[808px] min-h-[444px] bg-[#F2F2FD] rounded-tl-[2px] rounded-bl-[2px] shadow-lg p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">{question.text}</h2>
          {renderInput()}
        </div>
        <div className="flex justify-between mt-6">
          {currentQuestionIndex > 0 && (
            <button
              onClick={onPrevious}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              onClick={onNext}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cards;