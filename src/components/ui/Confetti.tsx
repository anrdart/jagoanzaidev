import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotation: number;
}

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

const COLORS = ['#4a90a4', '#6b9b7a', '#d4765c', '#f59e0b', '#8b5cf6', '#ec4899', '#10b981'];

function generatePieces(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));
}

export default function Confetti({ active, onComplete }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      setPieces(generatePieces(50));
      const timer = setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  return (
    <AnimatePresence>
      {pieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute"
              initial={{
                top: '-5%',
                left: `${piece.x}%`,
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              animate={{
                top: '105%',
                opacity: 0,
                rotate: piece.rotation + 720,
                scale: 0.5,
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'easeIn',
              }}
            >
              <div
                style={{
                  width: piece.size,
                  height: piece.size * 0.6,
                  backgroundColor: piece.color,
                  borderRadius: '2px',
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
