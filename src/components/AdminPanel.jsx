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

  /*  CRUD LOGIC  */

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
              options: q.options.map((opt, i) =>
                i === index ? value : opt
              ),
            }
          : q
      )
    );
  };

  const updateAnswer = (qId, index) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId ? { ...q, answer: index } : q
      )
    );
  };

  const deleteQuestion = (id) => {
    if (!window.confirm("Delete this question?")) return;
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const addQuestion = () => {
    if (questions.length >= MAX_QUESTIONS) return;

    if (
      !newQuestion.q ||
      newQuestion.options.some((o) => o.trim() === "")
    ) {
      alert("Please fill all fields.");
      return;
    }

    const nextId =
      Math.max(...questions.map((q) => q.id), 0) + 1;

    setQuestions((prev) => [
      ...prev,
      { id: nextId, ...newQuestion },
    ]);

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

  /*  ADMIN VIEW  */

  return (
    <div className="bg-white p-6 rounded shadow max-w-5xl mx-auto fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Admin Question Manager ({questions.length}/{MAX_QUESTIONS})
        </h2>

        <div className="flex gap-3">
          <button
            onClick={save}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded"
          >
            Save Changes
          </button>

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Existing Questions */}
      {questions.map((q) => (
        <div key={q.id} className="border rounded p-4 mb-4">
          <div className="flex justify-between items-start mb-2">
            <input
              value={q.q}
              onChange={(e) =>
                updateQuestionText(q.id, e.target.value)
              }
              className="w-full border rounded p-2 mr-4"
            />

            <button
              onClick={() => deleteQuestion(q.id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </div>

          {q.options.map((opt, i) => (
            <div key={i} className="flex items-center mb-1">
              <input
                type="radio"
                checked={q.answer === i}
                onChange={() => updateAnswer(q.id, i)}
                className="mr-2"
              />
              <input
                value={opt}
                onChange={(e) =>
                  updateOption(q.id, i, e.target.value)
                }
                className="w-full border rounded p-1"
              />
            </div>
          ))}
        </div>
      ))}

      {/* Add New Question */}
      <div className="border-t pt-6 mt-6">
        <h3 className="font-semibold mb-3">
          Add New Question
        </h3>

        <input
          placeholder="Question text"
          value={newQuestion.q}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, q: e.target.value })
          }
          className="w-full border rounded p-2 mb-3"
          disabled={questions.length >= MAX_QUESTIONS}
        />

        {newQuestion.options.map((opt, i) => (
          <div key={i} className="flex items-center mb-2">
            <input
              type="radio"
              checked={newQuestion.answer === i}
              onChange={() =>
                setNewQuestion({ ...newQuestion, answer: i })
              }
              className="mr-2"
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
              className="w-full border rounded p-1"
              disabled={questions.length >= MAX_QUESTIONS}
            />
          </div>
        ))}

        <button
          onClick={addQuestion}
          disabled={questions.length >= MAX_QUESTIONS}
          className={`mt-3 px-4 py-1.5 rounded text-white ${
            questions.length >= MAX_QUESTIONS
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-3">
              Confirm Logout
            </h3>

            <p className="text-sm mb-5">
              Are you sure you want to logout from admin panel?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-1.5 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={onLogout}
                className="px-4 py-1.5 bg-red-600 text-white rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
