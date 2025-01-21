from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import persons, areas, products, logs
from database import Base, engine

# Cria as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens. Substitua por origens específicas em produção.
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP.
    allow_headers=["*"],  # Permite todos os cabeçalhos HTTP.
)

# Inclua as rotas
app.include_router(persons.router, prefix="/persons", tags=["Persons"])
app.include_router(areas.router, prefix="/areas", tags=["Areas"])
app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(logs.router, prefix="/logs", tags=["Logs"])
