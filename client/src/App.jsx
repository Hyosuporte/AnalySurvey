import { FormProvider } from "./context/FormsContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loading } from "./components/Loading";
import "./App.css";

// Importa componentes diferidos
const SurveyAnalysis = lazy(() => import("./pages/SurveyAnalysis"));
const FormAnswering = lazy(() => import("./pages/FormAnswering"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const SurveyGenerator = lazy(() => import("./pages/SurveyGenerator"));
const Overview = lazy(() => import("./pages/Overiew"));
const SignIn = lazy(() => import("./pages/SignIn"));
const ForgetPass = lazy(() => import("./pages/ForgetPass"));
const HomePage = lazy(() => import("./pages/HomePage"));

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/login/forge-password" element={<ForgetPass />} />
            <Route path="/templates" element={<Overview />} />
            <Route path="*" element={<PageNotFound />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/Espacio-de-Trabajo" element={<Overview />} />
              <Route path="/survey/create/:id" element={<SurveyGenerator />} />
              <Route path="/survey/analysis/:id" element={<SurveyAnalysis />} />
              <Route path="/forms/aswering/:id" element={<FormAnswering />} />
            </Route>
          </Routes>
        </Suspense>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
