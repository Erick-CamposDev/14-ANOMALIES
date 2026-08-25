import { useLocation } from "react-router-dom";
import "../css/ErrorScreen.css";

interface ErrorState {
  message: string;
}

export default function ErrorScreen() {
  const location = useLocation();
  const state = location.state as ErrorState;

  return (
    <div className="error-container">
      <img
        className="crimson-eye"
        src="/assets/images/Crimson%20Eye.png"
        alt="Imagem do olho anômalo em chamas"
      />
      <h2>{state.message}</h2>
    </div>
  );
}
