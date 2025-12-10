import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import * as authApi from "../services/api/auth";
import type { AuthResponse } from "../types/api.types";

interface User {
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    url: string;
    alt: string;
  };
  banner?: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    venueManager: boolean
  ) => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (storedUser && token) {
      try {
        const userData = JSON.parse(storedUser);
        setUser({
          name: userData.name,
          email: userData.email,
          bio: userData.bio,
          avatar: userData.avatar,
          banner: userData.banner,
          venueManager: userData.venueManager ?? false,
        });
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response: AuthResponse = await authApi.login({ email, password });
    const userData = response.data;

    setUser({
      name: userData.name,
      email: userData.email,
      bio: userData.bio,
      avatar: userData.avatar,
      banner: userData.banner,
      venueManager: userData.venueManager ?? false,
    });
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    venueManager: boolean
  ) => {
    await authApi.register({ name, email, password, venueManager });
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    const token = localStorage.getItem("accessToken");
    if (token) {
      localStorage.setItem("user", JSON.stringify({ ...updatedUser, accessToken: token }));
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
