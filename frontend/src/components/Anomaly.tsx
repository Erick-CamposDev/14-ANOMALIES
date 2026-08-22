import { useEffect, useState } from "react";
import "../css/Anomaly.css";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import seriousEye from "../assets/serious-eye.png";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAPI } from "../utils/fetchApi";
import { FadeLoader } from "react-spinners";

export interface PublicRiddle {
  id: number;
  riddleText: string;
  riddleType: "audio" | "text" | "video" | "image";
  riddleContent: string;
  riddleSubContent?: string;
  riddleHint: string;
}

export default function Anomaly() {
  const [answer, setAnswer] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [riddle, setRiddle] = useState<PublicRiddle | null>(null);
  const [loading, setLoading] = useState(true);
  const { modal, onOpen, onClose } = useModal();
  const navigate = useNavigate();

  const { number: currentRiddleNumber } = useParams();
  const playerId = localStorage.getItem("playerId");

  useEffect(() => {
    async function handleFetch() {
      if (!playerId || !currentRiddleNumber) {
        void navigate("/error", {
          state: {
            message:
              "O jogador não foi encontado. Gere seu id para desafiar as anomalias.",
          },
        });

        return;
      }
      try {
        const data = await fetchAPI(
          `14anomalies/anomaly/${currentRiddleNumber}/${playerId}`,
        );

        if (!data) {
          void navigate("/error", {
            state: {
              message: "O enigma não foi encontrado, digite um número válido.",
            },
          });

          return;
        }

        if ("message" in data) {
          void navigate("/error", {
            state: {
              message:
                "Você se acha espertinho não é? Saiba que já previ seus movimentos fúteis, estou de Olho em você, trapaceiro.",
            },
          });
          return;
        }

        setRiddle(data?.riddleData);
      } finally {
        setLoading(false);
      }
    }

    void handleFetch();
  }, [currentRiddleNumber, playerId, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    setIsDisabled(e.target.value.trim() === "");
  };

  return (
    <div className="anomaly-container">
      <div className="anomaly-header">
        <Button
          variant="icon"
          icon="arrow-left-circle"
          onClick={() => void navigate("/")}
        />
      </div>
      <div className="anomaly-content">
        <FadeLoader loading={loading} width={5} height={20} color={"#fafafa"} />

        <p>{riddle?.riddleContent}</p>
      </div>
      <div className="anomaly-footer">
        <div className="input-container">
          <Input
            placeholderText="Digite sua resposta."
            value={answer}
            onChange={(e) => handleChange(e)}
          />
          <Button
            disabled={isDisabled}
            variant="text"
            text="ENVIAR"
            onClick={() => onOpen("try")}
          />
          <Modal
            title="Tentativa de Resposta"
            modalActive={modal === "try"}
            onClose={() => onClose()}
          >
            <h2>
              Você tem certeza que quer continuar com essa resposta, desafiante?
            </h2>
            <p>
              Não quero saber de você ficar frustrado se sua resposta não tiver
              correta!
            </p>
            <div className="md-image">
              <img src={seriousEye} alt="Imagem do olho anômalo sério." />
            </div>
            <div className="md-btns">
              <Button
                variant="text"
                text="SIM"
                onClick={async () => {
                  const hasPassed = await fetchAPI(
                    `14anomalies/anomaly/${currentRiddleNumber}/${playerId}`,
                    "POST",
                    {
                      answer: answer.trim(),
                    },
                  );

                  if (hasPassed?.riddleData.type === "wrong") {
                    onClose();
                    onOpen("error");
                    return;
                  }

                  onClose();
                  void navigate(`/anomaly/${Number(currentRiddleNumber) + 1}`);
                }}
              />
            </div>
          </Modal>
          <Modal
            title="ERRO"
            modalActive={modal === "error"}
            onClose={() => onClose()}
          >
            <h2>Oops! Parece que sua resposta não está correta!</h2>
            <p>Que tal tentarmos de novo?</p>
          </Modal>
        </div>
        <div className="hint-container">
          <Button
            variant="icon"
            icon="question-circle"
            onClick={() => onOpen("hint")}
          />
          <Modal
            title="Dica Anômala"
            modalActive={modal === "hint"}
            onClose={() => onClose()}
          >
            <h2>Sua dica anômala é...</h2>
            <p>{riddle?.riddleHint}</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}
