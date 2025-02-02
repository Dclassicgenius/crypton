import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/navbar";
import LoginForm from "./components/login-form";
import Profile from "./components/profile";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />

      <LoginForm />
      <Profile />
    </ThemeProvider>
  );
}

export default App;
