import { createPortal } from "react-dom";
import "../../css/Introduction.css";
import useTyped from "../../hooks/useTyped";
import { introMessages } from "../../constants/stringsArray";
import { useMemo, useState } from "react";

export default function Introduction() {
  const [introVisible, setIntroVisible] = useState(true);

  const strings = useMemo(() => introMessages, []);
  const textRef = useTyped(false, strings, () => {
    setTimeout(() => {
      setIntroVisible(false);
      localStorage.setItem("hasSeenIntro", "true");
    }, 2000);
  });

  return createPortal(
    <div className={`intro-bg ${!introVisible ? "closed" : ""}`}>
      <h2 className="intro-msg">
        <span ref={textRef}></span>
      </h2>
    </div>,
    document.body,
  );
}
