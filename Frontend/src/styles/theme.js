// Theme configuration for Healthcare Application
export const theme = {
  colors: {
    primary: {
      main: '#4A90E2',
      light: '#6BA5E7',
      dark: '#357ABD',
      accent: '#50E3C2',
    },
    secondary: {
      main: '#7ED321',
      light: '#95DD4A',
      dark: '#6BB919',
    },
    accent: {
      warning: '#FFA726',
      info: '#50E3C2',
      error: '#EF5350',
      success: '#7ED321',
    },
    neutral: {
      white: '#FFFFFF',
      lightGray: '#F5F5F5',
      gray: '#E0E0E0',
      darkGray: '#757575',
      text: '#333333',
      textLight: '#666666',
    },
    background: {
      main: '#FFFFFF',
      secondary: '#F5F5F5',
      card: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: "'Lato', 'Open Sans', 'Roboto', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: '700',
      lineHeight: '1.2',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: '600',
      lineHeight: '1.3',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: '600',
      lineHeight: '1.4',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: '500',
      lineHeight: '1.4',
    },
    body: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.6',
    },
    small: {
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.5',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
};

export default theme;
