from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Enum
from datetime import datetime
import enum

from app.db.database import Base

class FnBCategory(str, enum.Enum):
    POPCORN = "popcorn"
    DRINKS = "drinks"
    SNACKS = "snacks"
    COMBO = "combo"

class FnBItem(Base):
    __tablename__ = "fnb_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    image = Column(String, nullable=True)
    category = Column(Enum(FnBCategory), default=FnBCategory.SNACKS)
    price = Column(Float, nullable=False)
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
