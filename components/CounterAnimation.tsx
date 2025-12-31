import React, { useEffect, useState, useRef } from 'react';

interface CounterAnimationProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({ 
  end, 
  duration = 2000, 
  suffix = '',
  className = '' 
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          // Start Animation
          const startTime = Date.now();
          
          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            
            // Ease out cubic function for aesthetic slow-down at the end
            // 1 - (1 - x)^3
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            setCount(Math.floor(easeProgress * end));

            if (progress < 1) {
              animationRef.current = requestAnimationFrame(animate);
            } else {
              setCount(end); // Ensure it lands exactly on the number
            }
          };

          if (animationRef.current) cancelAnimationFrame(animationRef.current);
          animationRef.current = requestAnimationFrame(animate);

        } else {
          // Reset when out of view
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
          setCount(0);
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [end, duration]);

  return (
    <span ref={elementRef} className={className}>
      {count}{suffix}
    </span>
  );
};

export default CounterAnimation;