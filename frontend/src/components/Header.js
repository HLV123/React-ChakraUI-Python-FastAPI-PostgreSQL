import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  Image,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const navLinks = [
  { name: 'Phim đang chiếu', href: '/#movies' },
  { name: 'Rạp chiếu', href: '/#cinemas' },
  { name: 'Đặt vé', href: '/#booking' },
  { name: 'Khuyến mãi', href: '/#promos' },
  { name: 'Thành viên', href: '/#membership' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAuthOpen, onOpen: onAuthOpen, onClose: onAuthClose } = useDisclosure();
  const [authMode, setAuthMode] = useState('login');
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLogin = () => {
    setAuthMode('login');
    onAuthOpen();
  };

  const openRegister = () => {
    setAuthMode('register');
    onAuthOpen();
  };

  return (
    <>
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        px={{ base: 4, md: 8 }}
        py={scrolled ? 3 : 4}
        bg={scrolled ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0.8)'}
        backdropFilter="blur(20px)"
        borderBottom="1px solid"
        borderColor="rgba(212, 175, 55, 0.1)"
        transition="all 0.3s ease"
      >
        <Flex maxW="1400px" mx="auto" justify="space-between" align="center">
          {/* Logo */}
          <Link as={RouterLink} to="/" display="flex" alignItems="center" gap={3} _hover={{ textDecoration: 'none' }}>
            <Image 
              src="/images/logo.png" 
              alt="Cineluxor" 
              h="45px"
              objectFit="contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <HStack spacing={10} display={{ base: 'none', lg: 'flex' }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                color="text.secondary"
                fontWeight="500"
                fontSize="0.95rem"
                position="relative"
                _hover={{ color: 'brand.gold', textDecoration: 'none' }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  width: 0,
                  height: '2px',
                  bgGradient: 'linear(to-r, brand.gold, brand.goldLight)',
                  transition: 'width 0.3s ease',
                }}
                sx={{
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                {link.name}
              </Link>
            ))}
          </HStack>

          {/* Actions */}
          <HStack spacing={4}>
            {user ? (
              <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                <Text color="brand.gold" fontWeight="500">
                  Xin chào, {user.name}
                </Text>
                <Button variant="outline" size="sm" onClick={logout}>
                  Đăng xuất
                </Button>
              </HStack>
            ) : (
              <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                <Button variant="outline" onClick={openLogin}>
                  Đăng nhập
                </Button>
                <Button variant="gold" onClick={openRegister}>
                  Đăng ký
                </Button>
              </HStack>
            )}

            {/* Mobile Menu Button */}
            <IconButton
              display={{ base: 'flex', lg: 'none' }}
              aria-label="Open menu"
              icon={<HamburgerIcon boxSize={6} />}
              variant="ghost"
              color="white"
              onClick={onOpen}
            />
          </HStack>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(10px)" />
        <DrawerContent bg="brand.card" borderLeft="1px solid" borderColor="brand.border">
          <DrawerCloseButton color="white" />
          <DrawerHeader borderBottomWidth="1px" borderColor="brand.border">
            <Image src="/images/logo.png" alt="Cineluxor" h="40px" />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="stretch" mt={6}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  color="text.secondary"
                  fontWeight="500"
                  fontSize="1.1rem"
                  onClick={onClose}
                  _hover={{ color: 'brand.gold' }}
                >
                  {link.name}
                </Link>
              ))}
              <Box pt={6} borderTop="1px solid" borderColor="brand.border">
                {user ? (
                  <VStack spacing={4}>
                    <Text color="brand.gold">Xin chào, {user.name}</Text>
                    <Button variant="outline" w="full" onClick={logout}>
                      Đăng xuất
                    </Button>
                  </VStack>
                ) : (
                  <VStack spacing={4}>
                    <Button variant="outline" w="full" onClick={() => { onClose(); openLogin(); }}>
                      Đăng nhập
                    </Button>
                    <Button variant="gold" w="full" onClick={() => { onClose(); openRegister(); }}>
                      Đăng ký
                    </Button>
                  </VStack>
                )}
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={onAuthClose} mode={authMode} setMode={setAuthMode} />
    </>
  );
};

export default Header;
