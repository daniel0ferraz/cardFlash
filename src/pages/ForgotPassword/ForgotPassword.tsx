import { useContext, useState } from "react";
import Input from "../../components/Input/Input";
import "../SignIn/styles.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const { resetPassword, loading } = useContext(UserContext);

  const [userData, setUserData] = useState({
    email: "",
  });

  return (
    <>
      <div className="form_container">
        <div className="form">
          <h1>Recupera senha</h1>

          <div className="form-group">
            <Input
              label="E-mail"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Digite seu E-mail"
            />
          </div>

          <div className="button-wrapper">
            <button
              style={{
                width: "100%",
                height: "50px",
                marginTop: "20px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={() => resetPassword(userData.email)}
            >
              {loading ? "Carregando..." : "Recuperar"}
            </button>

            <button
              style={{
                width: "100%",
                height: "50px",
                marginTop: "20px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={() => navigate("/")}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
