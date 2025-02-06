import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  login as loginUser,
  register as registerUser,
} from "@/api/authService";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "@/hooks/use-toast";
import { handleApiError } from "@/api/axiosInstance";
// import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import axios from "axios";

type Mode = "login" | "register";

// Validation schema for login
const loginSchema = z.object({
  email: z.string().email("Невалидный email"),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});

// Validation schema for registration extends login schema with confirmPassword
const registerSchema = loginSchema
  .extend({
    confirmPassword: z
      .string()
      .min(8, "Подтверждение пароля должно быть не менее 8 символов"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });

// Types for the form data
type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface LoginRegisterFormProps {
  mode: Mode;
}

const LoginRegisterForm = ({ mode }: LoginRegisterFormProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const schema = mode === "register" ? registerSchema : loginSchema;

  const form = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(mode === "register" ? { confirmPassword: "" } : {}),
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: mode === "register" ? registerUser : loginUser,
    onSuccess: (data) => {
      login(data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      toast({
        title: mode === "register" ? "Регистрация успешна" : "Вход успешен",
        description:
          mode === "register"
            ? "Вы успешно зарегистрировались"
            : "Вы успешно вошли",
        duration: 3000,
      });

      navigate("/profile", { replace: true });
    },

    onError: (error) => {
      handleApiError(error);
      console.error(`${mode} error:`, error);
    },
  });

  function onSubmit(values: LoginFormValues | RegisterFormValues) {
    if (mode === "register") {
      // Only email and password are sent to the backend for registration.
      const { email, password } = values as RegisterFormValues;
      mutate({ email, password });
    } else {
      mutate(values as LoginFormValues);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-xl mx-auto mt-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === "register" ? "Регистрация" : "Вход"}
        </h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Введите email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {mode === "register" && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подтвердите пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Повторите пароль"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex items-center justify-between">
          {mode === "login" ? (
            <p className="text-sm flex items-center gap-2">
              Нет аккаунта?
              <a
                href="/register"
                className="text-sm text-muted-foreground underline"
              >
                Зарегистрироваться
              </a>
            </p>
          ) : (
            <p className="text-sm flex items-center gap-2">
              Уже есть аккаунт?
              <a
                href="/login"
                className="text-sm text-muted-foreground underline"
              >
                Войти
              </a>
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-background text-foreground border border-muted hover:bg-accent"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending
            ? mode === "register"
              ? "Создание аккаунта…"
              : "Вход…"
            : mode === "register"
            ? "Создать аккаунт"
            : "Войти"}
        </Button>
        {isError && (
          <p className="text-red-500">
            {error?.message ||
              (mode === "register" ? "Ошибка регистрации" : "Ошибка входа")}
          </p>
        )}
      </form>
    </Form>
  );
};

export default LoginRegisterForm;
