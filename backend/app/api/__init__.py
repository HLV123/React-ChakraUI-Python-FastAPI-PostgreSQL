from fastapi import APIRouter
from app.api.routes import auth, movies, cinemas, bookings, promotions, fnb

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth.router)
api_router.include_router(movies.router)
api_router.include_router(cinemas.router)
api_router.include_router(bookings.router)
api_router.include_router(promotions.router)
api_router.include_router(fnb.router)
