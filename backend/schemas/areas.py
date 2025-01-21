from pydantic import BaseModel

class AreaBase(BaseModel):
    name: str
    entry_point: str
    exit_point: str

class AreaCreate(AreaBase):
    pass

class Area(AreaBase):
    id: int
    created_at: str

    class Config:
        from_attributes = True
