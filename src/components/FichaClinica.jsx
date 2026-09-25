import { useState, useRef } from "react";
import ReactCardFlipModule from "react-card-flip";
import { motion } from "motion/react";

const ReactCardFlip = ReactCardFlipModule.default;

const round = (value, precision = 2) => parseFloat(value.toFixed(precision));
const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

function FichaClinica({ paciente }) {
  const [rotations, setRotations] = useState({ x: 0, y: 0, z: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const isAnimatingRef = useRef(false);

  const animate = (event) => {
    isAnimatingRef.current = true;

    const rect = event.currentTarget.getBoundingClientRect();

    const absolute = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    const percent = {
      x: round((100 / rect.width) * absolute.x),
      y: round((100 / rect.height) * absolute.y),
    };

    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    setRotations({
      x: round(((center.x > 50 ? 1 : -1) * center.x) / 12),
      y: round(center.y / 16),
      z: round(distance(percent.x, percent.y, 50, 50) / 20),
    });

    setGlare({
      x: percent.x,
      y: percent.y,
      opacity: 0.25,
    });
  };

  const stopAnimating = () => {
    isAnimatingRef.current = false;

    setTimeout(() => {
      if (isAnimatingRef.current) return;
      setRotations({ x: 0, y: 0, z: 2 });
      setGlare({ x: 50, y: 50, opacity: 0 });
    }, 100);
  };

  return (
    <div className="m-16">
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        {/* Frente de la tarjeta */}
        <motion.div
          onMouseMove={animate}
          onMouseLeave={stopAnimating}
          onClick={() => setIsFlipped(true)}
          animate={{
            rotateY: rotations.x,
            rotateX: rotations.y,
            transformPerspective: rotations.z * 100,
          }}
          style={{
            width: "288px",
            height: "384px",
            borderRadius: "0.5rem",
            boxShadow:
              "0 0 0 1px rgba(0,0,0,0.105), 0 9px 20px 0 rgba(0,0,0,0.02), 0 1px 2px 0 rgba(0,0,0,0.106)",
            backgroundImage: `url(${paciente.imagen})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transformStyle: "preserve-3d",
            transformOrigin: "center",
            perspective: "600px",
            cursor: "pointer",
          }}
          className="relative flex flex-col justify-end p-6 border"
        >
          {/* Glare overlay */}
          <motion.div
            style={{
              zIndex: 2,
              mixBlendMode: "overlay",
              position: "absolute",
              inset: 0,
              transform: "translateZ(1px)",
              borderRadius: "0.5rem",
              transformStyle: "preserve-3d",
              pointerEvents: "none",
            }}
            animate={{
              background: `radial-gradient(
                farthest-corner circle at ${glare.x}% ${glare.y}%,
                rgba(255, 255, 255, 0.7) 10%,
                rgba(255, 255, 255, 0.5) 24%,
                rgba(0, 0, 0, 0.8) 82%
              )`,
              opacity: glare.opacity,
            }}
          />

          <div className="relative z-10 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            <h3 className="font-bold text-sm rounded">{paciente.nombre}</h3>
            <p className="text-[15px] font-bold p-1 rounded">
              N°: {paciente.numero_atencion}
            </p>
            <span className="text-[15px] font-bold rounded text-center">
              Ver Ficha
            </span>
          </div>
        </motion.div>

        {/* Reverso de la tarjeta */}
        <div
          onClick={() => setIsFlipped(false)}
          style={{ width: "288px", height: "384px" }}
          className="p-6 bg-white cursor-pointer flex flex-col justify-end gap-2 border rounded-lg shadow"
        >
          <h3 className="mb-2 font-bold">{paciente.nombre}</h3>
          <div className="w-full text-xs space-y-1">
            <p><strong>Especie:</strong> {paciente.especie}</p>
            <p><strong>Raza:</strong> {paciente.raza}</p>
            <p><strong>Edad:</strong> {paciente.edad}</p>
            <p><strong>Motivo:</strong> {paciente.motivo}</p>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default FichaClinica;