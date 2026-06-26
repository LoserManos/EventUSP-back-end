import pytest
from sqlmodel import Session,select
from app.models import User


## cenario 1: visualizar meu perfil de usuário
def test_create_account(client,db_session:Session):
    
    body = {"name": "nattan","email": "nattan@gmail.com","password":"123","bio": "lalalala"}
    client.post("/auth/singup",json=body)
    client.get()