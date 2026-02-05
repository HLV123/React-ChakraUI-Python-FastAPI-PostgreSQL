from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ARRAY
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.database import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    poster = Column(String, nullable=True)
    trailer_url = Column(String, nullable=True)
    duration = Column(Integer, nullable=False)  # in minutes
    rating = Column(Float, default=0.0)
    age_rating = Column(String, nullable=True)  # T13, T16, T18, etc.
    genres = Column(String, nullable=True)  # comma-separated
    director = Column(String, nullable=True)
    cast = Column(Text, nullable=True)
    release_date = Column(DateTime, nullable=True)
    is_now_showing = Column(Boolean, default=True)
    is_coming_soon = Column(Boolean, default=False)
    badges = Column(String, nullable=True)  # IMAX, 4DX, MỚI, etc. (comma-separated)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    showtimes = relationship("Showtime", back_populates="movie")
