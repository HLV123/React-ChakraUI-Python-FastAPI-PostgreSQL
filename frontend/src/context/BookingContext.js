import React, { createContext, useContext, useState, useReducer } from 'react';

const BookingContext = createContext(null);

const initialState = {
  movie: null,
  cinema: null,
  showtime: null,
  selectedSeats: [],
  fnbItems: [],
  promoCode: null,
  discount: 0,
  step: 1, // 1: Chọn phim, 2: Chọn suất, 3: Chọn ghế, 4: Thanh toán
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIE':
      return { ...state, movie: action.payload, step: 2 };
    case 'SET_CINEMA':
      return { ...state, cinema: action.payload };
    case 'SET_SHOWTIME':
      return { ...state, showtime: action.payload, step: 3 };
    case 'ADD_SEAT':
      return { ...state, selectedSeats: [...state.selectedSeats, action.payload] };
    case 'REMOVE_SEAT':
      return { 
        ...state, 
        selectedSeats: state.selectedSeats.filter(s => s.id !== action.payload.id) 
      };
    case 'CLEAR_SEATS':
      return { ...state, selectedSeats: [] };
    case 'ADD_FNB':
      const existingItem = state.fnbItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          fnbItems: state.fnbItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, fnbItems: [...state.fnbItems, { ...action.payload, quantity: 1 }] };
    case 'REMOVE_FNB':
      return {
        ...state,
        fnbItems: state.fnbItems.filter(item => item.id !== action.payload.id),
      };
    case 'UPDATE_FNB_QUANTITY':
      return {
        ...state,
        fnbItems: state.fnbItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'SET_PROMO':
      return { ...state, promoCode: action.payload.code, discount: action.payload.discount };
    case 'CLEAR_PROMO':
      return { ...state, promoCode: null, discount: 0 };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const selectMovie = (movie) => dispatch({ type: 'SET_MOVIE', payload: movie });
  const selectCinema = (cinema) => dispatch({ type: 'SET_CINEMA', payload: cinema });
  const selectShowtime = (showtime) => dispatch({ type: 'SET_SHOWTIME', payload: showtime });
  const addSeat = (seat) => dispatch({ type: 'ADD_SEAT', payload: seat });
  const removeSeat = (seat) => dispatch({ type: 'REMOVE_SEAT', payload: seat });
  const clearSeats = () => dispatch({ type: 'CLEAR_SEATS' });
  const addFnB = (item) => dispatch({ type: 'ADD_FNB', payload: item });
  const removeFnB = (item) => dispatch({ type: 'REMOVE_FNB', payload: item });
  const updateFnBQuantity = (id, quantity) => 
    dispatch({ type: 'UPDATE_FNB_QUANTITY', payload: { id, quantity } });
  const setPromo = (code, discount) => 
    dispatch({ type: 'SET_PROMO', payload: { code, discount } });
  const clearPromo = () => dispatch({ type: 'CLEAR_PROMO' });
  const setStep = (step) => dispatch({ type: 'SET_STEP', payload: step });
  const resetBooking = () => dispatch({ type: 'RESET' });

  // Calculate totals
  const seatTotal = state.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const fnbTotal = state.fnbItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = seatTotal + fnbTotal;
  const discountAmount = Math.round(subtotal * state.discount / 100);
  const total = subtotal - discountAmount;

  return (
    <BookingContext.Provider
      value={{
        ...state,
        selectMovie,
        selectCinema,
        selectShowtime,
        addSeat,
        removeSeat,
        clearSeats,
        addFnB,
        removeFnB,
        updateFnBQuantity,
        setPromo,
        clearPromo,
        setStep,
        resetBooking,
        seatTotal,
        fnbTotal,
        subtotal,
        discountAmount,
        total,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
