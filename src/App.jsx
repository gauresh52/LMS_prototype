import { useState, useEffect } from "react";
import PreTest from "./pages/PreTest";
import PostTest from "./pages/PostTest";
import Score from "./pages/Score";
import VideoPlayer from "./components/VideoPlayer";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import ProgressBar from "./components/ProgressBar";

export default function App() {
  const [stage, setStage] = useState("pre");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  //  Safe reload handling
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

  //  HARD GUARD: close admin login if assessment starts
  useEffect(() => {
    if (stage !== "pre" && showAdminLogin) {
      setShowAdminLogin(false);
    }
  }, [stage, showAdminLogin]);

  // ADMIN DASHBOARD
  if (isAdmin) {
    return (
      <div className="p-6 max-w-5xl mx-auto fade-in">
        <AdminPanel onLogout={() => setIsAdmin(false)} />
      </div>
    );
  }

  // ADMIN LOGIN SCREEN
  if (showAdminLogin) {
    return (
      <div className="p-6 max-w-5xl mx-auto fade-in">
        <AdminLogin
          onSuccess={() => {
            setIsAdmin(true);
            setShowAdminLogin(false);
          }}
          onCancel={() => setShowAdminLogin(false)}
        />
      </div>
    );
  }

  //  USER VIEW
  return (
    <div className="p-6 max-w-5xl mx-auto fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Learning Module</h1>

        {/* Admin login allowed ONLY before assessment starts */}
        {stage === "pre" && (
          <button
            onClick={() => {
              setShowAdminLogin(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded transition"
          >
            Admin Login
          </button>
        )}
      </div>

      <ProgressBar currentStage={stage} />

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
  );
}
