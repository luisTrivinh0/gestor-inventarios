from pydantic import BaseModel
from datetime import date

class LogBase(BaseModel):
    person_id: int
    area_id: int
    log_date: date

class LogCreate(LogBase):
    pass

class Log(LogBase):
    id: int

    class Config:
        from_attributes = True
