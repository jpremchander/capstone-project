import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function RobotCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      setRobotPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1
      }));
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [mousePosition]);

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        left: robotPosition.x,
        top: robotPosition.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <motion.div
        className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white"
        animate={{
          rotate: (mousePosition.x - robotPosition.x) / 10,
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        🤖
      </motion.div>
    </motion.div>
  );
}