import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

const MotionBox = motion(Box);

const fnbData = [
  {
    id: 1,
    name: 'Combo Bắp Nước',
    description: 'Bắp rang bơ lớn + Pepsi lớn',
    price: 89000,
    image: '/images/fnb-1.png',
  },
  {
    id: 2,
    name: 'Nachos Phô Mai',
    description: 'Nachos giòn với sốt phô mai đặc biệt',
    price: 75000,
    image: '/images/fnb-2.png',
  },
  {
    id: 3,
    name: 'Hot Dog Combo',
    description: 'Hot dog thơm ngon + Nước ngọt',
    price: 69000,
    image: '/images/fnb-3.png',
  },
  {
    id: 4,
    name: 'Trà Sữa Premium',
    description: 'Trà sữa trân châu hoặc matcha',
    price: 55000,
    image: '/images/fnb-4.png',
  },
];

const FnBCard = ({ item, onAdd }) => (
  <MotionBox
    bg="linear-gradient(145deg, #1a1a25 0%, #12121a 100%)"
    border="1px solid"
    borderColor="brand.border"
    borderRadius="16px"
    overflow="hidden"
    whileHover={{ y: -5, borderColor: '#d4af37' }}
    transition={{ duration: 0.3 }}
  >
    <Box h="180px" overflow="hidden">
      <Image
        src={item.image}
        alt={item.name}
        w="full"
        h="full"
        objectFit="cover"
        transition="transform 0.5s ease"
        _hover={{ transform: 'scale(1.1)' }}
      />
    </Box>
    <VStack p={5} align="start" spacing={2}>
      <Text fontWeight="600" fontSize="1.1rem">
        {item.name}
      </Text>
      <Text color="text.muted" fontSize="0.85rem">
        {item.description}
      </Text>
      <HStack justify="space-between" w="full" pt={2}>
        <Text
          fontFamily="heading"
          fontSize="1.25rem"
          fontWeight="700"
          color="brand.gold"
        >
          {item.price.toLocaleString()}đ
        </Text>
        <Button
          variant="gold"
          size="sm"
          w="40px"
          h="40px"
          borderRadius="10px"
          p={0}
          onClick={() => onAdd(item)}
        >
          <AddIcon />
        </Button>
      </HStack>
    </VStack>
  </MotionBox>
);

const FnBSection = () => {
  const toast = useToast();
  const { addFnB } = useBooking();

  const handleAddItem = (item) => {
    addFnB(item);
    toast({
      title: 'Đã thêm vào giỏ hàng!',
      description: `${item.name} - ${item.price.toLocaleString()}đ`,
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <Box as="section" id="fnb" py={24} position="relative" zIndex={2}>
      <Container maxW="1200px">
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
            🍿 Bắp & Nước
          </Text>
          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '2rem', md: '3rem' }}
            fontWeight="700"
            mb={4}
          >
            Thêm Đồ Ăn Nhẹ
          </Heading>
          <Text color="text.secondary" fontSize="1.1rem" maxW="600px" mx="auto">
            Xem phim ngon hơn với combo bắp nước siêu hấp dẫn
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
          {fnbData.map((item, index) => (
            <MotionBox
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FnBCard item={item} onAdd={handleAddItem} />
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FnBSection;
