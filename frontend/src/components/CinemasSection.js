import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
  Button,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

const MotionBox = motion(Box);

const cinemasData = [
  {
    id: 1,
    name: 'Cineluxor Landmark 81',
    type: 'FLAGSHIP',
    address: 'Tầng 5, Landmark 81, Bình Thạnh, TP.HCM',
    features: ['IMAX', '4DX', 'Dolby Atmos', 'VIP Lounge'],
    showtimes: ['09:30', '11:45', '14:00', '16:30', '19:00', '21:30'],
  },
  {
    id: 2,
    name: 'Cineluxor Times City',
    type: 'FLAGSHIP',
    address: 'Tầng 4, Times City, Hai Bà Trưng, Hà Nội',
    features: ['IMAX', '4DX', 'ScreenX'],
    showtimes: ['09:00', '11:30', '14:00', '16:30', '19:00', '21:30'],
  },
  {
    id: 3,
    name: 'Cineluxor Vincom Đồng Khởi',
    type: 'PREMIUM',
    address: 'Tầng 6, Vincom Center, Quận 1, TP.HCM',
    features: ['Dolby Atmos', 'VIP Lounge', 'Premium'],
    showtimes: ['10:00', '12:30', '15:00', '17:30', '20:00', '22:30'],
  },
  {
    id: 4,
    name: 'Cineluxor Royal City',
    type: 'PREMIUM',
    address: 'Tầng 5, Royal City, Thanh Xuân, Hà Nội',
    features: ['4DX', 'ScreenX', 'Dolby Atmos'],
    showtimes: ['09:30', '12:00', '14:30', '17:00', '19:30', '22:00'],
  },
];

const CinemaCard = ({ cinema, selectedShowtime, onShowtimeSelect }) => {
  return (
    <MotionBox
      bg="linear-gradient(145deg, #1a1a25 0%, #12121a 100%)"
      border="1px solid"
      borderColor="brand.border"
      borderRadius="20px"
      p={6}
      position="relative"
      overflow="hidden"
      whileHover={{ x: 10, borderColor: '#d4af37' }}
      transition={{ duration: 0.3 }}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        bgGradient: 'linear(to-b, brand.gold, brand.goldLight)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
      }}
      _hover={{
        _before: { opacity: 1 },
      }}
    >
      {/* Header */}
      <HStack justify="space-between" align="start" mb={4}>
        <Heading fontFamily="heading" fontSize="1.4rem" fontWeight="600">
          {cinema.name}
        </Heading>
        <Badge
          bgGradient="linear(135deg, brand.gold, brand.goldLight)"
          color="brand.primary"
          px={3}
          py={1}
          borderRadius="6px"
          fontSize="0.75rem"
          fontWeight="700"
        >
          {cinema.type}
        </Badge>
      </HStack>

      {/* Address */}
      <Text color="text.secondary" fontSize="0.9rem" mb={4}>
        📍 {cinema.address}
      </Text>

      {/* Features */}
      <Wrap spacing={2} mb={6}>
        {cinema.features.map((feature, index) => (
          <WrapItem key={index}>
            <Badge
              bg="rgba(123, 44, 191, 0.15)"
              color="#a855f7"
              px={3}
              py={1}
              borderRadius="6px"
              fontSize="0.8rem"
              fontWeight="500"
            >
              {feature}
            </Badge>
          </WrapItem>
        ))}
      </Wrap>

      {/* Showtimes */}
      <Wrap spacing={2}>
        {cinema.showtimes.map((time, index) => (
          <WrapItem key={index}>
            <Button
              size="sm"
              variant={selectedShowtime === `${cinema.id}-${time}` ? 'gold' : 'outline'}
              px={4}
              py={2}
              fontSize="0.85rem"
              onClick={() => onShowtimeSelect(cinema, time)}
            >
              {time}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </MotionBox>
  );
};

const CinemasSection = () => {
  const [selectedShowtime, setSelectedShowtime] = useState('1-14:00');
  const { selectCinema, selectShowtime } = useBooking();

  const handleShowtimeSelect = (cinema, time) => {
    setSelectedShowtime(`${cinema.id}-${time}`);
    selectCinema(cinema);
    selectShowtime({ cinema, time });
    // Scroll to booking section
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      as="section"
      id="cinemas"
      py={24}
      bg="brand.secondary"
      position="relative"
      zIndex={2}
    >
      <Container maxW="1200px">
        {/* Section Header */}
        <MotionBox
          textAlign="center"
          mb={16}
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
            📍 Hệ Thống Rạp
          </Text>
          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '2rem', md: '3rem' }}
            fontWeight="700"
            mb={4}
          >
            Chọn Rạp & Suất Chiếu
          </Heading>
          <Text color="text.secondary" fontSize="1.1rem" maxW="600px" mx="auto">
            15 rạp chiếu phim cao cấp tại các thành phố lớn
          </Text>
        </MotionBox>

        {/* Cinemas Grid */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          {cinemasData.map((cinema, index) => (
            <MotionBox
              key={cinema.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CinemaCard
                cinema={cinema}
                selectedShowtime={selectedShowtime}
                onShowtimeSelect={handleShowtimeSelect}
              />
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default CinemasSection;
