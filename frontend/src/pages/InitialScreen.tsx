import Button from "../components/Button";
import "../css/InitialScreen.css";

export default function InitialScreen() {
  return (
    <div className="initial-container">
      <img
        className="eye"
        src="src/assets/Anomaly-eye.png"
        alt="Imagem do Olho Anômalo"
      />
      <h1>Olá, desafiante.</h1>
      <div className="btns-container">
        <Button variant="double" text="desafiar" icon="eye-fill" />
        <Button variant="double" text="Sobre o jogo" icon="book-fill" />
      </div>
    </div>
  );
}
