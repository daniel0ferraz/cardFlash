import { createContext, useEffect, useState } from "react";

import {
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { toast } from "react-toastify";
import { VerifyErroCode } from "../utils/errorCodes";
const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [couldLogin, setCouldLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, listenAuth);
  }, []);

  const listenAuth = (userState: any) => {
    console.log("listenAuth", userState);
    setUser(auth.currentUser);
    setLoading(false);
  };

  const signIn = (email: string, password: string) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (email === "" || password === "") {
          toast.warn("Preencha todos os campos");
          setLoading(false);
          return;
        }
        setUser(auth.currentUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.warn(VerifyErroCode(errorCode));

        setLoading(false);
      });
  };

  const signUp = (email: string, password: string) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (email === "" || password === "") {
          toast.warn("Preencha todos os campos");
          setLoading(false);
          return;
        }
        toast.success("Olá" + userCredential.user.email, {
          delay: 10000,
        });
        setUser(auth.currentUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.warn(VerifyErroCode(errorCode));
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetPassword = async (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(true);
        if (email === "") {
          toast.warn("Por favor, digite seu e-mail");
          return;
        }
        toast.success("E-mail enviado!, Verifique sua caixa de entrada.", {
          icon: true,
          delay: 10000,
        });

        toast.success("Verifique sua caixa de span!", {
          icon: true,
          delay: 10000,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("=>", error);
        toast.warn(VerifyErroCode(errorCode));
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signOut = () => {
    setLoading(true);

    signOutFirebase(auth)
      .then(() => {
        toast.success("Deslogado com sucesso!");
      })
      .catch((error) => {
        const errorCode = error.code;

        toast.warn(VerifyErroCode(errorCode));
        setLoading(false);
      });
  };

  return (
    <UserContext.Provider
      value={{
        couldLogin,
        signIn,
        signOut,
        user,
        signUp,
        resetPassword,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
