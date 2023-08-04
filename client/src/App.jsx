import { Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createfrom" element={<Profile />} />
        <Route path="/templates" element={<Profile />} />
      </Routes>
      <h2>checho</h2>
    </div>
  );
}

export default App;