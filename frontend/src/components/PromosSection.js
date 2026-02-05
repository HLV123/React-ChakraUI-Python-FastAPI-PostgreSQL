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
  Badge,
  SimpleGrid,
  useToast,
  Code,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const promosData = [
  {
    id: 1,
    title: 'Happy Monday - Giảm 50%',
    description: 'Mọi suất chiếu thứ 2 hàng tuần, áp dụng cho tất cả loại vé!',
    image: '/images/promo-1.png',
    code: 'MONDAY50',
    tag: 'HOT 🔥',
    tagColor: 'red',
  },
  {
    id: 2,
    title: 'Student Day - Chỉ 45K',
    description: 'Thứ 4 hàng tuần, sinh viên xuất trình thẻ nhận ưu đãi!',
    image: '/images/promo-2.png',
    code: 'STUDENT45',
    tag: 'SINH VIÊN',
    tagColor: 'blue',
  },
  {
    id: 3,
    title: 'Combo Couple - 299K',
    description: '2 vé VIP + 1 bắp lớn + 2 nước. Deal hẹn hò hoàn hảo!',
    image: '/images/promo-3.png',
    code: 'COUPLE299',
    tag: 'COMBO',
    tagColor: 'purple',
  },
];

const PromoCard = ({ promo, onCopy }) => (
  <MotionBox
    bg="linear-gradient(145deg, #1a1a25 0%, #12121a 100%)"
    border="1px solid"
    borderColor="brand.border"
    borderRadius="20px"
    overflow="hidden"
    whileHover={{ y: -10, borderColor: '#d4af37' }}
    transition={{ duration: 0.3 }}
  >
    <Box h="200px" overflow="hidden">
      <Image
        src={promo.image}
        alt={promo.title}
        w="full"
        h="full"
        objectFit="cover"
        transition="transform 0.5s ease"
        _hover={{ transform: 'scale(1.1)' }}
      />
    </Box>
    <VStack p={6} align="start" spacing={3}>
      <Badge
        colorScheme={promo.tagColor}
        px={3}
        py={1}
        borderRadius="6px"
        fontSize="0.75rem"
        fontWeight="600"
      >
        {promo.tag}
      </Badge>
      <Heading fontFamily="heading" fontSize="1.25rem" fontWeight="600">
        {promo.title}
      </Heading>
      <Text color="text.secondary" fontSize="0.9rem">
        {promo.description}
      </Text>
      <HStack
        w="full"
        bg="brand.secondary"
        p={3}
        borderRadius="10px"
        border="1px dashed"
        borderColor="brand.gold"
        justify="space-between"
      >
        <Code
          bg="transparent"
          color="brand.gold"
          fontWeight="700"
          fontSize="1.1rem"
          letterSpacing="2px"
        >
          {promo.code}
        </Code>
        <Button
          variant="gold"
          size="sm"
          onClick={() => onCopy(promo.code)}
        >
          Sao chép
        </Button>
      </HStack>
    </VStack>
  </MotionBox>
);

const PromosSection = () => {
  const toast = useToast();

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Đã sao chép mã!',
      description: `Mã ${code} đã được sao chép vào clipboard`,
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <Box as="section" id="promos" py={24} position="relative" zIndex={2}>
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
            🎁 Khuyến Mãi Hot
          </Text>
          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '2rem', md: '3rem' }}
            fontWeight="700"
            mb={4}
          >
            Ưu Đãi Đặc Biệt
          </Heading>
          <Text color="text.secondary" fontSize="1.1rem" maxW="600px" mx="auto">
            Săn deal khủng, xem phim thả ga với giá siêu hời
          </Text>
        </MotionBox>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {promosData.map((promo, index) => (
            <MotionBox
              key={promo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PromoCard promo={promo} onCopy={handleCopyCode} />
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default PromosSection;
