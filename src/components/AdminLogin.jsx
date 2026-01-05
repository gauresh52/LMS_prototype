import { useState } from "react";

const ADMIN_USERNAME = "Admin";
const ADMIN_PASSWORD = "Admin@123";

export default function AdminLogin({ onSuccess, onCancel }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError("");
      onSuccess();
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto fade-in">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter admin username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter password"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-1.5 rounded border"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Login
          </button>

        </div>
      </form>
        <h6 className="text-xl font-semibold mb-4">Admin seeded Username:"Admin" & Pass:"Admin@123".</h6>

    </div>
    
  );
}
