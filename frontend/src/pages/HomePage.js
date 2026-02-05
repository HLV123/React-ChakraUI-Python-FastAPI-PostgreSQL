import React from 'react';
import { Box } from '@chakra-ui/react';
import {
  Header,
  Hero,
  StatsBar,
  MoviesSection,
  CinemasSection,
  BookingSection,
  PromosSection,
  MembershipSection,
  FnBSection,
  Footer,
} from '../components';

const HomePage = () => {
  return (
    <Box>
      <Header />
      <Hero />
      <StatsBar />
      <MoviesSection />
      <CinemasSection />
      <BookingSection />
      <PromosSection />
      <MembershipSection />
      <FnBSection />
      <Footer />
    </Box>
  );
};

export default HomePage;
