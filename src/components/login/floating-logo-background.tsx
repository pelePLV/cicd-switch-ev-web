import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface FloatingLogoBackgroundProps {
  src: StaticImageData | string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const FloatingLogoBackground: React.FC<FloatingLogoBackgroundProps> = ({ src, position }) => {
  // Define position-specific styles
  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return {
          container: 'absolute -left-[200px] top-0 z-[1] h-[300px] w-[460px] hidden md:block',
          gradient: 'absolute inset-0 z-[1] bg-gradient-to-br from-white to-white/5 pointer-events-none'
        };
      case 'top-right':
        return {
          container: 'absolute -right-[100px] top-0 z-[1] h-[300px] w-[460px] hidden md:block',
          gradient: 'absolute inset-0 z-[1] bg-gradient-to-bl from-white to-white/5 pointer-events-none'
        };
      case 'bottom-left':
        return {
          container: 'absolute -left-[200px] bottom-0 z-[1] h-[380px] w-[620px] hidden md:block',
          gradient: 'absolute inset-0 z-[1] bg-gradient-to-tr from-white to-white/5 pointer-events-none'
        };
      case 'bottom-right':
        return {
          container: 'absolute -right-[200px] bottom-0 z-[1] h-[380px] w-[620px] hidden md:block',
          gradient: 'absolute inset-0 z-[1] bg-gradient-to-tl from-white to-white/5 pointer-events-none'
        };
      default:
        return {
          container: 'absolute top-0 left-0 z-[1] h-[300px] w-[460px] hidden md:block',
          gradient: 'absolute inset-0 z-[1] bg-gradient-to-br from-white to-white/5 pointer-events-none'
        };
    }
  };

  const styles = getPositionStyles();

  return (
    <div className={styles.container}>
      <Image
        src={src}
        alt="floating-logo"
        fill
        className="object-contain"
        draggable={false}
      />
      <div className={styles.gradient} />
    </div>
  );
};
