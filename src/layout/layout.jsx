import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <div className=" flex font-sans bg-[#353535] w-full min-h-screen max-h-screen">
      <div className=" w-1/6">
        <Sidebar />
      </div>
      <div className="flex flex-col w-5/6 max-h-screen">
        <header className=" flex flex-col  w-full h-auto justify-center">
          <h1 className="text-3xl">
            Sistema de Información - Veterinaria Chiloé
          </h1>
          <p>Plataforma de control y seguimiento de pacientes</p>
        </header>

        <main className="flex-1 mt-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
