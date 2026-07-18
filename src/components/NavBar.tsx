import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto h-16 flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold text-blue-600">
          NewsBoard
        </h1>

        <div className="flex gap-6">
          <NavLink to="/" className={linkClass}>
            Posts
          </NavLink>

          <NavLink to="/bookmarks" className={linkClass}>
            Bookmarks
          </NavLink>

          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
        </div>
      </nav>
    </header>
  );
}