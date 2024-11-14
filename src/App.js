import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./navbar/Footer";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import User from "./profile/User";
import Articles from "./blogs/articles/Articles";
import Profile from "./auth/Profile";
import AdminDatatable from "./datatable/AdminDatatable";
import BlogPage from "./blogs/blogpage/BlogPage";
import Home from "./home/Home";
import Test from "./blogs/blogpage/Test";


function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const role = localStorage.getItem("role");

  return (
    <div>
      <Navbar />

      <Routes>
        
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        ></Route>
        <Route path="/view/articles" element={<Articles />}></Route>
        <Route path="/blog/view/:blogId" element={<BlogPage />}></Route>
        <Route
          path="/user/dashboard"
          element={
            isAuthenticated && role === "ROLE_USER" ? (
              <User />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>

        <Route
          path="/allblogs"
          element={
            isAuthenticated && role === "ROLE_ADMIN" ? (
              <AdminDatatable />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;