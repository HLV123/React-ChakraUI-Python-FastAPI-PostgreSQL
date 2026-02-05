import React from 'react';
import { Box, Container, Heading, Text, VStack, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import { useBooking } from '../context/BookingContext';

const MotionBox = motion(Box);

// Static movie data (will be replaced by API)
const moviesData = [
  {
    id: 1,
    title: 'Avatar: Fire and Ash',
    poster: '/images/movie-1.png',
    rating: 9.2,
    duration: 192,
    ageRating: 'T13',
    genres: ['Hành động', 'Sci-Fi'],
    badges: ['IMAX', 'MỚI'],
    description: 'Hành trình mới của Jake Sully trên hành tinh Pandora.',
  },
  {
    id: 2,
    title: 'Mission: Impossible 8',
    poster: '/images/movie-2.png',
    rating: 8.8,
    duration: 163,
    ageRating: 'T16',
    genres: ['Hành động', 'Phiêu lưu'],
    badges: ['4DX'],
    description: 'Ethan Hunt đối mặt với nhiệm vụ nguy hiểm nhất.',
  },
  {
    id: 3,
    title: 'Godzilla x Kong: Đế Chế Mới',
    poster: '/images/movie-3.png',
    rating: 8.5,
    duration: 145,
    ageRating: 'T13',
    genres: ['Quái vật', 'Hành động'],
    badges: ['IMAX', '4DX'],
    description: 'Cuộc chiến của các Titan để bảo vệ Trái Đất.',
  },
  {
    id: 4,
    title: 'Mai - Trấn Thành',
    poster: '/images/movie-4.png',
    rating: 9.0,
    duration: 131,
    ageRating: 'T18',
    genres: ['Tâm lý', 'Tình cảm'],
    badges: ['MỚI'],
    description: 'Câu chuyện cảm động về cuộc đời và tình yêu.',
  },
];

const MoviesSection = () => {
  const { selectMovie } = useBooking();

  const handleMovieClick = (movie) => {
    selectMovie(movie);
    // Scroll to booking section
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box as="section" id="movies" py={24} position="relative" zIndex={2}>
      <Container maxW="1400px">
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
            ✨ Phim Đang Chiếu
          </Text>
          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: '2rem', md: '3rem' }}
            fontWeight="700"
            mb={4}
          >
            Bom Tấn Đang Công Chiếu
          </Heading>
          <Text color="text.secondary" fontSize="1.1rem" maxW="600px" mx="auto">
            Khám phá những siêu phẩm điện ảnh mới nhất từ Hollywood và Việt Nam
          </Text>
        </MotionBox>

        {/* Movies Grid */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={8}>
          {moviesData.map((movie, index) => (
            <MotionBox
              key={movie.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              role="group"
              className="movie-card"
            >
              <MovieCard movie={movie} onClick={handleMovieClick} />
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default MoviesSection;
