import { FormsResponder } from "./pages/FormsResponder";
import { FormProvider } from "./context/FormsContext";
import { AuthProvider } from "./context/AuthContext";
import { ResponseForm } from "./pages/ResponseForm";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import { CreateForm } from "./pages/CreateForm";
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
            <Route path="/profile/:id/create-form" element={<CreateForm />} />
            <Route
              path="/profile/:id/analysis-form"
              element={<ResponseForm />}
            />
            <Route path="/forms/:id" element={<FormsResponder />} />
          </Route>
        </Routes>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
