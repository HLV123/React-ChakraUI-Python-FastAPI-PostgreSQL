from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.models.movie import Movie
from app.schemas.movie import MovieCreate, MovieResponse, MovieListResponse

router = APIRouter(prefix="/movies", tags=["Movies"])

@router.get("", response_model=List[MovieResponse])
def get_movies(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    movies = db.query(Movie).offset(skip).limit(limit).all()
    return movies

@router.get("/now-showing", response_model=List[MovieResponse])
def get_now_showing(db: Session = Depends(get_db)):
    movies = db.query(Movie).filter(Movie.is_now_showing == True).all()
    return movies

@router.get("/coming-soon", response_model=List[MovieResponse])
def get_coming_soon(db: Session = Depends(get_db)):
    movies = db.query(Movie).filter(Movie.is_coming_soon == True).all()
    return movies

@router.get("/{movie_id}", response_model=MovieResponse)
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found"
        )
    return movie

@router.post("", response_model=MovieResponse)
def create_movie(movie_data: MovieCreate, db: Session = Depends(get_db)):
    db_movie = Movie(**movie_data.model_dump())
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie
