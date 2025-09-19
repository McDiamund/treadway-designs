import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    const checkTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    
    setIsTouchDevice(checkTouchDevice());
    
    // If it's a touch device, don't set up mouse event listeners
    if (checkTouchDevice()) {
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.onclick || target.style.cursor === 'pointer' || window.getComputedStyle(target).cursor === 'pointer') {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  // Don't render custom cursor on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
      style={{
        left: cursorPosition.x,
        top: cursorPosition.y,
      }}
    />
  );
};

export default CustomCursor;
