export default function Score({ setStage }) {
  const pre = localStorage.getItem("preScore");
  const post = localStorage.getItem("postScore");

  const restartAssessment = () => {
    // Clear assessment-related data
    localStorage.removeItem("preScore");
    localStorage.removeItem("postScore");
    localStorage.removeItem("preQuestions");
    localStorage.removeItem("postQuestions");
    localStorage.removeItem("videoCompleted");

    // Restart workflow
    localStorage.setItem("stage", "pre");
    setStage("pre");
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto fade-in text-center">
      <h2 className="text-xl font-bold mb-4">Assessment Completed</h2>

      <p className="mb-2">Pre-Test Score: {pre}/3</p>
      <p className="mb-6">Post-Test Score: {post}/3</p>

      <button
        onClick={restartAssessment}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
      >
        Restart Assessment
      </button>
    </div>
  );
}
