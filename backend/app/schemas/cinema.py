from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CinemaBase(BaseModel):
    name: str
    address: str
    city: str
    cinema_type: str = "STANDARD"
    features: Optional[str] = None
    phone: Optional[str] = None

class CinemaCreate(CinemaBase):
    pass

class CinemaResponse(CinemaBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class HallBase(BaseModel):
    name: str
    hall_type: str = "STANDARD"
    total_seats: int
    rows: int
    seats_per_row: int

class HallCreate(HallBase):
    cinema_id: int

class HallResponse(HallBase):
    id: int
    cinema_id: int
    is_active: bool

    class Config:
        from_attributes = True

class CinemaWithHalls(CinemaResponse):
    halls: List[HallResponse] = []
