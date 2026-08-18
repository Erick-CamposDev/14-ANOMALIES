import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Introduction from "../introduction/Introduction";

export default function MainLayout() {
  const hasSeenIntro = localStorage.getItem("hasSeenIntro");

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {hasSeenIntro === null && <Introduction />}
    </>
  );
}
