import { useContext, useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import "./styles.css";
import { UserContext } from "../../context/user";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const { user, signIn, loading } = useContext(UserContext);

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

  return (
    <>
      <div className="form_container">
        <div className="form">
          <h1>Flash Cards</h1>

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
          <button
            style={{
              width: "100%",
              height: "50px",
              marginTop: "20px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            onClick={() => signIn(userData.email, userData.password)}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </div>
      </div>
    </>
  );
}
