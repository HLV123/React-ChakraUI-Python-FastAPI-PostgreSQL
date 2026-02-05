import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose, mode, setMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await login({ email: formData.email, password: formData.password });
        toast({
          title: 'Đăng nhập thành công!',
          status: 'success',
          duration: 3000,
        });
      } else {
        await register(formData);
        toast({
          title: 'Đăng ký thành công!',
          description: 'Chào mừng bạn đến với Cineluxor!',
          status: 'success',
          duration: 3000,
        });
      }
      onClose();
      setFormData({ email: '', password: '', name: '', phone: '' });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: error.response?.data?.detail || 'Có lỗi xảy ra, vui lòng thử lại',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setFormData({ email: '', password: '', name: '', phone: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(10px)" />
      <ModalContent
        bg="brand.card"
        border="1px solid"
        borderColor="brand.border"
        borderRadius="24px"
        mx={4}
      >
        <ModalHeader
          fontFamily="heading"
          fontSize="1.5rem"
          borderBottom="1px solid"
          borderColor="brand.border"
          pb={4}
        >
          {mode === 'login' ? '🎬 Đăng Nhập' : '✨ Đăng Ký Tài Khoản'}
        </ModalHeader>
        <ModalCloseButton color="text.secondary" _hover={{ color: 'brand.gold' }} />
        <ModalBody py={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              {mode === 'register' && (
                <>
                  <FormControl isRequired>
                    <FormLabel color="text.secondary" fontSize="0.9rem">
                      Họ và tên
                    </FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                      bg="brand.secondary"
                      border="1px solid"
                      borderColor="brand.border"
                      borderRadius="10px"
                      _focus={{ borderColor: 'brand.gold' }}
                      _placeholder={{ color: 'text.muted' }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel color="text.secondary" fontSize="0.9rem">
                      Số điện thoại
                    </FormLabel>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                      bg="brand.secondary"
                      border="1px solid"
                      borderColor="brand.border"
                      borderRadius="10px"
                      _focus={{ borderColor: 'brand.gold' }}
                      _placeholder={{ color: 'text.muted' }}
                    />
                  </FormControl>
                </>
              )}
              <FormControl isRequired>
                <FormLabel color="text.secondary" fontSize="0.9rem">
                  Email
                </FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập email"
                  bg="brand.secondary"
                  border="1px solid"
                  borderColor="brand.border"
                  borderRadius="10px"
                  _focus={{ borderColor: 'brand.gold' }}
                  _placeholder={{ color: 'text.muted' }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="text.secondary" fontSize="0.9rem">
                  Mật khẩu
                </FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    bg="brand.secondary"
                    border="1px solid"
                    borderColor="brand.border"
                    borderRadius="10px"
                    _focus={{ borderColor: 'brand.gold' }}
                    _placeholder={{ color: 'text.muted' }}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      size="sm"
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                      color="text.muted"
                      _hover={{ color: 'brand.gold' }}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                variant="gold"
                w="full"
                size="lg"
                isLoading={loading}
                mt={2}
              >
                {mode === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}
              </Button>
              <Text color="text.secondary" fontSize="0.9rem">
                {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
                <Link color="brand.gold" onClick={toggleMode} cursor="pointer">
                  {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
                </Link>
              </Text>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
