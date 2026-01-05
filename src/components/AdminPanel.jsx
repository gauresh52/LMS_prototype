import { useState } from "react";
import { getQuestions, saveQuestions } from "../data/questions";

export default function AdminPanel() {
  const [questions, setQuestions] = useState(getQuestions());

  const updateQuestion = (id, value) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, q: value } : q
    );
    setQuestions(updated);
  };

  const updateOption = (qId, index, value) => {
    const updated = questions.map((q) => {
      if (q.id === qId) {
        const opts = [...q.options];
        opts[index] = value;
        return { ...q, options: opts };
      }
      return q;
    });
    setQuestions(updated);
  };

 
    const save = () => {
      saveQuestions(questions);

      // Invalidate previous student attempts
      localStorage.removeItem("preQuestions");
      localStorage.removeItem("postQuestions");
      localStorage.removeItem("preScore");
      localStorage.removeItem("postScore");
      localStorage.removeItem("videoCompleted");
      localStorage.removeItem("stage");

      alert("Questions saved and student attempts reset.");
    };

   
  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Question Editor</h2>

      {questions.map((q) => (
        <div key={q.id} className="border p-4 mb-4 rounded">
          <input
            value={q.q}
            onChange={(e) => updateQuestion(q.id, e.target.value)}
            className="w-full border p-2 mb-2 rounded"
          />
          {q.options.map((opt, i) => (
            <input
              key={i}
              value={opt}
              onChange={(e) => updateOption(q.id, i, e.target.value)}
              className="w-full border p-2 mb-1 rounded"
            />
          ))}
        </div>
      ))}

      <button
        onClick={save}
        className="bg-blue-700 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
