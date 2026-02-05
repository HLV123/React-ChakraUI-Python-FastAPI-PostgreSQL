import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Flex,
  Wrap,
  WrapItem,
  Tooltip,
} from '@chakra-ui/react';

const SEAT_TYPES = {
  STANDARD: { price: 90000, color: '#12121a', label: 'Thường' },
  VIP: { price: 150000, color: 'linear-gradient(135deg, #7b2cbf 0%, #a855f7 100%)', label: 'VIP' },
  COUPLE: { price: 250000, color: 'linear-gradient(135deg, #e63946 0%, #ff6b6b 100%)', label: 'Couple' },
};

// Generate seat layout
const generateSeats = () => {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seats = [];

  rows.forEach((row) => {
    const rowSeats = [];
    const seatsPerRow = row === 'E' ? 4 : 8; // Couple seats in row E
    const seatType = row === 'D' ? 'VIP' : row === 'E' ? 'COUPLE' : 'STANDARD';

    for (let i = 1; i <= seatsPerRow; i++) {
      const isTaken = Math.random() < 0.2; // 20% chance seat is taken
      rowSeats.push({
        id: `${row}${i}`,
        row,
        number: i,
        type: seatType,
        price: SEAT_TYPES[seatType].price,
        isTaken,
      });
    }
    seats.push({ row, seats: rowSeats });
  });

  return seats;
};

const Seat = ({ seat, isSelected, onSelect }) => {
  const seatType = SEAT_TYPES[seat.type];
  const width = seat.type === 'COUPLE' ? '75px' : '35px';

  if (seat.isTaken) {
    return (
      <Tooltip label="Đã bán" placement="top">
        <Box
          w={width}
          h="35px"
          bg="text.muted"
          borderRadius="8px 8px 4px 4px"
          opacity={0.5}
          cursor="not-allowed"
        />
      </Tooltip>
    );
  }

  return (
    <Tooltip
      label={`${seat.id} - ${seatType.label} - ${seat.price.toLocaleString()}đ`}
      placement="top"
    >
      <Box
        w={width}
        h="35px"
        bg={isSelected ? 'linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)' : seatType.color}
        border="2px solid"
        borderColor={isSelected ? 'transparent' : seat.type === 'STANDARD' ? 'brand.border' : 'transparent'}
        borderRadius="8px 8px 4px 4px"
        cursor="pointer"
        transition="all 0.2s ease"
        transform={isSelected ? 'scale(1.1)' : 'scale(1)'}
        _hover={{
          borderColor: 'brand.gold',
          bg: isSelected ? undefined : 'rgba(212, 175, 55, 0.1)',
        }}
        onClick={() => onSelect(seat)}
      />
    </Tooltip>
  );
};

const SeatSelection = ({ selectedSeats, onSeatToggle }) => {
  const [seatLayout] = useState(generateSeats);

  const handleSeatClick = (seat) => {
    if (seat.isTaken) return;
    onSeatToggle(seat);
  };

  const isSeatSelected = (seat) => {
    return selectedSeats.some((s) => s.id === seat.id);
  };

  return (
    <Box
      bg="linear-gradient(145deg, #1a1a25 0%, #12121a 100%)"
      border="1px solid"
      borderColor="brand.border"
      borderRadius="24px"
      p={{ base: 4, md: 8 }}
    >
      {/* Screen */}
      <Box
        w="80%"
        mx="auto"
        mb={12}
        p={4}
        bgGradient="linear(to-b, brand.gold, rgba(212, 175, 55, 0.3))"
        borderRadius="100% 100% 0 0 / 200% 200% 0 0"
        textAlign="center"
        color="brand.primary"
        fontWeight="600"
        fontSize="0.9rem"
        boxShadow="0 0 50px rgba(212, 175, 55, 0.3)"
      >
        MÀN HÌNH IMAX
      </Box>

      {/* Seats Container */}
      <VStack spacing={3} align="center" mb={8}>
        {seatLayout.map((rowData) => (
          <HStack key={rowData.row} spacing={2} align="center">
            <Text
              w="25px"
              color="text.muted"
              fontWeight="600"
              fontSize="0.85rem"
              textAlign="center"
            >
              {rowData.row}
            </Text>
            <HStack spacing={2}>
              {rowData.seats.map((seat) => (
                <Seat
                  key={seat.id}
                  seat={seat}
                  isSelected={isSeatSelected(seat)}
                  onSelect={handleSeatClick}
                />
              ))}
            </HStack>
            <Text
              w="25px"
              color="text.muted"
              fontWeight="600"
              fontSize="0.85rem"
              textAlign="center"
            >
              {rowData.row}
            </Text>
          </HStack>
        ))}
      </VStack>

      {/* Legend */}
      <Flex
        justify="center"
        gap={{ base: 4, md: 8 }}
        flexWrap="wrap"
        pt={6}
        borderTop="1px solid"
        borderColor="brand.border"
      >
        <HStack spacing={2}>
          <Box
            w="24px"
            h="24px"
            bg="brand.secondary"
            border="2px solid"
            borderColor="brand.border"
            borderRadius="6px 6px 3px 3px"
          />
          <Text color="text.secondary" fontSize="0.85rem">
            Còn trống
          </Text>
        </HStack>
        <HStack spacing={2}>
          <Box
            w="24px"
            h="24px"
            bgGradient="linear(135deg, brand.gold, brand.goldLight)"
            borderRadius="6px 6px 3px 3px"
          />
          <Text color="text.secondary" fontSize="0.85rem">
            Đang chọn
          </Text>
        </HStack>
        <HStack spacing={2}>
          <Box
            w="24px"
            h="24px"
            bg="text.muted"
            opacity={0.5}
            borderRadius="6px 6px 3px 3px"
          />
          <Text color="text.secondary" fontSize="0.85rem">
            Đã bán
          </Text>
        </HStack>
        <HStack spacing={2}>
          <Box
            w="24px"
            h="24px"
            bgGradient="linear(135deg, #7b2cbf, #a855f7)"
            borderRadius="6px 6px 3px 3px"
          />
          <Text color="text.secondary" fontSize="0.85rem">
            VIP (150k)
          </Text>
        </HStack>
        <HStack spacing={2}>
          <Box
            w="40px"
            h="24px"
            bgGradient="linear(135deg, #e63946, #ff6b6b)"
            borderRadius="6px 6px 3px 3px"
          />
          <Text color="text.secondary" fontSize="0.85rem">
            Couple (250k)
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default SeatSelection;
