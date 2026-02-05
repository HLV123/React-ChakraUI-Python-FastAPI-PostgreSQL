from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import json

from app.db.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.booking import Booking, BookingStatus, PaymentStatus
from app.models.promotion import Promotion
from app.schemas.booking import BookingCreate, BookingResponse

router = APIRouter(prefix="/bookings", tags=["Bookings"])

@router.post("", response_model=BookingResponse)
def create_booking(
    booking_data: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Calculate seat total
    seat_total = sum(seat.price for seat in booking_data.seats)
    fnb_total = 0.0
    discount = 0.0
    
    # Apply promo code if provided
    if booking_data.promo_code:
        promo = db.query(Promotion).filter(
            Promotion.code == booking_data.promo_code.upper(),
            Promotion.is_active == True
        ).first()
        
        if promo:
            if promo.discount_type.value == "percentage":
                discount = seat_total * (promo.discount_value / 100)
                if promo.max_discount:
                    discount = min(discount, promo.max_discount)
            else:
                discount = promo.discount_value
    
    total_amount = seat_total + fnb_total - discount
    
    # Create booking
    db_booking = Booking(
        user_id=current_user.id,
        showtime_id=booking_data.showtime_id,
        seats=json.dumps([seat.model_dump() for seat in booking_data.seats]),
        total_seats=len(booking_data.seats),
        seat_total=seat_total,
        fnb_total=fnb_total,
        discount=discount,
        promo_code=booking_data.promo_code,
        total_amount=total_amount,
        status=BookingStatus.PENDING,
        payment_status=PaymentStatus.PENDING
    )
    
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    
    return db_booking

@router.get("/my", response_model=List[BookingResponse])
def get_my_bookings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    bookings = db.query(Booking).filter(
        Booking.user_id == current_user.id
    ).order_by(Booking.created_at.desc()).all()
    return bookings

@router.get("/{booking_id}", response_model=BookingResponse)
def get_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == current_user.id
    ).first()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    return booking

@router.delete("/{booking_id}")
def cancel_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == current_user.id
    ).first()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    if booking.status == BookingStatus.CANCELLED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking already cancelled"
        )
    
    booking.status = BookingStatus.CANCELLED
    db.commit()
    
    return {"message": "Booking cancelled successfully"}
