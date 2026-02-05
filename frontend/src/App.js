import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BookingProvider>
          <Router>
            <Box minH="100vh" bg="brand.primary">
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </Box>
          </Router>
        </BookingProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
