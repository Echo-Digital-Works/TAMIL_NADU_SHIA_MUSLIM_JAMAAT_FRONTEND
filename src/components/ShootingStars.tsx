import React, { useEffect, useState } from 'react';

const ShootingStars: React.FC = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    // Generate 6 shooting stars with random properties
    const newStars = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 80 + 20}%`, // Bias towards right side (20% to 100%)
      top: `-${Math.random() * 20}%`, // Start above the screen
      delay: `${Math.random() * 10}s`, // Random delay up to 10s
      duration: `${Math.random() * 2 + 3}s`, // 3s to 5s duration
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>
        {`
          @keyframes shootingStarAnim {
            0% {
              transform: rotate(135deg) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              transform: rotate(135deg) translateX(2000px);
              opacity: 0;
            }
          }
          .shooting-star-line {
             width: 150px;
             height: 1px;
             background: linear-gradient(90deg, transparent, rgba(212, 175, 98, 0.8), rgba(255,255,255,1));
          }
          .shooting-star-line::after {
             content: '';
             position: absolute;
             right: 0;
             top: -1px;
             width: 3px;
             height: 3px;
             background: white;
             border-radius: 50%;
             box-shadow: 0 0 15px 3px rgba(212, 175, 98, 0.9);
          }
        `}
      </style>
      
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute shooting-star-line"
          style={{
            top: star.top,
            left: star.left,
            animation: `shootingStarAnim ${star.duration} linear infinite`,
            animationDelay: star.delay,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

export default ShootingStars;
