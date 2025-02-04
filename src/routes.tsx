import { lazy, Suspense } from "react";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import AppLayout from "./layouts/AppLayout";
import { ProtectedRoute } from "./components/protected-routes";
import RegisterSkeleton from "./components/skeletons/registerSkeleton";
import LoginSkeleton from "./components/skeletons/loginSkeleton";
import ProfileSkeleton from "./components/skeletons/profileSkeleton";

// Lazy load components
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));
const LoginRegisterForm = lazy(
  () => import("./components/login-registration-form")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <Suspense fallback={<LoginSkeleton />}>
            <LoginRegisterForm mode="login" />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<RegisterSkeleton />}>
            <LoginRegisterForm mode="register" />
          </Suspense>
        }
      />
      {/* Protected routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Suspense fallback={<ProfileSkeleton />}>
              <ProfilePage />
            </Suspense>
          </ProtectedRoute>
        }
      />
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/profile" replace />} />
      <Route path="*" element={<Navigate to="/profile" replace />} />
    </Route>
  )
);

export default router;
