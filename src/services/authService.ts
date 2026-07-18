import {type LoginRequest,type User } from "../types/auth";
import { api } from "./api";

export function loginUser(
    credentials: LoginRequest
) {
    return api<User>(
        "/auth/login",
        {
            method: "POST",

            body: JSON.stringify(credentials),
        }
    );
}