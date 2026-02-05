from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from app.db.database import Base

class ShowtimeFormat(str, enum.Enum):
    STANDARD = "2D"
    THREE_D = "3D"
    IMAX = "IMAX"
    IMAX_3D = "IMAX 3D"
    FOUR_DX = "4DX"
    SCREENX = "ScreenX"

class Showtime(Base):
    __tablename__ = "showtimes"

    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(Integer, ForeignKey("movies.id"), nullable=False)
    cinema_id = Column(Integer, ForeignKey("cinemas.id"), nullable=False)
    hall_id = Column(Integer, ForeignKey("halls.id"), nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    format = Column(Enum(ShowtimeFormat), default=ShowtimeFormat.STANDARD)
    base_price = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    movie = relationship("Movie", back_populates="showtimes")
    cinema = relationship("Cinema", back_populates="showtimes")
    hall = relationship("Hall", back_populates="showtimes")
    bookings = relationship("Booking", back_populates="showtime")
    seats = relationship("ShowtimeSeat", back_populates="showtime")


class SeatType(str, enum.Enum):
    STANDARD = "standard"
    VIP = "vip"
    COUPLE = "couple"


class ShowtimeSeat(Base):
    __tablename__ = "showtime_seats"

    id = Column(Integer, primary_key=True, index=True)
    showtime_id = Column(Integer, ForeignKey("showtimes.id"), nullable=False)
    row = Column(String, nullable=False)
    number = Column(Integer, nullable=False)
    seat_type = Column(Enum(SeatType), default=SeatType.STANDARD)
    price = Column(Float, nullable=False)
    is_available = Column(Boolean, default=True)
    is_booked = Column(Boolean, default=False)

    # Relationships
    showtime = relationship("Showtime", back_populates="seats")
