import { useEffect, useRef, useState } from "react";

export default function VideoPlayer({ onEnd }) {
  const videoRef = useRef(null);
  const lastTimeRef = useRef(0);
  const completedRef = useRef(false);
  const watchTimeRef = useRef(0);
  const idleTimerRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [warning, setWarning] = useState("");
  const [playbackRate, setPlaybackRate] = useState(1);

  const [showResume, setShowResume] = useState(false);
  const [resumeTime, setResumeTime] = useState(null);

  const PROGRESS_KEY = "VIDEO_PROGRESS";
  const COMPLETED_KEY = "VIDEO_COMPLETED";
  const WATCHTIME_KEY = "VIDEO_WATCHTIME";

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    const isCompleted = localStorage.getItem(COMPLETED_KEY) === "true";
    const savedTime = Number(localStorage.getItem(PROGRESS_KEY));

    if (isCompleted) {
      completedRef.current = true;
      setCompleted(true);
      return;
    }

    if (savedTime > 1) {
      setResumeTime(savedTime);
      setShowResume(true);
    }
  }, []);

  /* ---------------- TAB VISIBILITY ---------------- */
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  /* ---------------- KEYBOARD CONTROLS ---------------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (!videoRef.current) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }

      if (e.code === "ArrowLeft") {
        seekBack10();
      }

      if (e.code === "ArrowRight" && !completedRef.current) {
        setWarning("Forward seeking is disabled.");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playing]);

  /* ---------------- HELPERS ---------------- */
  const formatTime = (sec = 0) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const resetIdleTimer = () => {
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setPlaying(false);
        setWarning("Paused due to inactivity.");
      }
    }, 15000);
  };

  /* ---------------- CONTROLS ---------------- */
  const togglePlay = () => {
    if (!videoRef.current) return;
    resetIdleTimer();
    videoRef.current.paused
      ? videoRef.current.play()
      : videoRef.current.pause();
    setPlaying(!videoRef.current.paused);
  };

  const seekBack10 = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(
      videoRef.current.currentTime - 10,
      0
    );
  };

  const changeSpeed = (rate) => {
    if (!completedRef.current || !videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  /* ---------------- RESUME ---------------- */
  const confirmResume = () => {
    setShowResume(false);
    videoRef.current.play();
    setPlaying(true);
  };

  const restartVideo = () => {
    localStorage.removeItem(PROGRESS_KEY);
    lastTimeRef.current = 0;
    setCurrentTime(0);
    setResumeTime(null);
    setShowResume(false);
  };

  /* ---------------- VIDEO EVENTS ---------------- */
  const onLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);

    if (resumeTime !== null) {
      videoRef.current.currentTime = resumeTime;
      lastTimeRef.current = resumeTime;
      setCurrentTime(resumeTime);
    }
  };

  const onTimeUpdate = () => {
    if (!videoRef.current) return;

    const now = videoRef.current.currentTime;

    // Block forward seek
    if (now - lastTimeRef.current > 1.5) {
      videoRef.current.currentTime = lastTimeRef.current;
      setWarning("Skipping is disabled.");
      return;
    }

    lastTimeRef.current = now;
    setCurrentTime(now);
    setWarning("");

    localStorage.setItem(PROGRESS_KEY, now.toString());
    watchTimeRef.current += 1;
    localStorage.setItem(WATCHTIME_KEY, watchTimeRef.current);

    if (
      duration > 0 &&
      (now / duration) * 100 >= 95 &&
      !completedRef.current
    ) {
      completedRef.current = true;
      localStorage.setItem(COMPLETED_KEY, "true");
      localStorage.removeItem(PROGRESS_KEY);
      setCompleted(true);
      setPlaying(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="card p-5 relative">
        <div className="relative bg-black mb-4">
          <video
            ref={videoRef}
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            className="w-full max-h-[65vh] object-contain"
            playsInline
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
            onLoadedMetadata={onLoadedMetadata}
            onTimeUpdate={onTimeUpdate}
          />

          {/* Playback Speed (after completion only) */}
          {completed && (
            <div className="absolute top-2 right-2">
              <select
                value={playbackRate}
                onChange={(e) => changeSpeed(+e.target.value)}
                className="bg-black/60 text-white text-xs rounded px-2 py-1"
              >
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>
            </div>
          )}
        </div>

        {/* Resume Popup */}
        {showResume && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded shadow text-center">
              <p className="mb-4">
                Resume from {formatTime(resumeTime)}?
              </p>
              <div className="flex justify-center gap-3">
                <button onClick={confirmResume} className="btn-primary">
                  Resume
                </button>
                <button onClick={restartVideo} className="btn-secondary">
                  Start Over
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="mb-2">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-600"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="text-xs text-right font-mono mt-1">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {warning && (
          <p className="text-sm text-red-600 text-center">{warning}</p>
        )}

        {/* Controls */}
        <div className="flex justify-between mt-4">
          <button onClick={togglePlay} className="btn-secondary">
            {playing ? "Pause" : "Play"}
          </button>
          <button onClick={seekBack10} className="btn-secondary">
            ⏪ 10s
          </button>
        </div>

        {/* Proceed */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onEnd}
            disabled={!completed}
            className={`btn-primary ${
              !completed ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Proceed to Post-Test
          </button>
        </div>
      </div>
    </div>
  );
}
