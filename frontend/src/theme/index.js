import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      primary: '#0a0a0f',
      secondary: '#12121a',
      card: '#1a1a25',
      gold: '#d4af37',
      goldLight: '#f4d03f',
      red: '#e63946',
      purple: '#7b2cbf',
      border: '#2a2a3a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0b0',
      muted: '#6a6a7a',
    },
  },
  fonts: {
    heading: `'Playfair Display', serif`,
    body: `'Be Vietnam Pro', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        bg: '#0a0a0f',
        color: '#ffffff',
        lineHeight: '1.6',
        fontFamily: `'Be Vietnam Pro', sans-serif`,
      },
      '*': {
        boxSizing: 'border-box',
      },
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: '#0a0a0f',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#d4af37',
        borderRadius: '4px',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: '10px',
        transition: 'all 0.3s ease',
      },
      variants: {
        gold: {
          bg: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)',
          color: '#0a0a0f',
          fontWeight: '700',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)',
          },
        },
        outline: {
          bg: 'transparent',
          border: '1px solid #2a2a3a',
          color: '#ffffff',
          _hover: {
            borderColor: '#d4af37',
            color: '#d4af37',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'linear-gradient(145deg, #1a1a25 0%, #12121a 100%)',
          border: '1px solid #2a2a3a',
          borderRadius: '20px',
          transition: 'all 0.4s ease',
        },
      },
    },
  },
});

export default theme;
