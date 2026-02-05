from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.booking import BookingStatus, PaymentStatus

class SeatBooking(BaseModel):
    id: str
    row: str
    number: int
    type: str
    price: float

class FnBBooking(BaseModel):
    id: int
    quantity: int

class BookingCreate(BaseModel):
    showtime_id: int
    seats: List[SeatBooking]
    fnb_items: Optional[List[FnBBooking]] = []
    promo_code: Optional[str] = None

class BookingResponse(BaseModel):
    id: int
    booking_code: str
    showtime_id: int
    seats: str
    total_seats: int
    seat_total: float
    fnb_total: float
    discount: float
    promo_code: Optional[str] = None
    total_amount: float
    status: BookingStatus
    payment_status: PaymentStatus
    created_at: datetime

    class Config:
        from_attributes = True

class BookingListResponse(BaseModel):
    bookings: List[BookingResponse]
    total: int
