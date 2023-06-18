import Login from "./pages/SignIn/SignIn";
import { UserProvider } from "./context/user";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import SignUp from "./pages/SignUp/SignUp";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="Home" element={<Home />} />
            </Route>
            <Route path="/" element={<Navigate to={"/login"} />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
