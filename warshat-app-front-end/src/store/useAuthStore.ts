import { create } from "zustand"
import api from "@/lib/api"

type AuthUser = { email: string; name?: string }

type AuthStore = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: (() => {
    try {
      const stored = localStorage.getItem("user");
      return (stored && stored !== "undefined") ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })(),
  isAuthenticated: !!localStorage.getItem("token"),
  login: async (email, password) => {
    try {
      const { data } = await api.post("/login", { email, password })
      localStorage.setItem("token", data.access_token)
      // Fallback: If data.user is missing (backend didn't send it), use the email we have
      const userToStore = data.user || { email };

      localStorage.setItem("user", JSON.stringify(userToStore))

      // Store the full user object (including name) from the response
      set({ user: userToStore, isAuthenticated: true })
      return true
    } catch {
      return false
    }
  },
  logout: async () => {
    try {
      await api.post("/logout")
    } catch { }
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    set({ user: null, isAuthenticated: false })
  },
}))
