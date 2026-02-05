from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.db.database import get_db
from app.models.cinema import Cinema, Hall
from app.models.showtime import Showtime
from app.schemas.cinema import CinemaCreate, CinemaResponse, CinemaWithHalls

router = APIRouter(prefix="/cinemas", tags=["Cinemas"])

@router.get("", response_model=List[CinemaResponse])
def get_cinemas(
    city: str = None,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    query = db.query(Cinema).filter(Cinema.is_active == True)
    if city:
        query = query.filter(Cinema.city == city)
    cinemas = query.offset(skip).limit(limit).all()
    return cinemas

@router.get("/{cinema_id}", response_model=CinemaWithHalls)
def get_cinema(cinema_id: int, db: Session = Depends(get_db)):
    cinema = db.query(Cinema).filter(Cinema.id == cinema_id).first()
    if not cinema:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cinema not found"
        )
    return cinema

@router.get("/{cinema_id}/showtimes")
def get_cinema_showtimes(
    cinema_id: int,
    movie_id: int = None,
    date: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Showtime).filter(
        Showtime.cinema_id == cinema_id,
        Showtime.is_active == True
    )
    
    if movie_id:
        query = query.filter(Showtime.movie_id == movie_id)
    
    if date:
        try:
            target_date = datetime.strptime(date, "%Y-%m-%d")
            query = query.filter(
                Showtime.start_time >= target_date,
                Showtime.start_time < target_date.replace(hour=23, minute=59, second=59)
            )
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid date format. Use YYYY-MM-DD"
            )
    
    showtimes = query.all()
    return showtimes

@router.post("", response_model=CinemaResponse)
def create_cinema(cinema_data: CinemaCreate, db: Session = Depends(get_db)):
    db_cinema = Cinema(**cinema_data.model_dump())
    db.add(db_cinema)
    db.commit()
    db.refresh(db_cinema)
    return db_cinema
