import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function LoginUI() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://connectingnepali.onrender.com";

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const persistAndGo = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("googleUser", JSON.stringify(user));
    navigate("/dashboard");
  };

  const updateAirportPickup = async (userId, enroll) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/user/airport-pickup`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ userId, enroll }),
      });
      const data = await res.json();
      return data.success;
    } catch (error) {
      console.error("❌ Error updating airport pickup:", error.message);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      const { token, user } = data;
      localStorage.setItem("token", token);

      if (user.licenseType && user.airportPickupEnrollment === null) {
        setLoggedInUser({ ...user, token });
        setShowModal(true);
      } else {
        persistAndGo(token, user);
      }
    } catch (err) {
      setStatus({ type: "err", msg: err.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccessSecure = async (credentialResponse) => {
    try {
      const resp = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Google login failed");
      persistAndGo(data.token, data.user);
    } catch (e) {
      setStatus({ type: "err", msg: e.message || "Google login failed" });
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4 overflow-hidden">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
            NEPALI CIRCLE
          </h2>

          {status.msg && (
            <p
              className={`text-center p-2 rounded ${
                status.type === "err"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              {status.msg}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-purple-500"
              autoComplete="email"
            />

            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded pr-20 focus:ring-2 focus:ring-purple-500"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-purple-700 font-bold text-sm tracking-wider">
              OR
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <GoogleLogin
            onSuccess={handleGoogleSuccessSecure}
            onError={() =>
              setStatus({ type: "err", msg: "Google Login Failed" })
            }
          />

          <div className="text-sm text-center text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-purple-600 underline">
              REGISTER HERE
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && loggedInUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Would you like to enroll in Airport Pickup service?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={async () => {
                  const success = await updateAirportPickup(
                    loggedInUser._id,
                    true
                  );
                  if (success) {
                    const user = {
                      ...loggedInUser,
                      airportPickupEnrollment: true,
                    };
                    localStorage.setItem("googleUser", JSON.stringify(user));
                    navigate("/dashboard");
                  }
                  setShowModal(false);
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Yes
              </button>

              <button
                onClick={async () => {
                  const success = await updateAirportPickup(
                    loggedInUser._id,
                    false
                  );
                  if (success) {
                    const user = {
                      ...loggedInUser,
                      airportPickupEnrollment: false,
                    };
                    localStorage.setItem("googleUser", JSON.stringify(user));
                    navigate("/dashboard");
                  }
                  setShowModal(false);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
