from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from pydantic import BaseModel

from app.db.database import get_db
from app.models.promotion import Promotion

router = APIRouter(prefix="/promotions", tags=["Promotions"])

class PromoResponse(BaseModel):
    id: int
    code: str
    title: str
    description: str | None
    image: str | None
    discount_type: str
    discount_value: float
    is_active: bool

    class Config:
        from_attributes = True

class ValidatePromoRequest(BaseModel):
    code: str

class ValidatePromoResponse(BaseModel):
    valid: bool
    discount_type: str | None = None
    discount_value: float | None = None
    message: str

@router.get("", response_model=List[PromoResponse])
def get_promotions(db: Session = Depends(get_db)):
    now = datetime.utcnow()
    promotions = db.query(Promotion).filter(
        Promotion.is_active == True,
        Promotion.start_date <= now,
        Promotion.end_date >= now
    ).all()
    return promotions

@router.post("/validate", response_model=ValidatePromoResponse)
def validate_promo_code(
    request: ValidatePromoRequest,
    db: Session = Depends(get_db)
):
    now = datetime.utcnow()
    promo = db.query(Promotion).filter(
        Promotion.code == request.code.upper(),
        Promotion.is_active == True,
        Promotion.start_date <= now,
        Promotion.end_date >= now
    ).first()
    
    if not promo:
        return ValidatePromoResponse(
            valid=False,
            message="Mã giảm giá không hợp lệ hoặc đã hết hạn"
        )
    
    if promo.usage_limit and promo.used_count >= promo.usage_limit:
        return ValidatePromoResponse(
            valid=False,
            message="Mã giảm giá đã hết lượt sử dụng"
        )
    
    return ValidatePromoResponse(
        valid=True,
        discount_type=promo.discount_type.value,
        discount_value=promo.discount_value,
        message=f"Áp dụng thành công! Giảm {promo.discount_value}{'%' if promo.discount_type.value == 'percentage' else 'đ'}"
    )
