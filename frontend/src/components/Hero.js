import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionHStack = motion(HStack);

const Hero = () => {
  return (
    <Box
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      pt="120px"
      pb={16}
      px={4}
    >
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
          }
          @keyframes bgFloat {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(30px, -30px); }
            66% { transform: translate(-20px, 20px); }
          }
          .pulse-dot {
            animation: pulse 2s infinite;
          }
          .bg-float::before {
            animation: bgFloat 20s ease-in-out infinite;
          }
        `}
      </style>

      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        _before={{
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(123, 44, 191, 0.03) 0%, transparent 50%)',
        }}
        className="bg-float"
      />

      {/* BACKGROUND IMAGE - TĂNG OPACITY LÊN ĐỂ THẤY RÕ */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage="/images/hero-bg.png"
        bgSize="cover"
        bgPosition="center"
        opacity={1}  // Tăng từ 0.15 → 0.4 (tăng gần 3 lần)
        filter="blur(1px)"  // Giảm blur từ 2px → 1px
      />

      {/* GRADIENT OVERLAY - GIẢM ĐỘ ĐẬM ĐỂ ẢNH NỔI BẬT HƠN */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(180deg, rgba(10, 10, 15, 0.7) 0%, rgba(10, 10, 15, 0.5) 50%, #0a0a0f 100%)"
        // Giảm từ 0.9 → 0.7 và 0.7 → 0.5 để ảnh nền hiện rõ hơn
      />

      <Box
        position="fixed"
        left={0}
        top={0}
        w="30px"
        h="100%"
        bgImage="repeating-linear-gradient(180deg, #1a1a25 0px, #1a1a25 20px, transparent 20px, transparent 30px)"
        opacity={0.3}
        zIndex={1}
        _after={{
          content: '""',
          position: 'absolute',
          right: 0,
          top: 0,
          width: '5px',
          height: '100%',
          bg: '#d4af37',
          opacity: 0.5,
        }}
      />

      <VStack
        position="relative"
        zIndex={2}
        maxW="1200px"
        textAlign="center"
        spacing={6}
      >
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HStack
            bg="rgba(212, 175, 55, 0.1)"
            border="1px solid"
            borderColor="rgba(212, 175, 55, 0.3)"
            px={4}
            py={2}
            borderRadius="full"
            spacing={2}
          >
            <Box
              w={2}
              h={2}
              borderRadius="full"
              bg="#d4af37"
              className="pulse-dot"
            />
            <Text color="#d4af37" fontSize="0.85rem" fontWeight="500">
              Hệ thống rạp chiếu phim cao cấp hàng đầu Việt Nam
            </Text>
          </HStack>
        </MotionBox>

        <MotionHeading
          as="h1"
          fontFamily="heading"
          fontSize={{ base: '2.5rem', md: '4rem', lg: '5rem' }}
          fontWeight="700"
          lineHeight="1.1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Trải Nghiệm Điện Ảnh
          <br />
          <Text
            as="span"
            bgGradient="linear(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)"
            bgClip="text"
          >
            Đỉnh Cao Luxury
          </Text>
        </MotionHeading>

        <MotionText
          fontSize={{ base: '1rem', md: '1.25rem' }}
          color="#a0a0b0"
          maxW="700px"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Đặt vé trực tuyến nhanh chóng, chọn ghế dễ dàng, tận hưởng công nghệ IMAX, 4DX, Dolby Atmos tại 15 rạp trên toàn quốc.
        </MotionText>

        <MotionHStack
          gap={4}
          flexWrap="wrap"
          justifyContent="center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            as="a"
            href="#movies"
            bg="linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)"
            color="#0a0a0f"
            size="lg"
            px={8}
            py={6}
            fontSize="1rem"
            fontWeight="700"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)',
            }}
          >
            🎟️ Đặt Vé Ngay
          </Button>
          <Button
            as="a"
            href="#cinemas"
            bg="transparent"
            border="1px solid #2a2a3a"
            color="white"
            size="lg"
            px={8}
            py={6}
            fontSize="1rem"
            _hover={{
              borderColor: '#d4af37',
              color: '#d4af37',
            }}
          >
            📍 Tìm Rạp Gần Bạn
          </Button>
        </MotionHStack>
      </VStack>
    </Box>
  );
};

export default Hero;