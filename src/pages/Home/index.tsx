import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user";
import { FaUserAlt } from "react-icons/fa";
import "./style.css";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db, auth } from "../../services/firebase";

type Props = {
  id: string;
  name: string;
  photo: string;
};

export default function Home() {
  const { user, signOut } = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  const [selectedCard, setSelectedCard] = useState("");

  useEffect(() => {
    const q = query(collection(db, "cards"));

    onSnapshot(q, (querySnapshot) => {
      const data: any = [];
      querySnapshot.forEach((doc: any) => {
        console.log(doc.id, doc.data());
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCards(data);
    });
    console.log("cards", cards);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h3>Cards Flash</h3>
        <div className="boxIcon">
          <span>Olá, {user?.email}</span>
          <FaUserAlt />
        </div>
        <span onClick={signOut}>Sair</span>
      </div>

      <div className="">
        <h3>Total de cards: {cards.length}</h3>
      </div>

      <div className="card-game">
        {cards.map((card: Props) => (
          <>
            <div
              key={card.id}
              className={isOpened ? "card card-opened" : "card"}
              onClick={() => {
                setSelectedCard(card.name);
              }}
            >
              <div className="content">
                <div className="front">{card.name}</div>
                <img src={card.photo} className="back" />
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
