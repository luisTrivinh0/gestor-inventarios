from sqlalchemy import Column, Integer, String, Boolean, DateTime
from database import Base
from datetime import datetime

class Person(Base):
    __tablename__ = "persons"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    document = Column(String(20), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    temporary_password = Column(String(255), nullable=True)
    has_login = Column(Boolean, default=False)
    notification_token = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
