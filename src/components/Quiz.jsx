import { useState } from "react";

export default function Quiz({ questions, onSubmit }) {
  const [answers, setAnswers] = useState({});

  const handleChange = (qId, index) => {
    setAnswers({ ...answers, [qId]: index });
  };

  const allAnswered = questions.every(
    (q) => answers[q.id] !== undefined
  );

  const submitQuiz = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) score++;
    });
    onSubmit(score);
  };

  return (
    <div className="space-y-6">
      {questions.map((q, idx) => (
        <div key={q.id} className="card p-5">
          <h3 className="font-medium text-gray-800 mb-3">
            {idx + 1}. {q.q}
          </h3>

          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <label
                key={i}
                className="flex items-center gap-3 text-gray-700 cursor-pointer"
              >
                <input
                  type="radio"
                  name={q.id}
                  onChange={() => handleChange(q.id, i)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="pt-4">
        <button
          onClick={submitQuiz}
          disabled={!allAnswered}
          className={`${
            allAnswered
              ? "btn-primary"
              : "btn-secondary cursor-not-allowed"
          }`}
        >
          Submit Assessment
        </button>
      </div>
    </div>
  );
}
