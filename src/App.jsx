import { useState, useEffect } from "react";
import PreTest from "./pages/PreTest";
import PostTest from "./pages/PostTest";
import Score from "./pages/Score";
import VideoPlayer from "./components/VideoPlayer";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import ProgressBar from "./components/ProgressBar";
import "./styles/ui.css";

export default function App() {
  const [stage, setStage] = useState("pre");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // 🔒 Safe reload handling
  useEffect(() => {
    const savedStage = localStorage.getItem("stage");
    const validStages = ["pre", "video", "post", "score"];

    if (validStages.includes(savedStage)) {
      setStage(savedStage);
    } else {
      localStorage.setItem("stage", "pre");
      setStage("pre");
    }
  }, []);

  // 🔐 HARD GUARD: close admin login if assessment starts
  useEffect(() => {
    if (stage !== "pre" && showAdminLogin) {
      setShowAdminLogin(false);
    }
  }, [stage, showAdminLogin]);

  /* ================= ADMIN DASHBOARD ================= */
  if (isAdmin) {
    return (
      <div className="min-h-screen flex justify-center px-4 py-8 bg-gray-50">
        <div className="w-full max-w-5xl fade-in">
          <AdminPanel onLogout={() => setIsAdmin(false)} />
        </div>
      </div>
    );
  }

  /* ================= ADMIN LOGIN ================= */
  if (showAdminLogin) {
    return (
      <div className="min-h-screen flex justify-center items-start px-4 py-8 bg-gray-50">
        <div className="w-full max-w-md fade-in">
          <AdminLogin
            onSuccess={() => {
              setIsAdmin(true);
              setShowAdminLogin(false);
            }}
            onCancel={() => setShowAdminLogin(false)}
          />
        </div>
      </div>
    );
  }

  /* ================= USER VIEW ================= */
  return (
    <div className="min-h-screen flex justify-center px-4 py-8 bg-gray-50">
      <div className="w-full max-w-5xl fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Learning Module
          </h1>

          {/* Admin login allowed ONLY before assessment starts */}
          {stage === "pre" && (
            <button
              onClick={() => setShowAdminLogin(true)}
              className="btn-primary"
            >
              Admin Login
            </button>
          )}
        </div>

        {/* Progress */}
        <ProgressBar currentStage={stage} />

        {/* Content */}
        {stage === "pre" && <PreTest setStage={setStage} />}
        {stage === "video" && (
          <VideoPlayer
            onEnd={() => {
              localStorage.setItem("stage", "post");
              setStage("post");
            }}
          />
        )}
        {stage === "post" && <PostTest setStage={setStage} />}
        {stage === "score" && <Score setStage={setStage} />}
      </div>
    </div>
  );
}
