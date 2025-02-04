import { getProfile } from "@/api/authService";
import ProfileSkeleton from "@/components/skeletons/profileSkeleton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Key, MailIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const { logout, isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, token, navigate]);

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !!token && isAuthenticated,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          logout();
          navigate("/login", { replace: true });
          return false;
        }
        // Don't retry on 404
        if (error.response?.status === 404) {
          return false;
        }
      }
      return failureCount < 2;
    },
  });

  // Show loading state only when actually loading data
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="space-y-6 max-w-xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4 text-center text-destructive">
          Ошибка загрузки профиля
        </h1>
        <Button
          onClick={logout}
          className="w-full bg-background text-foreground border border-muted hover:bg-accent"
        >
          Выйти
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Профиль</h1>
      {profile ? (
        <>
          <div className="space-y-3 border border-muted rounded-md p-4">
            <p className="flex items-center gap-2">
              <MailIcon className="h-6 w-6" /> Ваш Email
            </p>
            <p className="text-muted-foreground">{profile.email}</p>
          </div>

          <div className="space-y-3 border border-muted rounded-md p-4">
            <p className="flex items-center gap-2">
              <Key className="h-6 w-6" /> Ваш ID
            </p>
            <p className="text-muted-foreground">{profile.id}</p>
          </div>
        </>
      ) : null}
      <Button
        onClick={logout}
        className="w-full bg-background text-foreground border border-muted hover:bg-accent"
      >
        Выйти
      </Button>
    </div>
  );
};

export default ProfilePage;
