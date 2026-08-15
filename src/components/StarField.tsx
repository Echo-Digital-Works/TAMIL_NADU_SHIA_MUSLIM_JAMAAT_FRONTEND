import React, { useEffect, useState } from 'react';

const StarField: React.FC = () => {
  const [stars, setStars] = useState<{ id: number; left: string; top: string; delay: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `-${Math.random() * 40}s`,
      duration: `${Math.random() * 20 + 30}s`,
      size: `${Math.random() * 2 + 1}px`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-hero-gradient">
      <style>
        {`
          @keyframes starFlow {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(-10vw); opacity: 0; }
          }
        `}
      </style>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animation: `starFlow ${star.duration} linear infinite`,
            animationDelay: star.delay,
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.9)',
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
