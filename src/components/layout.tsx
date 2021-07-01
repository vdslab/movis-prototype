import React from "react";
import Navbar from "~/components/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.VFC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
