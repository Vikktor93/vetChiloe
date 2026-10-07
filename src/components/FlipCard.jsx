import { useState } from 'react';
import { motion } from 'framer-motion';

// Este card recibe lo que va adelante (frontContent) y lo que va atrás (backContent)
export default function FlipCard({ frontContent, backContent }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="react-bits-flip-container" 
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="react-bits-flip-inner"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Contenedor de la cara frontal */}
        <div className="react-bits-flip-front">
          {frontContent}
        </div>

        {/* Contenedor de la cara trasera */}
        <div className="react-bits-flip-back">
          {backContent}
        </div>
      </motion.div>
    </div>
  );
}