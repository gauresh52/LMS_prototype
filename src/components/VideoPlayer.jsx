import { useRef, useState, useEffect } from "react";

export default function VideoPlayer({ onEnd }) {
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Reload safety
  useEffect(() => {
    const isCompleted = localStorage.getItem("videoCompleted") === "true";
    if (isCompleted) {
      setCompleted(true);
    }
  }, []);

  // Format seconds → MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const replayToggle = () => {
    if (!videoRef.current) return;

    if (completed && videoRef.current.currentTime === duration) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setPlaying(true);
      return;
    }

    togglePlay();
  };

  const updateTime = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const loadMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleEnded = () => {
    localStorage.setItem("videoCompleted", "true");
    setCompleted(true);
    setPlaying(false);
  };

  // Progress percentage
  const progressPercent =
    duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white p-4 rounded shadow fade-in max-w-3xl mx-auto">
      <video
        ref={videoRef}
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        className="w-full rounded"
        onLoadedMetadata={loadMetadata}
        onTimeUpdate={updateTime}
        onEnded={handleEnded}
      />

      {/* Timeline / Progress Bar */}
      <div className="mt-3">
        <div className="w-full h-2 bg-gray-300 rounded overflow-hidden">
          <div
            className="h-2 bg-blue-600 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex justify-end text-xs font-mono mt-1">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-4">
        {/* Before completion */}
        {!completed && (
          <button
            onClick={togglePlay}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded transition"
          >
            {playing ? "Pause" : "Play"}
          </button>
        )}

        {/* After completion → Replay becomes Play/Pause */}
        {completed && (
          <button
            onClick={replayToggle}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded transition"
          >
            {playing ? "Pause" : "Replay"}
          </button>
        )}
      </div>

      {/* Proceed button */}
      {completed && (
        <div className="flex justify-center mt-5 fade-in">
          <button
            onClick={onEnd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded transition"
          >
            Proceed to Post-Test
          </button>
        </div>
      )}
    </div>
  );
}
