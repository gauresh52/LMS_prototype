import { useState } from "react";
import { getQuestions, saveQuestions } from "../data/questions";

const MAX_QUESTIONS = 15;

export default function AdminPanel({ onLogout }) {
  const [questions, setQuestions] = useState(getQuestions());
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    q: "",
    options: ["", "", ""],
    answer: 0,
  });

  /* ---------------- CRUD LOGIC ---------------- */

  const updateQuestionText = (id, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, q: value } : q))
    );
  };

  const updateOption = (qId, index, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? {
              ...q,
              options: q.options.map((opt, i) => (i === index ? value : opt)),
            }
          : q
      )
    );
  };

  const updateAnswer = (qId, index) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, answer: index } : q))
    );
  };

  const deleteQuestion = (id) => {
    if (!window.confirm("Delete this question?")) return;
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const addQuestion = () => {
    if (questions.length >= MAX_QUESTIONS) return;

    if (!newQuestion.q || newQuestion.options.some((o) => o.trim() === "")) {
      alert("Please fill all fields.");
      return;
    }

    const nextId = Math.max(...questions.map((q) => q.id), 0) + 1;

    setQuestions((prev) => [...prev, { id: nextId, ...newQuestion }]);

    setNewQuestion({
      q: "",
      options: ["", "", ""],
      answer: 0,
    });
  };

  const save = () => {
    saveQuestions(questions);
    localStorage.setItem("questionsVersion", Date.now().toString());
    alert("Questions saved successfully.");
  };

  /* ---------------- ADMIN VIEW ---------------- */

  return (
    <div className="card p-6 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Admin Question Manager
          <span className="text-sm text-gray-500 ml-2">
            ({questions.length}/{MAX_QUESTIONS})
          </span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button onClick={save} className="btn-primary w-full sm:w-auto">
            Save Changes
          </button>

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="btn-danger w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Existing Questions */}
      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="card p-4">
            <div className="flex justify-between items-start mb-3">
              <input
                value={q.q}
                onChange={(e) => updateQuestionText(q.id, e.target.value)}
                className="input mr-4"
              />

              <button
                onClick={() => deleteQuestion(q.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>

            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={q.answer === i}
                    onChange={() => updateAnswer(q.id, i)}
                  />
                  <input
                    value={opt}
                    onChange={(e) => updateOption(q.id, i, e.target.value)}
                    className="input"
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Question */}
      <div className="border-t mt-10 pt-6">
        <h3 className="text-lg font-semibold mb-4">Add New Question</h3>

        <input
          placeholder="Question text"
          value={newQuestion.q}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, q: e.target.value })
          }
          className="input mb-4"
          disabled={questions.length >= MAX_QUESTIONS}
        />

        <div className="space-y-3">
          {newQuestion.options.map((opt, i) => (
            <label key={i} className="flex items-center gap-2">
              <input
                type="radio"
                checked={newQuestion.answer === i}
                onChange={() =>
                  setNewQuestion({
                    ...newQuestion,
                    answer: i,
                  })
                }
                disabled={questions.length >= MAX_QUESTIONS}
              />
              <input
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => {
                  const opts = [...newQuestion.options];
                  opts[i] = e.target.value;
                  setNewQuestion({
                    ...newQuestion,
                    options: opts,
                  });
                }}
                className="input"
                disabled={questions.length >= MAX_QUESTIONS}
              />
            </label>
          ))}
        </div>

        <button
          onClick={addQuestion}
          disabled={questions.length >= MAX_QUESTIONS}
          className={`mt-5 ${
            questions.length >= MAX_QUESTIONS
              ? "btn-secondary cursor-not-allowed"
              : "btn-primary"
          }`}
        >
          Add Question
        </button>

        {questions.length >= MAX_QUESTIONS && (
          <p className="text-sm text-red-600 mt-2">
            Maximum of 15 questions reached.
          </p>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="card p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Confirm Logout</h3>

            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to logout from admin panel?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>

              <button onClick={onLogout} className="btn-danger">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
