import { useLocation, useParams } from "react-router-dom";
import "../css/Header.css";

export default function Header() {
  const { pathname } = useLocation();
  const { number } = useParams();

  const home = pathname === "/";
  const riddle = pathname.startsWith("/anomaly");
  const error = pathname.startsWith("/error");
  const secret = pathname.startsWith("/secret");
  const reward = pathname.startsWith("/reward");

  return (
    <header>
      {home && (
        <img
          className="logo"
          src="/assets/images/14-Anomalies-logo.png"
          alt="Logo oficial da 14 ANOMALIES"
        />
      )}
      {riddle && <h1 className="anomaly-title">ANOMALIA {number}</h1>}
      {error && <h1 className="anomaly-title">ERRO DETECTADO</h1>}
      {secret && <h1 className="anomaly-title">PÁGINA SECRETA</h1>}
      {reward && <h1 className="anomaly-title">RECOMPENSA</h1>}
    </header>
  );
}
