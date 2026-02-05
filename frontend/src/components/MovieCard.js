import React from 'react';
import {
  Box,
  Image,
  Text,
  HStack,
  VStack,
  Badge,
  Button,
  AspectRatio,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const MovieCard = ({ movie, onClick }) => {
  return (
    <MotionBox
      bg="linear-gradient(145deg, #1a1a25 0%, #12121a 100%)"
      border="1px solid"
      borderColor="brand.border"
      borderRadius="20px"
      overflow="hidden"
      cursor="pointer"
      onClick={() => onClick && onClick(movie)}
      whileHover={{ 
        y: -10, 
        borderColor: '#d4af37',
        boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)' 
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Poster */}
      <Box position="relative" overflow="hidden">
        <AspectRatio ratio={2 / 3}>
          <Image
            src={movie.poster}
            alt={movie.title}
            objectFit="cover"
            transition="transform 0.5s ease"
            _groupHover={{ transform: 'scale(1.1)' }}
          />
        </AspectRatio>

        {/* Rating */}
        <HStack
          position="absolute"
          top={4}
          right={4}
          bg="rgba(0, 0, 0, 0.8)"
          backdropFilter="blur(10px)"
          px={3}
          py={1}
          borderRadius="8px"
          spacing={1}
        >
          <StarIcon color="brand.gold" boxSize={3} />
          <Text fontWeight="600" fontSize="0.9rem">
            {movie.rating}
          </Text>
        </HStack>

        {/* Badges */}
        <VStack position="absolute" top={4} left={4} spacing={2} align="start">
          {movie.badges?.map((badge, index) => (
            <Badge
              key={index}
              px={3}
              py={1}
              borderRadius="6px"
              fontSize="0.75rem"
              fontWeight="600"
              textTransform="uppercase"
              bgGradient={
                badge === 'IMAX'
                  ? 'linear(135deg, #1a237e, #3f51b5)'
                  : badge === '4DX'
                  ? 'linear(135deg, #e63946, #ff6b6b)'
                  : 'linear(135deg, #d4af37, #f4d03f)'
              }
              color={badge === 'MỚI' ? '#0a0a0f' : 'white'}
            >
              {badge}
            </Badge>
          ))}
        </VStack>

        {/* Hover Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(180deg, transparent 40%, rgba(0, 0, 0, 0.9) 100%)"
          opacity={0}
          transition="opacity 0.3s ease"
          display="flex"
          alignItems="flex-end"
          p={6}
          _groupHover={{ opacity: 1 }}
          className="movie-overlay"
        >
          <Button
            variant="gold"
            w="full"
            leftIcon={<Text>🎟️</Text>}
          >
            Đặt Vé Ngay
          </Button>
        </Box>
      </Box>

      {/* Info */}
      <VStack p={6} align="start" spacing={2}>
        <Text
          fontFamily="heading"
          fontSize="1.25rem"
          fontWeight="600"
          noOfLines={1}
        >
          {movie.title}
        </Text>
        <HStack spacing={4} color="text.muted" fontSize="0.85rem">
          <Text>⏱️ {movie.duration} phút</Text>
          <Text>🎭 {movie.ageRating}</Text>
        </HStack>
        <HStack spacing={2} flexWrap="wrap">
          {movie.genres?.map((genre, index) => (
            <Badge
              key={index}
              bg="rgba(212, 175, 55, 0.1)"
              color="brand.gold"
              px={2}
              py={1}
              borderRadius="6px"
              fontSize="0.75rem"
            >
              {genre}
            </Badge>
          ))}
        </HStack>
      </VStack>

      {/* Add hover effect to parent */}
      <style>
        {`
          .movie-card:hover .movie-overlay {
            opacity: 1;
          }
          .movie-card:hover img {
            transform: scale(1.1);
          }
        `}
      </style>
    </MotionBox>
  );
};

export default MovieCard;
