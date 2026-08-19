import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import InitialScreen from "./pages/InitialScreen";
import AnomalyRiddle from "./pages/AnomalyRiddle";
import ErrorScreen from "./pages/ErrorScreen";

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
        path: "/error/",
        element: <ErrorScreen />,
      },
    ],
  },
]);
