import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FormProvider } from "./context/FormsContext";
import { ProtectedRoutes } from "./ProtectedRoutes";
import "./App.css";

// Importa componentes diferidos
const SurveyAnalysis = lazy(() => import("./pages/SurveyAnalysis"));
const FormAnswering = lazy(() => import("./pages/FormAnswering"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const SurveyGenerator = lazy(() => import("./pages/SurveyGenerator"));
const Overview = lazy(() => import("./pages/Overiew"));
const SignIn = lazy(() => import("./pages/SingIn"));
const HomePage = lazy(() => import("./pages/HomePage"));

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/templates" element={<Overview />} />
            <Route path="*" element={<PageNotFound />} />

            {/* Rutas protegidas */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Overview />} />
              <Route path="/survey/create/:id" element={<SurveyGenerator />} />
              <Route path="/survey/analysis/:id" element={<SurveyAnalysis />} />
              <Route path="/forms/:id" element={<FormAnswering />} />
            </Route>
          </Routes>
        </Suspense>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
