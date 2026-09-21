import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import "../css/InitialScreen.css";
import Modal from "../components/Modal";
import useTyped from "../hooks/useTyped";
import { eyeImages, eyeMessages } from "../constants/stringsArray";
import { fetchAPI } from "../utils/fetchApi";
import { useNavigate } from "react-router-dom";
import generateId from "../utils/generateId";
import { useModal } from "../hooks/useModal";

interface PlayerData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  progress: {
    id: string;
    currentState: number;
    hasFinished: boolean;
    playerId: string;
  } | null;
}

export default function InitialScreen() {
  const strings = useMemo(() => eyeMessages, []);

  const [image, setImage] = useState(0);
  const { modal, onOpen, onClose } = useModal();
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

  const handleIdGeneration = async () => {
    const newId = generateId();

    if (!newId) {
      const idLocalStorage = localStorage.getItem("playerId");
      const data = await fetchAPI(`14anomalies/progress/${idLocalStorage}`);

      onOpen("loading");

      if (!data.ok) {
        onClose();
        if (data.status === 404) {
          localStorage.removeItem("playerId");
          void navigate("/error/404", {
            state: {
              message: "O jogador não foi encontrado!",
            },
          });
          return;
        }
        if (data.status === 500) {
          void navigate("/error/500", {
            state: {
              message: "O servidor não foi inicializado!",
            },
          });
          return;
        }
      }

      const playerData: PlayerData = data.riddleData;

      if (!playerData?.progress) {
        const newProgress = await fetchAPI(
          `14anomalies/start/${idLocalStorage}`,
          "POST",
        );

        onClose();

        if (!newProgress.ok) {
          void navigate("/error/500", {
            state: {
              message:
                "Não foi possivel criar o progresso do jogador existente!",
            },
          });
          return;
        }

        void navigate("/anomaly/1");
        return;
      }

      if (playerData.progress.currentState === 14) {
        void navigate("/reward");
        return;
      }

      void navigate(`/anomaly/${Number(playerData.progress.currentState) + 1}`);
      return;
    }

    onOpen("loading");

    const data = await fetchAPI(`14anomalies/start/${newId}`, "POST");

    if (!data.ok) {
      onClose();
      localStorage.removeItem("playerId");
      void navigate("/error/500", {
        state: {
          message: "O servidor não foi inicializado para a geração de ID.",
        },
      });
      return;
    }

    onClose();
    void navigate("/anomaly/1");
  };
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
          onClick={handleIdGeneration}
        />
        <Modal
          title="Carregando..."
          modalActive={modal === "loading"}
          onClose={() => onClose()}
        >
          <h2>Espere um momento.</h2>
          <p>O olho está carregando as anomalias.</p>
        </Modal>
        <Button
          variant="double"
          text="Sobre o jogo"
          icon="book-fill"
          onClick={() => onOpen("about")}
        />
        <Modal
          title="Sobre o jogo"
          modalActive={modal === "about"}
          onClose={() => onClose()}
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
          <div className="links-container">
            <a
              href="https://youtu.be/FeG5BFLc0Cs?si=7k0FII4i9yIa9ceT"
              target="_blank"
            >
              PARTE 1
            </a>
            <a
              href="https://youtu.be/yaifMnxu7dc?si=pBWJ1tba1vRDBhjW"
              target="_blank"
            >
              PARTE 2
            </a>
          </div>
        </Modal>
      </div>
    </div>
  );
}
