import { useState } from "react";

export default function Score({ setStage }) {
  const pre = localStorage.getItem("preScore");
  const post = localStorage.getItem("postScore");

  const [showConfirm, setShowConfirm] = useState(false);

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

        {/* Restart Button */}
        <button
          onClick={() => setShowConfirm(true)}
          className="btn-primary"
        >
          Restart Assessment
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="card p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-2">
              Restart Assessment?
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              This will clear your current scores and restart the assessment from the beginning.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>

              <button
                onClick={restartAssessment}
                className="btn-danger"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
