import { useMemo } from "react";
import { eyeImages, rewardMessages } from "../constants/stringsArray";
import useTyped from "../hooks/useTyped";
import { fetchAPI } from "../utils/fetchApi";
import { useNavigate } from "react-router-dom";
import "../css/Reward.css";

export default function Reward() {
  const playerId = localStorage.getItem("playerId");
  const finalMessage = useMemo(() => rewardMessages, []);
  const navigate = useNavigate();

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
              "Você realmente joga sujo não é? Quer a recompensa? Então seja honesto.",
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
  };

  const typedRef = useTyped(false, finalMessage, () => handleFinalProgress);

  return (
    <div className="reward-container">
      <div className="reward-eye">
        <img src={eyeImages[0]} alt="Imagem do Olho Anômalo" />
      </div>
      <div className="reward-texts">
        <span ref={typedRef}></span>
      </div>
    </div>
  );
}
