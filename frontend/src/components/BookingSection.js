import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import SeatSelection from './SeatSelection';
import { useBooking } from '../context/BookingContext';

const MotionBox = motion(Box);

const BookingStep = ({ number, label, isActive, isCompleted }) => (
  <VStack spacing={3} position="relative" zIndex={1}>
    <Flex
      w="50px"
      h="50px"
      bg={isCompleted ? '#22c55e' : isActive ? 'linear-gradient(135deg, #d4af37, #f4d03f)' : 'brand.card'}
      border={!isActive && !isCompleted ? '2px solid' : 'none'}
      borderColor="brand.border"
      borderRadius="full"
      align="center"
      justify="center"
      fontWeight="700"
      fontSize="1.1rem"
      color={isActive ? 'brand.primary' : 'white'}
      boxShadow={isActive ? '0 0 40px rgba(212, 175, 55, 0.3)' : 'none'}
    >
      {isCompleted ? <CheckIcon /> : number}
    </Flex>
    <Text
      color={isActive ? 'brand.gold' : 'text.muted'}
      fontSize="0.85rem"
      fontWeight="500"
      display={{ base: 'none', md: 'block' }}
    >
      {label}
    </Text>
  </VStack>
);

const BookingSection = () => {
  const toast = useToast();
  const {
    movie,
    cinema,
    showtime,
    selectedSeats,
    addSeat,
    removeSeat,
    promoCode,
    setPromo,
    seatTotal,
    discountAmount,
    total,
  } = useBooking();

  const [promoInput, setPromoInput] = useState('');

  const handleSeatToggle = (seat) => {
    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    if (isSelected) {
      removeSeat(seat);
    } else {
      addSeat(seat);
    }
  };

  const handleApplyPromo = () => {
    if (promoInput.toUpperCase() === 'CINELUX20') {
      setPromo('CINELUX20', 20);
      toast({
        title: 'Áp dụng mã giảm giá thành công!',
        description: 'Bạn được giảm 20% cho đơn hàng này',
        status: 'success',
        duration: 3000,
      });
    } else {
      toast({
        title: 'Mã giảm giá không hợp lệ',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handlePayment = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: 'Vui lòng chọn ghế',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    toast({
      title: '🎉 Thanh toán thành công!',
      description: 'Vé của bạn đã được đặt. Kiểm tra email để nhận mã QR.',
      status: 'success',
      duration: 5000,
    });
  };

  const displayMovie = movie || {
    title: 'Avatar: Fire and Ash',
    poster: '/images/booking-summary.png',
  };

  const displayCinema = cinema || { name: 'Cineluxor Landmark 81' };
  const displayShowtime = showtime?.time || '14:00';

  return (
    <Box
      as="section"
      id="booking"
      py={24}
      bgGradient="linear(180deg, brand.primary 0%, brand.secondary 100%)"
      position="relative"
      zIndex={2}
    >
      <Container maxW="1000px">
        <MotionBox
          textAlign="center"
          mb={12}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Text
            color="brand.gold"
            fontSize="0.85rem"
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="3px"
            mb={4}
          >
            🎟️ Đặt Vé Online
          </Text>
          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '2rem', md: '3rem' }}
            fontWeight="700"
            mb={4}
          >
            Chọn Ghế Yêu Thích
          </Heading>
          <Text color="text.secondary" fontSize="1.1rem">
            Đặt vé dễ dàng chỉ trong 3 bước đơn giản
          </Text>
        </MotionBox>

        <HStack justify="center" spacing={{ base: 8, md: 16 }} mb={12} position="relative">
          <Box
            position="absolute"
            top="25px"
            left="15%"
            right="15%"
            h="2px"
            bg="brand.border"
            zIndex={0}
            display={{ base: 'none', md: 'block' }}
          />
          <BookingStep number={1} label="Chọn phim" isCompleted={!!movie} />
          <BookingStep number={2} label="Chọn suất" isCompleted={!!showtime} />
          <BookingStep number={3} label="Chọn ghế" isActive={true} />
          <BookingStep number={4} label="Thanh toán" />
        </HStack>

        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SeatSelection selectedSeats={selectedSeats} onSeatToggle={handleSeatToggle} />
        </MotionBox>

        <MotionBox
          mt={8}
          bg="linear-gradient(145deg, #1a1a25 0%, #12121a 100%)"
          border="1px solid"
          borderColor="brand.border"
          borderRadius="20px"
          p={8}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HStack
            spacing={6}
            pb={6}
            borderBottom="1px solid"
            borderColor="brand.border"
            mb={6}
            flexDir={{ base: 'column', sm: 'row' }}
            align={{ base: 'center', sm: 'start' }}
          >
            <Image
              src={displayMovie.poster}
              alt={displayMovie.title}
              w="100px"
              h="150px"
              borderRadius="12px"
              objectFit="cover"
            />
            <VStack align={{ base: 'center', sm: 'start' }} spacing={1}>
              <Heading fontFamily="heading" fontSize="1.5rem">
                {displayMovie.title}
              </Heading>
              <Text color="text.secondary" fontSize="0.9rem">
                🎬 IMAX 3D • Phụ đề Việt
              </Text>
              <Text color="text.secondary" fontSize="0.9rem">
                📍 {displayCinema.name}
              </Text>
              <Text color="text.secondary" fontSize="0.9rem">
                🕐 {displayShowtime} - Thứ 7, 15/02/2025
              </Text>
            </VStack>
          </HStack>

          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} mb={6}>
            <Box bg="brand.secondary" p={4} borderRadius="12px">
              <Text color="text.muted" fontSize="0.8rem" mb={1}>Phòng chiếu</Text>
              <Text fontWeight="600">IMAX Hall 1</Text>
            </Box>
            <Box bg="brand.secondary" p={4} borderRadius="12px">
              <Text color="text.muted" fontSize="0.8rem" mb={1}>Ghế đã chọn</Text>
              <Text fontWeight="600">
                {selectedSeats.length > 0 ? selectedSeats.map((s) => s.id).join(', ') : 'Chưa chọn'}
              </Text>
            </Box>
            <Box bg="brand.secondary" p={4} borderRadius="12px">
              <Text color="text.muted" fontSize="0.8rem" mb={1}>Số lượng vé</Text>
              <Text fontWeight="600">{selectedSeats.length} vé</Text>
            </Box>
            <Box bg="brand.secondary" p={4} borderRadius="12px">
              <Text color="text.muted" fontSize="0.8rem" mb={1}>Loại vé</Text>
              <Text fontWeight="600">VIP - IMAX 3D</Text>
            </Box>
          </SimpleGrid>

          <Box mb={6}>
            <InputGroup size="lg">
              <Input
                placeholder="Nhập mã giảm giá (thử: CINELUX20)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                bg="brand.secondary"
                border="1px solid"
                borderColor="brand.border"
                borderRadius="10px"
                _focus={{ borderColor: 'brand.gold' }}
              />
              <InputRightElement w="auto" pr={1}>
                <Button variant="gold" size="sm" onClick={handleApplyPromo}>
                  Áp dụng
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>

          <VStack spacing={3} align="stretch" mb={6}>
            <HStack justify="space-between">
              <Text color="text.secondary">Tiền vé</Text>
              <Text>{seatTotal.toLocaleString()}đ</Text>
            </HStack>
            <HStack justify="space-between">
              <Text color="text.secondary">Phụ phí IMAX 3D</Text>
              <Text>{(selectedSeats.length * 30000).toLocaleString()}đ</Text>
            </HStack>
            {promoCode && (
              <HStack justify="space-between">
                <Text color="text.secondary">Mã giảm giá {promoCode}</Text>
                <Text color="#22c55e">-{discountAmount.toLocaleString()}đ</Text>
              </HStack>
            )}
            <HStack
              justify="space-between"
              pt={4}
              borderTop="1px solid"
              borderColor="brand.border"
            >
              <Text fontWeight="600" fontSize="1.1rem">Tổng thanh toán</Text>
              <Text
                fontFamily="heading"
                fontSize="1.5rem"
                fontWeight="700"
                color="brand.gold"
              >
                {(total + selectedSeats.length * 30000).toLocaleString()}đ
              </Text>
            </HStack>
          </VStack>

          <Button
            variant="gold"
            size="lg"
            w="full"
            leftIcon={<Text>💳</Text>}
            onClick={handlePayment}
          >
            Thanh Toán Ngay
          </Button>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default BookingSection;
