import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Custom hook that uses IntersectionObserver to detect when an element
 * enters the viewport, enabling scroll-triggered animations.
 */
export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px', once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
};

/**
 * Returns CSS class string for scroll-reveal animations.
 * Combine with the useScrollReveal hook.
 */
export const getRevealClass = (
  isVisible: boolean,
  direction: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade' = 'up',
  delay: number = 0
): string => {
  const baseClass = 'transition-all duration-700 ease-out';
  const delayClass = delay > 0 ? `delay-[${delay}ms]` : '';

  if (!isVisible) {
    const hiddenStyles: Record<string, string> = {
      up: 'opacity-0 translate-y-8',
      down: 'opacity-0 -translate-y-8',
      left: 'opacity-0 translate-x-8',
      right: 'opacity-0 -translate-x-8',
      scale: 'opacity-0 scale-95',
      fade: 'opacity-0',
    };
    return `${baseClass} ${delayClass} ${hiddenStyles[direction]}`;
  }

  return `${baseClass} ${delayClass} opacity-100 translate-x-0 translate-y-0 scale-100`;
};

export default useScrollReveal;
