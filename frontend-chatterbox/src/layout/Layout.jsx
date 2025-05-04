

import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";


const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
