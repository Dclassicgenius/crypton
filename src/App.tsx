import { RouterProvider } from "react-router";
import router from "./routes";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./context/AuthProvider";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
