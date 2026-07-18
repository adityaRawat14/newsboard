import {type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";

import { useAuthStore } from "../store/authStore";

export default function Login() {

    const navigate = useNavigate();

    const { login, loading, error } =
        useAuthStore();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    async function handleSubmit(
        e: SubmitEvent
    ) {

        e.preventDefault();

        try {

            await login({
                username,
                password,
            });

            navigate("/");

        } catch {}

    }

    return (

        <div className="flex justify-center mt-16">

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-5"
            >

                <h2 className="text-3xl font-bold">

                    Login

                </h2>

                <Input
                    label="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(
                            e.target.value
                        )
                    }
                />

                <Input
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                <Button disabled={loading}>

                    {loading
                        ? "Logging in..."
                        : "Login"}

                </Button>

            </form>

        </div>

    );
}