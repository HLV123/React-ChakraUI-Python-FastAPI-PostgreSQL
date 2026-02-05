from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from app.db.database import get_db
from app.models.fnb import FnBItem, FnBCategory

router = APIRouter(prefix="/fnb", tags=["Food & Beverages"])

class FnBResponse(BaseModel):
    id: int
    name: str
    description: str | None
    image: str | None
    category: str
    price: float
    is_available: bool

    class Config:
        from_attributes = True

@router.get("", response_model=List[FnBResponse])
def get_fnb_items(
    category: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(FnBItem).filter(FnBItem.is_available == True)
    
    if category:
        try:
            cat = FnBCategory(category)
            query = query.filter(FnBItem.category == cat)
        except ValueError:
            pass
    
    items = query.all()
    return items

@router.get("/categories")
def get_categories():
    return [{"value": cat.value, "label": cat.name.title()} for cat in FnBCategory]

@router.get("/{item_id}", response_model=FnBResponse)
def get_fnb_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(FnBItem).filter(FnBItem.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    return item
