import { create } from "zustand";

import { type AuthState , type User } from "../types/auth";
import { useBookmarkStore } from "./bookmarkStore";
import { loginUser } from "../services/authService.ts";

const storedUser = localStorage.getItem("user");
export const useAuthStore = create<AuthState>((set) => ({
   user: storedUser ? (JSON.parse(storedUser) as User) : null,

  loading: false,

  error: null,

  async login(credentials) {
    set({
      loading: true,
      error: null,
    });

    try {
      const user = await loginUser(credentials);

      localStorage.setItem("user", JSON.stringify(user));

      set({
        user,
        loading: false,
      });
    } catch (err) {
        console.log("resp",err)
        set({
        loading: false,

        error:
          err instanceof Error
            ? err.message
            : "Login failed",
      });

      throw err;
    }
  },

  logout() {
    localStorage.removeItem("user");
  useBookmarkStore
        .getState()
        .clearBookmarks();
    set({
      user: null,
    });
  },
  setAuthError(er: string|null) {
    set({
      error: er,
    });
}
}));
