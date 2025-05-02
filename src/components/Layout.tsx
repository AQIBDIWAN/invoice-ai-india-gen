
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col overflow-fix">
      <Navbar />
      <main className={`flex-1 mx-auto w-full ${isMobile ? 'px-3 py-4' : 'container px-4 py-8'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
