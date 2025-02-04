import { toast } from "@/hooks/use-toast";
import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (newToken: string) => {
    try {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } catch (error) {
      console.error("Storage error:", error);

      toast({
        title: "Не удалось сохранить сессию",
        description: "Проверьте ваше настройки браузера",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const value = {
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
