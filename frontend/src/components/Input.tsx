import type { InputHTMLAttributes } from "react";
import "../css/Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholderText: string;
}

export default function Input({ placeholderText, ...rest }: InputProps) {
  return (
    <>
      <input
        className="anomaly-input"
        placeholder={placeholderText}
        {...rest}
      />
    </>
  );
}
