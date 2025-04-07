import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Header from "./Header";

const RequestsLayout = () => {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default RequestsLayout;
