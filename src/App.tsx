import Login from "./pages/SignIn/SignIn";
import { UserProvider } from "./context/user";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoutes from "./pages/ProtectedRoutes";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="Home" element={<Home />} />
            </Route>
            <Route path="/" element={<Navigate to={"/login"} />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
