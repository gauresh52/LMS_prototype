import { useRef, useState, useEffect } from "react";

export default function VideoPlayer({ onEnd }) {
  const videoRef = useRef(null);
  const lastTimeRef = useRef(0);
  const completedRef = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [warning, setWarning] = useState("");

  // Reload safety
  useEffect(() => {
    const isCompleted = localStorage.getItem("videoCompleted") === "true";
    if (isCompleted) {
      setCompleted(true);
      completedRef.current = true;
    }
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };

  const replayToggle = () => {
    if (!videoRef.current) return;

    if (videoRef.current.currentTime >= duration) {
      videoRef.current.currentTime = 0;
      lastTimeRef.current = 0;
      videoRef.current.play();
      setPlaying(true);
      return;
    }

    togglePlay();
  };

  // Time update (skip prevention + completion detection)
  const updateTime = () => {
    if (!videoRef.current) return;

    const current = videoRef.current.currentTime;

    // Skip prevention
    if (current - lastTimeRef.current > 1.5) {
      videoRef.current.currentTime = lastTimeRef.current;
      setWarning("Skipping is disabled. Please watch the video completely.");
      return;
    }

    lastTimeRef.current = current;
    setCurrentTime(current);
    setWarning("");

    // Completion detection (iOS-safe)
    if (duration > 0 && current >= duration - 0.3) {
      setPlaying(false); // 🔑 ALWAYS reset UI

      if (!completedRef.current) {
        completedRef.current = true;
        localStorage.setItem("videoCompleted", "true");
        setCompleted(true);
      }
    }
  };

  const loadMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  // Desktop completion fallback
  const handleEnded = () => {
    setPlaying(false); // 🔑 ALWAYS reset UI

    if (!completedRef.current) {
      completedRef.current = true;
      localStorage.setItem("videoCompleted", "true");
      setCompleted(true);
    }
  };

  const progressPercent =
    duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="card p-5">
        <video
          ref={videoRef}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          className="w-full rounded-md mb-4"
          playsInline
          webkit-playsinline="true"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
          onLoadedMetadata={loadMetadata}
          onTimeUpdate={updateTime}
          onEnded={handleEnded}
        />

        {/* Timeline */}
        <div className="mb-2">
          <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className="h-2 bg-blue-600 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-end text-xs text-gray-600 font-mono mt-1">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Warning */}
        {warning && (
          <p className="text-sm text-red-600 mt-2 text-center">
            {warning}
          </p>
        )}

        {/* Controls */}
        <div className="flex justify-between items-center mt-5">
          {!completed && (
            <button onClick={togglePlay} className="btn-secondary">
              {playing ? "Pause" : "Play"}
            </button>
          )}

          {completed && (
            <button onClick={replayToggle} className="btn-secondary">
              {playing ? "Pause" : "Replay"}
            </button>
          )}

          {completed && (
            <button onClick={onEnd} className="btn-primary">
              Proceed to Post-Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
