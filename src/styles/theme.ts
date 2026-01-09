export const theme = {
  colors: {
    background: "#F7F5F0",
    card: "#FFFFFF",
    text: "#1E293B",
    textLight: "#64748B",
    border: "#E2E8F0",
    
    brand: {
      primary: "#007C91",
      hover: "#006776",
    },
    
    cta: {
      primary: "#FF6B6B",
      hover: "#E85C5C",
    },
    
    button: {
      primary: "#007C91",
      hover: "#006776",
    },
    
    status: {
      success: "#4E9B70",
      successLight: "#ECFDF5",
      successHover: "#3D7A59",
      warning: "#E39E3A",
      warningLight: "#FFFBEB",
      warningHover: "#C4872E",
      error: "#D94F4F",
      errorLight: "#FEF2F2",
      errorHover: "#B91C1C",
      info: "#0EA5E9",
      infoLight: "#EFF6FF",
      infoHover: "#0284C7",
      disabled: "#9BA5A0",
    },
    
    white: "#FFFFFF",
    black: "#000000",
  },
  
  typography: {
    fontFamily: {
      heading: "'Poppins', sans-serif",
      body: "'Inter', sans-serif",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  
  borderRadius: {
    button: "8px",
    card: "16px",
    full: "9999px",
  },
  
  shadows: {
    card: "0 2px 8px rgba(0, 0, 0, 0.08)",
    cardHover: "0 4px 12px rgba(0, 0, 0, 0.12)",
    focus: "0 0 0 3px rgba(0, 124, 145, 0.1)",
  },
  
  breakpoints: {
    mobile: "640px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1280px",
  },
  
  transitions: {
    fast: "150ms ease-in-out",
    normal: "300ms ease-in-out",
    slow: "500ms ease-in-out",
  },
};

export type Theme = typeof theme;


