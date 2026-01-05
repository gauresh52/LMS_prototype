import { useState } from "react";

export default function Quiz({ questions, onSubmit }) {
  const [answers, setAnswers] = useState({});

  const handleChange = (qId, index) => {
    setAnswers({ ...answers, [qId]: index });
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const submitQuiz = () => {
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
            <label key={i} className="block">
              <input
                type="radio"
                name={q.id}
                onChange={() => handleChange(q.id, i)}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={submitQuiz}
        disabled={!allAnswered}
        className={`px-4 py-2 rounded text-white
                    ${
                      allAnswered ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                    }
  `              }
      >
        Submit
      </button>
    </div>
  );
}
