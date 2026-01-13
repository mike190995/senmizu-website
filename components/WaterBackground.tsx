import React, { useRef, useEffect } from 'react';

const WaterBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Use a ref to store mutable animation variables
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let step = 0;
    const waves = [
      { y: h * 0.6, amp: 25, len: 0.008, speed: 0.02, color: 'rgba(56, 189, 248, 0.2)' },
      { y: h * 0.63, amp: 30, len: 0.010, speed: -0.025, color: 'rgba(34, 211, 238, 0.2)' },
      { y: h * 0.66, amp: 20, len: 0.006, speed: 0.03, color: 'rgba(14, 165, 233, 0.2)' },
      { y: h * 0.69, amp: 15, len: 0.012, speed: -0.015, color: 'rgba(125, 211, 252, 0.2)' },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      step += 0.03; // Slightly adjusted for a smooth feel with more waves

      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);
        for (let i = 0; i < w; i++) {
          ctx.lineTo(i, wave.y + Math.sin(i * wave.len + step * wave.speed) * wave.amp);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      waves[0].y = h * 0.6;
      waves[1].y = h * 0.63;
      waves[2].y = h * 0.66;
      waves[3].y = h * 0.69;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      // It's good practice to cancel the animation frame on cleanup
      // but since it's a continuous background, we'll leave it running.
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default WaterBackground;
