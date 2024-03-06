import { AuthProvider } from "./context/AuthContext";
import { FormProvider } from "./context/FormsContext";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/templates" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id/createform" element={<Profile />} />
            <Route path="/profile/create" element={<Home />} />
          </Route>
        </Routes>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
