import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BottomNav } from './BottomNav';
import { Calendar } from './Calendar';
import { Clock } from './Clock';
import { Weather } from './Weather';

interface MirrorRippleProps {
  isActive: boolean;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  delay: number;
}

export function MirrorRipple({ isActive }: MirrorRippleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let ripples: Ripple[] = [];

    const createRippleGroup = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      
      // Create 2-5 ripples at the same location with different delays
      const numRipples = 2 + Math.floor(Math.random() * 4);
      
      for (let i = 0; i < numRipples; i++) {
        ripples.push({
          x,
          y,
          radius: 0,
          alpha: 0.8, // Higher initial alpha
          speed: 2 + Math.random(), // Faster expansion
          delay: i * 15 // Stagger the ripples
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Slower fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw ripples
      ripples = ripples.filter(ripple => {
        if (ripple.delay > 0) {
          ripple.delay--;
          return true;
        }

        ripple.radius += ripple.speed;
        // Slower alpha decay
        ripple.alpha *= 0.995;

        if (ripple.alpha <= 0.01) return false;

        // Draw ripple
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(128, 128, 128, ${ripple.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        return true;
      });

      // Create new ripple groups less frequently
      if (Math.random() < 0.02) {
        createRippleGroup();
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isActive]);

  return (
    <div className="relative h-screen">
      {/* Motion Canvas */}
      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="fixed inset-0 w-full h-full bg-black"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Clock */}
      <div className="absolute top-0 mt-4 left-[23px] top-[25px]">
        <Clock />
      </div>
  
      {/* Calendar */}
      <div className="absolute top-[173px] ml-[35px]">
        <Calendar />
      </div>
      <div className="left-[1000px]">
        <Weather/>
      </div>
      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <BottomNav showMakeupButton={true} />
      </div>
    </div>
  );
}  