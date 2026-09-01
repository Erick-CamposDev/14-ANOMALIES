import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import InitialScreen from "./pages/InitialScreen";
import AnomalyRiddle from "./pages/AnomalyRiddle";
import ErrorScreen from "./pages/ErrorScreen";
import NotFoundRedirect from "./components/NotFoundRedirect";
import SlashSecretPage from "./pages/SlashSecretPage";
import Reward from "./pages/Reward";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <InitialScreen />,
      },
      {
        path: "/anomaly/:number",
        element: <AnomalyRiddle />,
      },
      {
        path: "/error/:status",
        element: <ErrorScreen />,
      },
      {
        path: "/secret",
        element: <SlashSecretPage />,
      },
      {
        path: "/reward",
        element: <Reward />,
      },
      {
        path: "*",
        element: <NotFoundRedirect />,
      },
    ],
  },
]);
