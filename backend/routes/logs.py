from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.logs import Log
from schemas.logs import Log, LogCreate

router = APIRouter()

# Criar um novo log
@router.post("/", response_model=Log)
def create_log(log: LogCreate, db: Session = Depends(get_db)):
    new_log = Log(**log.dict())
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log

# Listar todos os logs
@router.get("/", response_model=list[Log])
def list_logs(db: Session = Depends(get_db)):
    logs = db.query(Log).all()
    return logs

# Obter um log pelo ID
@router.get("/{log_id}", response_model=Log)
def get_log(log_id: int, db: Session = Depends(get_db)):
    log = db.query(Log).filter(Log.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")
    return log

# Atualizar um log existente
@router.put("/{log_id}", response_model=Log)
def update_log(log_id: int, log_data: LogCreate, db: Session = Depends(get_db)):
    log = db.query(Log).filter(Log.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")
    for key, value in log_data.dict().items():
        setattr(log, key, value)
    db.commit()
    db.refresh(log)
    return log

# Deletar um log
@router.delete("/{log_id}")
def delete_log(log_id: int, db: Session = Depends(get_db)):
    log = db.query(Log).filter(Log.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")
    db.delete(log)
    db.commit()
    return {"message": "Log deleted"}
