from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.products import Product
from schemas.products import Product, ProductCreate

router = APIRouter()

# Criar um novo produto
@router.post("/", response_model=Product)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.code == product.code).first()
    if db_product:
        raise HTTPException(status_code=400, detail="Product code already exists")
    new_product = Product(**product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# Listar todos os produtos
@router.get("/", response_model=list[Product])
def list_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products

# Obter um produto pelo ID
@router.get("/{product_id}", response_model=Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# Atualizar um produto existente
@router.put("/{product_id}", response_model=Product)
def update_product(product_id: int, product_data: ProductCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in product_data.dict().items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product

# Deletar um produto
@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted"}
