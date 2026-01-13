import React, { useState, useEffect } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

const LightCursor: React.FC = () => {
    const { x, y } = useMousePosition();
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('[data-cursor-interactive]')) {
                setIsHovering(true);
            }
        };
        const handleMouseOut = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('[data-cursor-interactive]')) {
                setIsHovering(false);
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    useEffect(() => {
        const dot = document.querySelector('.custom-cursor-dot') as HTMLElement;
        const ring = document.querySelector('.custom-cursor-ring') as HTMLElement;
        
        const moveCursor = () => {
            if (dot) {
                dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            }
            if (ring) {
                ring.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${isHovering ? 1.5 : 1})`;
            }
        };

        moveCursor();
    }, [x, y, isHovering]);

    return (
        <>
            {/* Dot */}
            <div
                className={`custom-cursor-dot fixed top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary rounded-full pointer-events-none z-[9999]`}
            />
            {/* Ring */}
            <div
                className={`custom-cursor-ring fixed top-0 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 border-2 border-brand-primary rounded-full pointer-events-none z-[9999] transition-transform duration-300 ease-out`}
            />
        </>
    );
};

export default LightCursor;
