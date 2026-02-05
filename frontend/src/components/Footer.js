import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

const footerLinks = {
  'Về Cineluxor': ['Giới thiệu', 'Tuyển dụng', 'Liên hệ', 'Tin tức'],
  'Hỗ trợ': ['Điều khoản sử dụng', 'Chính sách bảo mật', 'FAQ', 'Phản hồi'],
  'Dịch vụ': ['Đặt vé Online', 'Membership', 'Tổ chức sự kiện', 'Quảng cáo'],
};

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaYoutube, href: '#', label: 'Youtube' },
  { icon: FaTiktok, href: '#', label: 'TikTok' },
];

const paymentMethods = ['VISA', 'Master', 'JCB', 'Momo', 'ZaloPay'];

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="brand.secondary"
      borderTop="1px solid"
      borderColor="brand.border"
      pt={16}
      pb={8}
      position="relative"
      zIndex={2}
    >
      <Container maxW="1400px" px={{ base: 4, md: 8 }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={12}
          mb={12}
        >
          {/* Brand */}
          <VStack align={{ base: 'center', lg: 'start' }} spacing={6}>
            <Image src="/images/logo.png" alt="Cineluxor" h="50px" />
            <Text
              color="text.secondary"
              fontSize="0.95rem"
              textAlign={{ base: 'center', lg: 'left' }}
              maxW="350px"
            >
              Hệ thống rạp chiếu phim cao cấp hàng đầu Việt Nam với công nghệ IMAX, 4DX, Dolby Atmos tiên tiến nhất.
            </Text>
            <HStack spacing={4}>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  w="45px"
                  h="45px"
                  bg="brand.card"
                  border="1px solid"
                  borderColor="brand.border"
                  borderRadius="12px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="text.secondary"
                  transition="all 0.3s ease"
                  _hover={{
                    bgGradient: 'linear(135deg, brand.gold, brand.goldLight)',
                    borderColor: 'transparent',
                    color: 'brand.primary',
                  }}
                >
                  <social.icon size={20} />
                </Link>
              ))}
            </HStack>
          </VStack>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <VStack
              key={title}
              align={{ base: 'center', lg: 'start' }}
              spacing={4}
            >
              <Heading fontFamily="heading" fontSize="1.1rem">
                {title}
              </Heading>
              {links.map((link) => (
                <Link
                  key={link}
                  href="#"
                  color="text.secondary"
                  fontSize="0.9rem"
                  _hover={{ color: 'brand.gold' }}
                >
                  {link}
                </Link>
              ))}
            </VStack>
          ))}
        </SimpleGrid>

        {/* Bottom */}
        <Flex
          pt={8}
          borderTop="1px solid"
          borderColor="brand.border"
          justify="space-between"
          align="center"
          flexWrap="wrap"
          gap={4}
          direction={{ base: 'column', md: 'row' }}
        >
          <Text color="text.muted" fontSize="0.85rem">
            © 2025 Cineluxor. All rights reserved.
          </Text>
          <HStack spacing={4} align="center">
            <Text color="text.muted" fontSize="0.85rem">
              Thanh toán:
            </Text>
            {paymentMethods.map((method) => (
              <Box
                key={method}
                bg="brand.card"
                px={3}
                py={1}
                borderRadius="6px"
                fontSize="0.7rem"
                color="text.secondary"
                fontWeight="600"
              >
                {method}
              </Box>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
