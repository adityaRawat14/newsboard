import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Bookmarks from "./pages/Bookmarks";
import PostDetails from "./pages/PostDetails";

export default function App() {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>

          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />

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