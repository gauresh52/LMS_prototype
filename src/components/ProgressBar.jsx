const steps = ["Pre-Test", "Video", "Post-Test", "Score"];

export default function ProgressBar({ currentStage }) {
  const stageIndex = {
    pre: 0,
    video: 1,
    post: 2,
    score: 3,
  }[currentStage];

  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex-1 text-center">
          <div
            className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
              ${index <= stageIndex ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"}
            `}
          >
            {index + 1}
          </div>
          <p className="text-sm mt-2">{step}</p>
        </div>
      ))}
    </div>
  );
}
