import React, { useState } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';
import { BASE_API_URL } from './url';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with:', { username, password });

    const formData = {
      username: username,
      password: password,
    };
  
    fetch(`${BASE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login failed"); // Handle non-200 responses
        }
        return res.json();
      })
      .then((data) => {
        console.log("Login successful:", data);
        
        const  role  = data.role;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", role);
        localStorage.setItem("accessJwt",data.accessToken)
        localStorage.setItem("refreshJwt",data.refreshToken)
        sessionStorage.setItem("initialRefreshDone", "true");
        window.location.href = "/"; 

      })
      .catch((error) => {
        console.error("Error logging in:", error);
        // Optionally, show error feedback to the user
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit" className="bg-blue-500 text-white rounded w-full py-2 hover:bg-blue-600">
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
