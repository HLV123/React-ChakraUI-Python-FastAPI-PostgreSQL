from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class MovieBase(BaseModel):
    title: str
    description: Optional[str] = None
    poster: Optional[str] = None
    trailer_url: Optional[str] = None
    duration: int
    rating: Optional[float] = 0.0
    age_rating: Optional[str] = None
    genres: Optional[str] = None
    director: Optional[str] = None
    cast: Optional[str] = None
    badges: Optional[str] = None

class MovieCreate(MovieBase):
    release_date: Optional[datetime] = None
    is_now_showing: bool = True
    is_coming_soon: bool = False

class MovieUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    poster: Optional[str] = None
    duration: Optional[int] = None
    rating: Optional[float] = None
    is_now_showing: Optional[bool] = None
    is_coming_soon: Optional[bool] = None

class MovieResponse(MovieBase):
    id: int
    release_date: Optional[datetime] = None
    is_now_showing: bool
    is_coming_soon: bool
    created_at: datetime

    class Config:
        from_attributes = True

class MovieListResponse(BaseModel):
    movies: List[MovieResponse]
    total: int
