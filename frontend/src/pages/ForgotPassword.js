import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const API_URL = "https://connectingnepali.onrender.com";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      await res.json();
      setStatus("If that email exists, we’ve sent a reset link.");
      setDone(true);
    } catch {
      setStatus("If that email exists, we’ve sent a reset link.");
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center">Forgot Password</h1>
        {status && <p className="mb-4 text-center text-green-600">{status}</p>}

        {done ? (
          <button
            onClick={() => navigate("/login-ui")}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Back to Login
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
            <div className="text-center">
              <Link to="/login-ui" className="text-sm text-blue-600 underline">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
