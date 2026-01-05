import { useState } from "react";

export default function Quiz({ questions, onSubmit, readOnly = false }) {
  const [answers, setAnswers] = useState({});

  const handleChange = (qId, index) => {
    if (readOnly) return;
    setAnswers({ ...answers, [qId]: index });
  };

  const allAnswered = questions.every(
    (q) => answers[q.id] !== undefined
  );

  const submitQuiz = () => {
    if (readOnly) return;

    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) score++;
    });
    onSubmit(score);
  };

  return (
    <div className="space-y-6">
      {questions.map((q) => (
        <div key={q.id} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">{q.q}</h3>

          {q.options.map((opt, i) => (
            <label
              key={i}
              className={`block ${
                readOnly ? "text-gray-500" : ""
              }`}
            >
              <input
                type="radio"
                name={q.id}
                disabled={readOnly}
                onChange={() => handleChange(q.id, i)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={submitQuiz}
        disabled={readOnly || !allAnswered}
        className={`px-4 py-2 rounded text-white
          ${
            readOnly
              ? "bg-gray-400 cursor-not-allowed"
              : allAnswered
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }
        `}
      >
        {readOnly ? "Preview Mode" : "Submit"}
      </button>
    </div>
  );
}
