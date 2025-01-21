from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.persons import Person
from schemas.persons import PersonCreate, Person

router = APIRouter()

@router.post("/", response_model=Person)
def create_person(person: PersonCreate, db: Session = Depends(get_db)):
    db_person = db.query(Person).filter(Person.email == person.email).first()
    if db_person:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_person = Person(**person.dict())
    db.add(new_person)
    db.commit()
    db.refresh(new_person)
    return new_person

@router.get("/{person_id}", response_model=Person)
def read_person(person_id: int, db: Session = Depends(get_db)):
    db_person = db.query(Person).filter(Person.id == person_id).first()
    if not db_person:
        raise HTTPException(status_code=404, detail="Person not found")
    return db_person

@router.delete("/{person_id}")
def delete_person(person_id: int, db: Session = Depends(get_db)):
    db_person = db.query(Person).filter(Person.id == person_id).first()
    if not db_person:
        raise HTTPException(status_code=404, detail="Person not found")
    db.delete(db_person)
    db.commit()
    return {"message": "Person deleted"}
