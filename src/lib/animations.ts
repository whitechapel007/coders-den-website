import { Variants } from 'framer-motion'

// Fade in animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const scaleOnHover: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeInOut' }
  }
}

// Stagger animations for lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// Slide animations
export const slideInLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export const slideInRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Bounce animation
export const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
      duration: 0.8
    }
  }
}

// Rotate animation
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
}

// Page transition animations
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
}

// Loading animations
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

export const spin: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
}

// Hover effects
export const hoverLift: Variants = {
  rest: { y: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  hover: {
    y: -4,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.2, ease: 'easeOut' }
  }
}

export const hoverGlow: Variants = {
  rest: { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
  hover: {
    boxShadow: '0 0 20px 0 rgba(59, 130, 246, 0.3)',
    transition: { duration: 0.3, ease: 'easeOut' }
  }
}

// Text animations
export const typewriter = {
  hidden: { width: 0 },
  visible: {
    width: 'auto',
    transition: {
      duration: 2,
      ease: 'easeInOut'
    }
  }
}

// Utility function for viewport animations
export const createViewportAnimation = (threshold = 0.1) => ({
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: threshold }
})

// Common transition presets
export const transitions = {
  smooth: { duration: 0.3, ease: 'easeInOut' },
  bouncy: { type: 'spring', damping: 15, stiffness: 300 },
  slow: { duration: 0.8, ease: 'easeOut' },
  fast: { duration: 0.15, ease: 'easeOut' }
}
