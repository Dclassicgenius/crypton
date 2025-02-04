// import { useAuth } from "@/context/AuthProvider";
// import { ReactNode } from "react";
// import { Navigate, useLocation } from "react-router";

// export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return <>{children}</>;
// };

import { useAuth } from "@/context/AuthProvider";
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "@/hooks/use-toast";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, token } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      toast({
        title: "Необходима авторизация",
        description: "Пожалуйста, войдите в систему",
        variant: "destructive",
      });
    }
  }, [token]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
