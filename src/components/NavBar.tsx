import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `
      rounded-xl
      px-4
      py-2
      text-sm
      font-semibold
      transition-all
      duration-200
      ${
        isActive
          ? "bg-zinc-900 text-white shadow-md"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
      }
    `;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <h1 className="cursor-pointer text-2xl font-extrabold tracking-tight text-zinc-900">
          NewsBoard
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-3">
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
              className="
                rounded-xl
                bg-zinc-900
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                transition-all
                duration-200
                hover:bg-black
                hover:shadow-lg
                active:scale-95
                cursor-pointer
              "
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}