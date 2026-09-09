import { useMemo, useState } from "react";
import { eyeImages, rewardMessages } from "../constants/stringsArray";
import useTyped from "../hooks/useTyped";
import { fetchAPI } from "../utils/fetchApi";
import { useNavigate } from "react-router-dom";
import "../css/Reward.css";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";

interface RewardData {
  title: string;
  rewardURL: string;
}

export default function Reward() {
  const playerId = localStorage.getItem("playerId");
  const finalMessage = useMemo(() => rewardMessages, []);
  const navigate = useNavigate();
  const [finished, setFinished] = useState(false);
  const [reward, setReward] = useState<RewardData | null>(null);
  const { modal, onOpen, onClose } = useModal();

  const handleFinalProgress = async () => {
    if (!playerId) {
      void navigate("/error/404", {
        state: {
          message:
            "O Id do jogador não foi encontrado, gere seu id para acessar a recompensa.",
        },
      });

      return;
    }

    const data = await fetchAPI(`14anomalies/reward/${playerId}`);

    if (!data.ok) {
      if (data.status === 403) {
        void navigate("/error/403", {
          state: {
            message:
              "Você realmente joga sujo não é? Quer a recompensa? Então seja honesto e resolva as anomalias, trapaceiro sujo.",
          },
        });

        return;
      }

      if (data.status === 404) {
        void navigate("/error/404", {
          state: {
            message:
              "O prêmio não foi encontrado, certifique-se de digitar a URL corretamente.",
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

    setReward(data.riddleData);
  };

  const typedRef = useTyped(false, finalMessage, () =>
    setTimeout(async () => {
      await handleFinalProgress();
      setFinished(true);
    }, 2000),
  );

  const handleReset = async () => {
    onClose();
    onOpen("loading");

    const data = await fetchAPI(`14anomalies/reset/${playerId}`, "POST");

    if (!data.ok) {
      void navigate("/error/500", {
        state: {
          message: "O servidor não foi inicializado!",
        },
      });
    }

    onClose();
    void navigate("/");
    onOpen("success");
  };

  return (
    <div className="reward-container">
      <div className="reward-eye">
        <img src={eyeImages[0]} alt="Imagem do Olho Anômalo" />
      </div>
      <div className="reward-texts">
        {!finished && <span ref={typedRef}></span>}
        {finished && (
          <>
            <p>
              Seu prêmio está aqui:{" "}
              <a
                className="reward-link"
                href={reward?.rewardURL}
                target="_blank"
              >
                Vídeo Secreto
              </a>
            </p>
          </>
        )}
      </div>
      <div className="reset-btn-container">
        {finished && (
          <Button
            variant="text"
            text="Resetar"
            onClick={() => onOpen("reset")}
          />
        )}
        <Modal
          title="Reset de Progresso"
          modalActive={modal === "reset"}
          onClose={() => onClose()}
        >
          <h2>Tem certeza?</h2>
          <p>
            Você quer resetar seu prgresso? Você irá perder ele mas você poderá
            rejogar tudo outra vez.
          </p>
          <div className="reset-btn-container">
            <Button variant="text" text="Resetar tudo" onClick={handleReset} />
          </div>
        </Modal>
        <Modal
          title="Resetando..."
          modalActive={modal === "loading"}
          onClose={() => onClose}
        >
          <h2>Carregando reset</h2>
          <p>Seu progresso está sendo resetado aguarde...</p>
        </Modal>
        <Modal
          title="Sucesso!"
          modalActive={modal === "success"}
          onClose={() => onClose}
        >
          <h2>Reset Concluído</h2>
          <p>Seu progresso foi resetado com sucesso!</p>
        </Modal>
      </div>
    </div>
  );
}
