const steps = ["Pre-Test", "Video", "Post-Test", "Score"];

export default function ProgressBar({ currentStage }) {
  const stageIndex = {
    pre: 0,
    video: 1,
    post: 2,
    score: 3,
  }[currentStage];

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex-1 flex flex-col items-center">
            {/* Circle */}
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold
                ${
                  index <= stageIndex
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }
              `}
            >
              {index + 1}
            </div>

            {/* Label */}
            <p
              className={`mt-2 text-xs font-medium
                ${
                  index <= stageIndex
                    ? "text-blue-600"
                    : "text-gray-500"
                }
              `}
            >
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Connector line */}
      <div className="relative mt-4">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-300" />
        <div
          className="absolute top-1/2 left-0 h-[2px] bg-blue-600 transition-all"
          style={{
            width: `${(stageIndex / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
