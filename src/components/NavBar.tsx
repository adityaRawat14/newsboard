import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  function handleLogout() {
    logout();

    navigate("/login");
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto flex justify-between items-center h-16 px-4">
        <h1 className="text-2xl font-bold text-blue-600">
          NewsBoard
        </h1>

        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkClass}>
            Posts
          </NavLink>

          <NavLink to="/bookmarks" className={linkClass}>
            Bookmarks
          </NavLink>

          {!user ? (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}