import React from 'react';
import { Box, Grid, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const stats = [
  { number: '15', label: 'Rạp trên toàn quốc' },
  { number: '120+', label: 'Phòng chiếu hiện đại' },
  { number: '2M+', label: 'Khách hàng hài lòng' },
  { number: '50K+', label: 'Suất chiếu mỗi tháng' },
];

const StatsBar = () => {
  return (
    <MotionBox
      position="relative"
      zIndex={2}
      maxW="1000px"
      mx="auto"
      mt="-3rem"
      px={{ base: 4, md: 8 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        gap={{ base: 4, md: 8 }}
        p={{ base: 4, md: 8 }}
        bg="linear-gradient(145deg, #1a1a25 0%, #12121a 100%)"
        border="1px solid"
        borderColor="brand.border"
        borderRadius="20px"
        boxShadow="0 10px 40px rgba(0, 0, 0, 0.5)"
      >
        {stats.map((stat, index) => (
          <VStack key={index} spacing={1}>
            <Text
              fontFamily="heading"
              fontSize={{ base: '2rem', md: '2.5rem' }}
              fontWeight="700"
              color="brand.gold"
            >
              {stat.number}
            </Text>
            <Text color="text.secondary" fontSize={{ base: '0.8rem', md: '0.9rem' }} textAlign="center">
              {stat.label}
            </Text>
          </VStack>
        ))}
      </Grid>
    </MotionBox>
  );
};

export default StatsBar;
