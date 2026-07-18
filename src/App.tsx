import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/NavBar.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

import Posts from "./pages/Posts";
import Login from "./pages/Login";
import Bookmarks from "./pages/Bookmarks";
import PostDetails from "./pages/PostDetails";

export default function App() {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Posts />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/posts/:id"
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}