import { toast } from "@/hooks/use-toast";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleApiError = (error: unknown): void => {
  let message = "Произошла неожиданная ошибка";

  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      message = "Сессия истекла, пожалуйста войдите снова";
      sessionStorage.removeItem("token");
    } else {
      message = error.response?.data?.message || error.message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast({
    title: "Ошибка",
    description: message,
    variant: "destructive",
    duration: 4000,
  });
};

export default axiosInstance;
