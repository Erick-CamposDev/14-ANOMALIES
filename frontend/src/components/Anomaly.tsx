import { useEffect, useState } from "react";
import "../css/Anomaly.css";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import seriousEye from "../assets/serious-eye.png";
import { useNavigate } from "react-router-dom";

export default function Anomaly() {
  const [isDisabled, setIsDisabled] = useState(true);
  const { modal, onOpen, onClose } = useModal();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <p>CONTEUDO</p>
      </div>
      <div className="anomaly-footer">
        <div className="input-container">
          <Input
            placeholderText="Digite sua resposta."
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
              <Button variant="text" text="NÃO" onClick={() => onClose()} />
              <Button variant="text" text="SIM" />
            </div>
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
            <p>CONTEÚDO</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}
