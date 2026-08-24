import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    void navigate("/error/404", {
      state: {
        message: "A página não existe.",
      },
    });
  }, [navigate]);

  return null;
}
