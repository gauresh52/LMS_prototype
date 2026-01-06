import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const ADMIN_USERNAME = "Admin";
const ADMIN_PASSWORD = "Admin@567";

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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white mt-6 p-8 rounded shadow max-w-md mx-auto fade-in f ">
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
          <label className="label mb-1">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pr-10"
              placeholder="Enter password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-1 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <h6 className="text-x font-semibold mb-4">
          Admin seeded as Username:"Admin" & Pass:"Admin@567".
        </h6>

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
    </div>
  );
}
