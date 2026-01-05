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
    <div className="max-w-md mx-auto fade-in">
      <div className="card p-6 text-center">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Assessment Completed
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          You have successfully completed the learning module.
        </p>

        {/* Scores */}
        <div className="space-y-2 mb-8">
          <p className="text-gray-700">
            <span className="font-medium">Pre-Test Score:</span>{" "}
            {pre} / 3
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Post-Test Score:</span>{" "}
            {post} / 3
          </p>
        </div>

        {/* Action */}
        <button
          onClick={restartAssessment}
          className="btn-primary"
        >
          Restart Assessment
        </button>
      </div>
    </div>
  );
}
