import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "./url";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
    if (password === confirmPassword) {
      console.log("Signing up with:", { email, password });

      const formData = {
        email: email,
        password: password,
      };

      fetch(`${BASE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Signup failed");
          }
          return res.json();
        })
        .then((data) => {
          modal.classList.remove("hidden");
          setTimeout(() => {
            modal.classList.add("hidden");
            navigate("/login");
          }, 3000);

          console.log("signup success");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          // Optionally, show error feedback to the user
        });
    } else {
      console.log("Passwords do not match!");
    }
  };
  const modal = document.getElementById("thankYouModal");

  const handleRemove = () => {
    modal.classList.add("hidden");
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-lg font-semibold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded w-full py-2 hover:bg-blue-600"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>

      {/* Thanks Modal */}
      <div
        id="thankYouModal"
        className="fixed  inset-0 hidden bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="bg-white rounded-lg p-6 text-center">
          <span
            id="closeBtn"
            className="close cursor-pointer text-red-400 font-bold hover:text-gray-600"
            onClick={handleRemove}
          >
            &times;
          </span>
          <p className="mt-4 text-lg font-semibold">
            Thank you for signing up!
          </p>
          <p className="mt-4 text-lg font-semibold">
            Redirecting to login page....
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
