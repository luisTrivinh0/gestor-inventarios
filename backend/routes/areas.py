from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.areas import Area
from schemas.areas import Area, AreaCreate

router = APIRouter()

# Criar uma nova área
@router.post("/", response_model=Area)
def create_area(area: AreaCreate, db: Session = Depends(get_db)):
    new_area = Area(**area.dict())
    db.add(new_area)
    db.commit()
    db.refresh(new_area)
    return new_area

# Listar todas as áreas
@router.get("/", response_model=list[Area])
def list_areas(db: Session = Depends(get_db)):
    areas = db.query(Area).all()
    return areas

# Obter uma área pelo ID
@router.get("/{area_id}", response_model=Area)
def get_area(area_id: int, db: Session = Depends(get_db)):
    area = db.query(Area).filter(Area.id == area_id).first()
    if not area:
        raise HTTPException(status_code=404, detail="Area not found")
    return area

# Atualizar uma área existente
@router.put("/{area_id}", response_model=Area)
def update_area(area_id: int, area_data: AreaCreate, db: Session = Depends(get_db)):
    area = db.query(Area).filter(Area.id == area_id).first()
    if not area:
        raise HTTPException(status_code=404, detail="Area not found")
    for key, value in area_data.dict().items():
        setattr(area, key, value)
    db.commit()
    db.refresh(area)
    return area

# Deletar uma área
@router.delete("/{area_id}")
def delete_area(area_id: int, db: Session = Depends(get_db)):
    area = db.query(Area).filter(Area.id == area_id).first()
    if not area:
        raise HTTPException(status_code=404, detail="Area not found")
    db.delete(area)
    db.commit()
    return {"message": "Area deleted"}
