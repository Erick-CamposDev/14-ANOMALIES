import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import "../css/InitialScreen.css";
import Modal from "../components/Modal";
import useTyped from "../hooks/useTyped";
import { eyeImages, eyeMessages } from "../constants/stringsArray";
import { fetchAPI } from "../utils/fetchApi";
import { useNavigate } from "react-router-dom";

export default function InitialScreen() {
  const strings = useMemo(() => eyeMessages, []);

  const [image, setImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useTyped(true, strings);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prev) => prev + 1);

      setTimeout(() => {
        setImage((prev) => prev - 1);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="initial-container">
      <img
        className="eye"
        src={eyeImages[image]}
        alt="Imagem do Olho Anômalo"
      />
      <h1>
        <span ref={textRef}></span>
      </h1>
      <div className="btns-container">
        <Button
          variant="double"
          text="desafiar"
          icon="eye-fill"
          onClick={() => {
            fetchAPI("14anomalies/start", "POST");
            void navigate("/anomaly/1");
          }}
        />
        <Button
          variant="double"
          text="Sobre o jogo"
          icon="book-fill"
          onClick={() => setIsOpen(true)}
        />
        <Modal
          title="Sobre o jogo"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <h2>Olá! Dev aqui.</h2>
          <p>
            14 Anomalies é um jogo de enigmas inspirado em Do Not Believe His
            Lies que é baseado no personagem Obcazwo 14 ou Olho Anômalo. Esse
            jogo foi feito com inuito de desafiar meus amigos que participaram
            em um realms de Minecraft em 2026 que no qual eu criei a persona de
            Obcaozwo 14 para gerar mistério e fazer enigmas para meus amigos
            resolverem.
          </p>
          <p>
            Primeiramente é importante que você veja primeiro esses dois vídeos
            antes de começar o jogo pois é aí que conto a história e origem da
            minha persona mas se não quiser tudo bem, vai na fé mesmo assim. Ah,
            e se você usar IAs para te auxiliarem, eu sinto muito mas tem
            enigmas que elas não vão conseguir de te ajudar então já tomem nota
            disso! Enfim, boa sorte, desafiante!
          </p>
          <p>LINK VIDEO 1</p>
          <p>LINK VIDEO 2</p>
        </Modal>
      </div>
    </div>
  );
}
