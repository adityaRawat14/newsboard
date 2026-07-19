import { type SubmitEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FiCopy, FiCheck } from "react-icons/fi";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();

  const {
    login,
    loading,
    setAuthError,
    error,
    user,
  } = useAuthStore();


  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(
    e: SubmitEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setAuthError(null);

    if (!username.trim()) {
      setAuthError("Username cannot be empty");
      return;
    }

    if (!password) {
      setAuthError("Password cannot be empty");
      return;
    }

    if (password.length < 3) {
      setAuthError(
        "Password must be at least 3 characters."
      );
      return;
    }

    try {
      await login({
        username,
        password,
      });

      navigate("/posts");
    } catch {}
  
  }

  const [copiedField, setCopiedField] = useState<
  "username" | "password" | null
>(null);

async function copyText(
  text: string,
  field: "username" | "password"
) {
  await navigator.clipboard.writeText(text);
  setCopiedField(field);

  setTimeout(() => {
    setCopiedField(null);
  }, 1500);
}

  if (user) {
    return <Navigate to="/posts" />;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-50">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl grid-cols-1 lg:grid-cols-2">

        {/* Left Side */}

        <div className="hidden flex-col justify-center px-16 lg:flex">
          <span className="mb-6 inline-flex w-fit rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">
            Welcome Back
          </span>

          <h1 className="text-6xl font-black tracking-tight text-zinc-900">
            NewsBoard
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-600">
            Discover trending posts, save bookmarks,
            explore discussions, and stay updated with a
            clean reading experience.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-5 max-w-lg">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-3xl font-bold text-zinc-900">
                10K+
              </p>
              <p className="mt-2 text-zinc-500">
                Posts
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-3xl font-bold text-zinc-900">
                5K+
              </p>
              <p className="mt-2 text-zinc-500">
                Users
              </p>
            </div>
          </div>
        </div>

        {/* Login Card */}

        <div className="flex items-center justify-center p-6">
          <form
            onSubmit={handleSubmit}
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-zinc-200
              bg-white
              p-10
              shadow-xl
            "
          >
            <h2 className="text-4xl font-black tracking-tight text-zinc-900">
              Login
            </h2>

            <p className="mt-2 text-zinc-500">
              Sign in to continue.
            </p>

            <div className="mt-8 space-y-6">
              <Input
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                isRequired
                required
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />

              <Input
                type="password"
                label="Password"
                name="password"
                autoComplete="current-password"
                value={password}
                isRequired
                required
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3">
                <p className="text-sm font-medium text-red-600">
                  {error}
                </p>
              </div>
            )}

            <div className="mt-8">
              <Button disabled={loading}>
                {loading
                  ? "Logging in..."
                  : "Login"}
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 text-xs text-zinc-500">
  <span>Demo Credentials:</span>

  <button
    type="button"
    onClick={() => copyText("emilys", "username")}
    className="flex items-center gap-1 rounded-md cursor-pointer bg-zinc-100 px-2 py-1 transition hover:bg-zinc-200"
  >
    <span>emilys</span>
    {copiedField === "username" ? (
      <FiCheck size={12} />
    ) : (
      <FiCopy size={12} />
    )}
  </button>

  <button
    type="button"
    onClick={() => copyText("emilyspass", "password")}
    className="flex items-center gap-1 cursor-pointer rounded-md bg-zinc-100 px-2 py-1 transition hover:bg-zinc-200"
  >
    <span>emilyspass</span>
    {copiedField === "password" ? (
      <FiCheck size={12} />
    ) : (
      <FiCopy size={12} />
    )}
  </button>
</div>
          </form>
        </div>
      </div>
    </div>
  );
}