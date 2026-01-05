import Quiz from "../components/Quiz";
import { getQuestions } from "../data/questions";

export default function PreTest({ setStage }) {
  const questions = getQuestions();

  const stored = localStorage.getItem("preQuestions");

  const selected = stored
    ? JSON.parse(stored)
    : [...questions].sort(() => 0.5 - Math.random()).slice(0, 3);

  localStorage.setItem("preQuestions", JSON.stringify(selected));

  const submit = (score) => {
    localStorage.setItem("preScore", score);
    localStorage.setItem("stage", "video");
    setStage("video");
  };

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="card p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Pre-Test Assessment
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Please answer the following questions before proceeding to the video.
          </p>
        </div>

        {/* Quiz */}
        <Quiz questions={selected} onSubmit={submit} />
      </div>
    </div>
  );
}
