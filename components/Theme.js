export const Theme = {
  colors: {
    primary: '#4CAF50',      // Leaf Green
    secondary: '#6D4C41',    // Soil Brown
    accent: '#FFEB3B',       // Corn Yellow
    button: '#03A9F4',       // Sky Blue
    background: '#F5F5F5',   // Soft Off-White
    surface: '#FFFFFF',      // White
    text: '#333333',         // Dark Gray
    textSecondary: '#666666', // Medium Gray
    textLight: '#999999',    // Light Gray
    border: '#E0E0E0',       // Light Border
    shadow: '#000000',       // Shadow Color
    success: '#4CAF50',      // Success Green
    error: '#F44336',        // Error Red
    warning: '#FF9800',      // Warning Orange
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 50,
  },
  
  shadows: {
    small: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    large: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 12,
    },
  },
  
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#333333',
    },
    h2: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333333',
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      color: '#333333',
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#333333',
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: 'normal',
      color: '#333333',
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal',
      color: '#666666',
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  },
};

export default Theme; 