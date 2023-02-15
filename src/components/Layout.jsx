import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Menu from "./Menu";


const Layout = () => {
  return (
    <>
      <Menu />
      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
