from pydantic import BaseModel
from typing import Optional

class PersonBase(BaseModel):
    name: str
    document: str
    email: str

class PersonCreate(PersonBase):
    password: str

class Person(PersonBase):
    id: int
    has_login: Optional[bool] = False
    notification_token: Optional[str] = None
    created_at: str

    class Config:
        from_attributes = True
