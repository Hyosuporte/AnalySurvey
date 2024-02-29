import { Routes, Route } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Profile } from "./pages/Profile";
import { Landing } from "./pages/Landing";
/* import { Login } from "./pages/Login"; */
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* <Route
        path="/login"
        element={}
      /> */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/templates" element={<Profile />} />
      <Route path="/createfrom" element={<Profile />} />
      <Route path="/profile/create" element={<Landing />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
