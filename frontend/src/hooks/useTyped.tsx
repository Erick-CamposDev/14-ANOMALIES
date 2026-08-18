import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function useTyped(hasLoop: boolean = false, strings: string[]) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const newTyped = new Typed(textRef.current, {
      strings: strings,
      typeSpeed: 35,
      backSpeed: 20,
      backDelay: 1300,
      loop: hasLoop,
      showCursor: true,
      cursorChar: "|",
    });
    return () => newTyped.destroy();
  }, [strings, hasLoop]);

  return textRef;
}
