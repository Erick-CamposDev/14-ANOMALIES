import "../css/Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "text" | "icon" | "double";
  icon?: string;
  text?: string;
}

export default function Button({
  variant,
  icon,
  text,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button className={`btn--${variant} ${className ?? ""}`} {...rest}>
      {variant === "text" && text}
      {variant === "icon" && icon && <i className={`bi bi-${icon}`}></i>}
      {variant === "double" && (
        <>
          {icon && <i className={`bi bi-${icon}`}></i>}
          {text && <span>{text}</span>}
        </>
      )}
    </button>
  );
}
