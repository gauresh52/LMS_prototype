import Quiz from "../components/Quiz";
import { getQuestions } from "../data/questions";

export default function PostTest({ setStage }) {
  const questions = getQuestions();

  const stored = localStorage.getItem("postQuestions");

  const selected = stored
    ? JSON.parse(stored)
    : [...questions].sort(() => 0.5 - Math.random()).slice(0, 3);

  localStorage.setItem("postQuestions", JSON.stringify(selected));

  const submit = (score) => {
    localStorage.setItem("postScore", score);
    localStorage.setItem("stage", "score");
    setStage("score");
  };

  return (
    <div className="max-w-3xl mx-auto fade-in slide-up">
      <h1 className="text-2xl font-bold mb-4">Post-Test</h1>
      <Quiz questions={selected} onSubmit={submit} />
    </div>
  );
}
