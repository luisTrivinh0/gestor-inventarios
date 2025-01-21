from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base
from datetime import datetime

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    code = Column(String(50), nullable=False, unique=True)
    brand = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
