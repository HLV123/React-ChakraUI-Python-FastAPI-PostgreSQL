import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const membershipPlans = [
  {
    id: 1,
    name: 'Silver',
    icon: '🎬',
    price: 'Miễn phí',
    period: '/ đăng ký',
    features: [
      'Tích 1 điểm / 10.000đ',
      'Giảm 5% vé thường',
      'Ưu đãi sinh nhật',
    ],
    isFeatured: false,
  },
  {
    id: 2,
    name: 'Gold',
    icon: '⭐',
    price: '299K',
    period: '/ năm',
    features: [
      'Tích 2 điểm / 10.000đ',
      'Giảm 15% tất cả vé',
      'Combo F&B giá ưu đãi',
      'Đặt vé trước 24h',
      'Phòng chờ VIP',
    ],
    isFeatured: true,
  },
  {
    id: 3,
    name: 'Platinum',
    icon: '👑',
    price: '599K',
    period: '/ năm',
    features: [
      'Tích 3 điểm / 10.000đ',
      'Giảm 25% tất cả vé',
      'F&B miễn phí mỗi tháng',
      'Đặt vé trước 48h',
      'Ghế VIP ưu tiên',
      'Premiere độc quyền',
    ],
    isFeatured: false,
  },
];

const MembershipCard = ({ plan }) => (
  <MotionBox
    bg="linear-gradient(145deg, #1a1a25 0%, #12121a 100%)"
    border="1px solid"
    borderColor={plan.isFeatured ? 'brand.gold' : 'brand.border'}
    borderRadius="24px"
    p={8}
    textAlign="center"
    position="relative"
    transform={plan.isFeatured ? { base: 'none', lg: 'scale(1.05)' } : 'none'}
    whileHover={{
      y: -10,
      borderColor: '#d4af37',
    }}
    transition={{ duration: 0.3 }}
  >
    {plan.isFeatured && (
      <Box
        position="absolute"
        top="-12px"
        left="50%"
        transform="translateX(-50%)"
        bgGradient="linear(135deg, brand.gold, brand.goldLight)"
        color="brand.primary"
        px={4}
        py={1}
        borderRadius="20px"
        fontSize="0.7rem"
        fontWeight="700"
      >
        PHỔ BIẾN NHẤT
      </Box>
    )}

    <Box
      w="70px"
      h="70px"
      bg={plan.isFeatured ? 'linear-gradient(135deg, #d4af37, #f4d03f)' : 'brand.secondary'}
      borderRadius="20px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mx="auto"
      mb={6}
      fontSize="2rem"
    >
      {plan.icon}
    </Box>

    <Heading fontFamily="heading" fontSize="1.5rem" mb={2}>
      {plan.name}
    </Heading>

    <HStack justify="center" mb={6}>
      <Text
        fontFamily="heading"
        fontSize="2.5rem"
        fontWeight="700"
        color="brand.gold"
      >
        {plan.price}
      </Text>
      <Text color="text.muted" fontSize="0.9rem">
        {plan.period}
      </Text>
    </HStack>

    <List spacing={3} textAlign="left" mb={8}>
      {plan.features.map((feature, index) => (
        <ListItem
          key={index}
          display="flex"
          alignItems="center"
          py={3}
          borderBottom="1px solid"
          borderColor="brand.border"
          color="text.secondary"
          fontSize="0.9rem"
          _last={{ borderBottom: 'none' }}
        >
          <ListIcon as={CheckIcon} color="#22c55e" mr={3} />
          {feature}
        </ListItem>
      ))}
    </List>

    <Button
      variant={plan.isFeatured ? 'gold' : 'outline'}
      w="full"
      size="lg"
    >
      {plan.price === 'Miễn phí' ? 'Đăng Ký Ngay' : 'Nâng Cấp Ngay'}
    </Button>
  </MotionBox>
);

const MembershipSection = () => {
  return (
    <Box
      as="section"
      id="membership"
      py={24}
      bgGradient="linear(180deg, brand.primary 0%, brand.secondary 100%)"
      position="relative"
      zIndex={2}
    >
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
            👑 Thành Viên
          </Text>
          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '2rem', md: '3rem' }}
            fontWeight="700"
            mb={4}
          >
            Gia Nhập Cineluxor Club
          </Heading>
          <Text color="text.secondary" fontSize="1.1rem" maxW="600px" mx="auto">
            Tích điểm, nhận ưu đãi, trải nghiệm đặc quyền VIP
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} alignItems="center">
          {membershipPlans.map((plan, index) => (
            <MotionBox
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <MembershipCard plan={plan} />
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default MembershipSection;
