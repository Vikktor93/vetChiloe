import { useState } from "react";
import { Home, Dog } from "lucide-react";
import { NavLink } from "react-router-dom";


const navItems = [
  { icon: Home, label: "Inicio", ref : "home" },
  { icon: Dog, label: "Pacientes", ref: "pacientes" },
];

export default function Sidebar({
  menuTitle = "MENÚ",
  accentColor = "#FFB700",
  bgMenu = "#1E1E1E",
}) {
  const [active, setActive] = useState("Inicio");

  return (
    <div
      className="flex flex-col h-full w-full py-8 px-4 select-none"
      style={{
        background: `${bgMenu}`,
      }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center justify-center mb-2">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg mb-3"
          style={{ background: accentColor }}
        >
          <span className="text-2xl text-bold text-[#FFFF]"> VC</span>
        </div>
        <span
          className="tracking-widest uppercase"
          style={{
            color: "#FFFFFF",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
          }}
        >
          vetchiloe
        </span>
      </div>

      {/* Separator */}
      <div
        className="w-full my-5 rounded-full"
        style={{
          height: "1.5px",
          background: "#FFFFFF",
          opacity: 0.18,
        }}
      />

      {/* Menu Label */}
      <div className="flex justify-center mb-4">
        <span
          className="tracking-widest uppercase"
          style={{
            color: "#FFFFFF",
            opacity: 0.5,
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
          }}
        >
          {menuTitle}
        </span>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ icon: Icon, label, ref }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group w-full text-left"
              style={{
                background: isActive ? `${accentColor}33` : "transparent",
                borderLeft: isActive
                  ? `3px solid ${accentColor}`
                  : "3px solid transparent",
                color: "#FFFFFF",
                opacity: isActive ? 1 : 0.65,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.opacity = "0.65";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <NavLink to={`/${ref}`} style={{ fontSize: "0.88rem" }}>{label}</NavLink>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
