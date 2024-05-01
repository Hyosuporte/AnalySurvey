import { SurveyAnalysis } from "./pages/SurveyAnalysis";
import { FormAnswering } from "./pages/FormAnswering";
import { FormProvider } from "./context/FormsContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { PageNotFound } from "./pages/PageNotFound";
import { SurveyGenerator } from "./pages/SurveyGenerator";
import { Routes, Route } from "react-router-dom";
import { Overiew } from "./pages/Overiew";
import { SingIn } from "./pages/SingIn";
import { HomePage } from "./pages/HomePage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SingIn />} />
          <Route path="/templates" element={<Overiew />} />
          <Route path="*" element={<PageNotFound />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Overiew />} />
            <Route path="/survey/create/:id" element={<SurveyGenerator />} />
            <Route path="/survey/analysis/:id" element={<SurveyAnalysis />} />
            <Route path="/forms/:id" element={<FormAnswering />} />
          </Route>
        </Routes>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
