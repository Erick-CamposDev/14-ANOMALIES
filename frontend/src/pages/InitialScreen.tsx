import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import "../css/InitialScreen.css";
import Typed from "typed.js";

export default function InitialScreen() {
  const eyeImages = [
    "src/assets/Anomaly-Eye.png",
    "src/assets/Anomaly-Eye-Closed.png",
  ];

  const [image, setImage] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prev) => prev + 1);

      setTimeout(() => {
        setImage((prev) => prev - 1);
      }, 750);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const typed = new Typed(textRef.current, {
      strings: [
        "Olá, desafiante",
        "Eu sou o Olho Anômalo",
        "Então...",
        "Vamos começar?",
        "Vai ser instigante.",
      ],
      typeSpeed: 35,
      backSpeed: 20,
      backDelay: 1200,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
    return () => typed.destroy();
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
        <Button variant="double" text="desafiar" icon="eye-fill" />
        <Button variant="double" text="Sobre o jogo" icon="book-fill" />
      </div>
    </div>
  );
}
