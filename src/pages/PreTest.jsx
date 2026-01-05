import { useState } from "react";
import Quiz from "../components/Quiz";
import { getQuestions } from "../data/questions";

export default function PreTest({ setStage }) {
  const questions = getQuestions();

  const stored = localStorage.getItem("preQuestions");

  const selected = stored
    ? JSON.parse(stored)
    : [...questions].sort(() => 0.5 - Math.random()).slice(0, 3);

  localStorage.setItem("preQuestions", JSON.stringify(selected));

  const [score, setScore] = useState(null);

  const submit = (result) => {
    localStorage.setItem("preScore", result);
    setScore(result); // show popup
  };

  const proceedToVideo = () => {
    localStorage.setItem("stage", "video");
    setStage("video");
  };

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="card p-6">
        <h1 className="text-2xl font-semibold mb-2">
          Pre-Test Assessment
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          This assessment helps evaluate your current understanding.
        </p>

        <Quiz questions={selected} onSubmit={submit} />
      </div>

      {/* Score Popup */}
      {score !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="card p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-2">
              Quiz Submitted!
            </h2>

            <p className="text-gray-700 mb-4">
              Your Score: <strong>{score} / {selected.length}</strong>
            </p>

            <button
              onClick={proceedToVideo}
              className="btn-primary w-full"
            >
              Continue to Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
