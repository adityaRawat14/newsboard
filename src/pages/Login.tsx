import {type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

export default function Login() {
    const navigate = useNavigate();
    const { login, loading, setAuthError, error } = useAuthStore();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        // Clear out any old store errors from previous validation attempts
        setAuthError(null);

        // Client-side validations
        if (username.trim().length < 1) {
            setAuthError("Username cannot be empty");
            return;
        }
        if (password.length < 1) {
            setAuthError("Password cannot be empty");
            return;
        }
        if (password.length < 3) {
            setAuthError("Password must be at least 3 characters long");
            return;
        }

        try {
            await login({
                username,
                password,
            });

            navigate("/posts");
        } catch (err) {
            // Error handling state is run through the Zustand login method catch block
        }
    }

    return (
        <div className="flex justify-center mt-16">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-5"
            >
                <h2 className="text-3xl font-bold text-gray-800">Login</h2>

                <Input
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    isRequired={true}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                    type="password"
                    label="Password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    isRequired={true}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <p className="text-red-500 text-sm font-medium animate-pulse">
                        {error}
                    </p>
                )}

                <Button disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    );
}