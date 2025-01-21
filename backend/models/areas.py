from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from datetime import datetime

class Area(Base):
    __tablename__ = "areas"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    entry_point = Column(String(255), nullable=False)
    exit_point = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
