import { useContext, useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import "../SignIn/styles.css";
import { UserContext } from "../../context/user";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const { user, signUp, loading } = useContext(UserContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) navigate("/Home");
  }, [user]);

  if (loading) {
    return <p>carregando ...</p>;
  }

  console.log("user", user);

  return (
    <>
      <div className="form_container">
        <div className="form">
          <h1>Registrar-se</h1>

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
          <div className="form-group">
            <Input
              value={userData.password}
              label="Senha"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              placeholder="Digite sua Senha"
              type="password"
            />
          </div>

          <div className="button-wrapper">
            <button
              style={{
                width: "200px",
                height: "50px",
                marginTop: "20px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={() => navigate("/")}
            >
              Voltar
            </button>
            <button
              style={{
                width: "200px",
                height: "50px",
                marginTop: "20px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={() => signUp(userData.email, userData.password)}
            >
              {loading ? "Carregando..." : "Criar conta"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
