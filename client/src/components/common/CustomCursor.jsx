import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default'); // 'default', 'hover', 'text', 'click', 'hidden'
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default true until check
  const [ripples, setRipples] = useState([]);
  const rippleIdCounter = useRef(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth trailing effect
  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const dotSpringConfig = { damping: 45, stiffness: 750, mass: 0.15 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Detect touch device / pointer precision
    const checkTouch = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      setIsTouchDevice(!hasFinePointer);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouchDevice) return () => window.removeEventListener('resize', checkTouch);

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // If cursor was off-screen or hidden, restore it
      if (cursorType === 'hidden') {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setCursorType('hidden');
    };

    const handleMouseEnter = () => {
      setCursorType('default');
    };

    const handleMouseDown = (e) => {
      setCursorType('click');
      
      // Spawn ripple
      const newRipple = {
        id: rippleIdCounter.current++,
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev, newRipple]);
    };

    const handleMouseUp = () => {
      setCursorType('default');
    };

    // Global event delegation for hover states
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.closest('.interactive-cursor') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select');

      const isText = 
        (target.tagName === 'INPUT' && ['text', 'email', 'password', 'search', 'tel', 'url'].includes(target.type)) ||
        target.tagName === 'TEXTAREA' ||
        target.closest('[contenteditable="true"]');

      if (isText) {
        setCursorType('text');
      } else if (isInteractive) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice, mouseX, mouseY, cursorType]);

  // Clean up ripples after their animation finishes
  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  if (isTouchDevice || cursorType === 'hidden') return null;

  // Variants for the outer cursor ring based on the state
  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      border: '1.5px solid rgba(139, 92, 246, 0.75)', // violet-500
      backgroundColor: 'rgba(139, 92, 246, 0.02)',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(139, 92, 246, 0.15)',
    },
    hover: {
      width: 56,
      height: 56,
      border: '2px solid rgba(99, 102, 241, 0.9)', // indigo-500
      backgroundColor: 'rgba(99, 102, 241, 0.15)', // light purple glow fill
      borderRadius: '50%',
      boxShadow: '0 0 18px rgba(99, 102, 241, 0.4)',
    },
    text: {
      width: 4,
      height: 24,
      border: 'none',
      backgroundColor: 'rgba(139, 92, 246, 0.85)',
      borderRadius: '2px',
      boxShadow: '0 0 8px rgba(139, 92, 246, 0.4)',
    },
    click: {
      width: 24,
      height: 24,
      border: '2px solid rgba(139, 92, 246, 0.9)',
      backgroundColor: 'rgba(139, 92, 246, 0.3)',
      borderRadius: '50%',
      boxShadow: '0 0 12px rgba(139, 92, 246, 0.5)',
    }
  };

  // Variants for the inner solid dot
  const dotVariants = {
    default: {
      scale: 1,
      backgroundColor: '#8b5cf6', // violet-500
      boxShadow: '0 0 6px rgba(139, 92, 246, 0.5)'
    },
    hover: {
      scale: 0.5,
      backgroundColor: '#6366f1', // indigo-500
      boxShadow: '0 0 8px rgba(99, 102, 241, 0.6)'
    },
    text: {
      scale: 0, // hide dot when typing
    },
    click: {
      scale: 0.8,
      backgroundColor: '#4f46e5', // indigo-600
    }
  };

  return (
    <>
      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed pointer-events-none z-[99999] rounded-full border border-violet-500/80"
          initial={{
            left: ripple.x,
            top: ripple.y,
            x: '-50%',
            y: '-50%',
            width: 0,
            height: 0,
            opacity: 1
          }}
          animate={{
            width: 80,
            height: 80,
            opacity: 0
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut'
          }}
          onAnimationComplete={() => removeRipple(ripple.id)}
        />
      ))}

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        variants={ringVariants}
        animate={cursorType}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
          mass: 0.3
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full w-2 h-2 will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        variants={dotVariants}
        animate={cursorType}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 700,
          mass: 0.1
        }}
      />
    </>
  );
}
