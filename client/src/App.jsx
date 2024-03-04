import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoutes } from "./ProtectedRoutes"
import { NotFoundPage } from "./pages/NotFoundPage"
import { Routes, Route } from "react-router-dom"
import { Profile } from "./pages/Profile"
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/templates' element={<Profile />} />
        <Route path='*' element={<NotFoundPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/createfrom' element={<Profile />} />
          <Route path='/profile/create' element={<Home />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
