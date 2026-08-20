import { useEffect } from "react";
import "../css/Anomaly.css";
import Button from "./Button";

export default function Anomaly() {
  useEffect(() => {}, []);

  return (
    <div className="anomaly-container">
      <div className="anomaly-header">
        <Button variant="icon" icon="arrow-left-circle" />
      </div>
      <div className="anomaly-content">
        <p>CONTEUDO</p>
      </div>
      <div className="anomaly-footer">
        <p>CONTEUDO 2</p>
      </div>
    </div>
  );
}
