import React, { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const buttonStyle = {
  backgroundColor: "#7950f2",
  color: "white",
};

export default function Steps() {
  const [step, setStep] = useState(1);
  const [close, setClose] = useState(false);

  const handlePrevious = () => {
    if (step === 1) return;

    setStep((prevState) => prevState - 1);
  };

  const handleNext = () => {
    if (step === 3) return;

    setStep((prevState) => prevState + 1);
  };

  return (
    <div>
      <button className="close" onClick={() => setClose(!close)}>
        &times;
      </button>
      {!close && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 && "active"}>1</div>
            <div className={step >= 2 && "active"}>2</div>
            <div className={step >= 3 && "active"}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button style={buttonStyle} onClick={handlePrevious}>
              Previous
            </button>
            <button style={buttonStyle} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
