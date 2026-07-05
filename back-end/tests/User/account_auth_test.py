import pytest
from sqlmodel import Session, select
from app.models import User

# Cenario 1: Criação de user com sucesso
def test_create_account(client, db_session: Session):
    body = {"name": "Nattan", "nickname": "natt", "email": "nattan@gmail.com", "password": "123", "bio": "lalalala"}
    response = client.post("/auth/signup", json=body)
    dataResponse = response.json()
    assert response.status_code == 201
    assert dataResponse["nickname"] == "natt"
    assert dataResponse["email"] == "nattan@gmail.com"
    
    query = select(User).where(User.email == dataResponse["email"])
    user = db_session.exec(query).first()
    assert user is not None
    assert user.nickname == "natt"

# Cenario 2: Criação de user sem bio, com sucesso
def test_create_account_no_bio(client, db_session: Session):
    body = {"name": "Nattan", "nickname": "natt", "email": "natt@gmail.com", "password": "123"}
    response = client.post("/auth/signup", json=body)
    assert response.status_code == 201

# Cenario 3: Criação de user com email já cadastrado (Erro)
def test_create_account_same_email(client):
    user1 = {"name": "A", "nickname": "nick1", "email": "a@a.com", "password": "123"}
    client.post("/auth/signup", json=user1)
    user2 = {"name": "B", "nickname": "nick2", "email": "a@a.com", "password": "123"}
    response = client.post("/auth/signup", json=user2)
    assert response.status_code == 400

# Cenario 4: Criação de user com nickname já cadastrado (Erro - ÚNICO)
def test_create_account_same_nickname(client):
    user1 = {"name": "Nattan", "nickname": "natt", "email": "a@a.com", "password": "123"}
    client.post("/auth/signup", json=user1)
    user2 = {"name": "Outro", "nickname": "natt", "email": "b@b.com", "password": "123"}
    response = client.post("/auth/signup", json=user2)
    assert response.status_code == 400

# Cenario 4.1: Criação de user com MESMO nome, porém DIFERENTE nickname (Sucesso - Não é único)
def test_create_account_same_name_different_nick(client):
    user1 = {"name": "Nattan", "nickname": "natt1", "email": "a@a.com", "password": "123"}
    client.post("/auth/signup", json=user1)
    user2 = {"name": "Nattan", "nickname": "natt2", "email": "b@b.com", "password": "123"}
    response = client.post("/auth/signup", json=user2)
    assert response.status_code == 201

# Cenario 5: Login correto
def test_login(client):
    user = {"name": "N", "nickname": "natt", "email": "n@g.com", "password": "123"}
    client.post("/auth/signup", json=user)
    login = {"email": "n@g.com", "password": "123"}
    res = client.post("/auth/login", json=login)
    assert res.status_code == 200

# Cenario 6: Login com senha errada
def test_login_wrong_password(client):
    user = {"name": "N", "nickname": "natt", "email": "n@g.com", "password": "123"}
    client.post("/auth/signup", json=user)
    login = {"email": "n@g.com", "password": "999"}
    res = client.post("/auth/login", json=login)
    assert res.status_code == 400

# Cenario 8: Campos vazios ou só espaços (422)
def test_create_account_invalid_fields(client):
    # Teste nickname vazio ou espaços
    cases = [
        {"name": "N", "nickname": "  ", "email": "a@a.com", "password": "123"},
        {"name": "N", "nickname": "", "email": "a@a.com", "password": "123"},
        {"name": " ", "nickname": "natt", "email": "a@a.com", "password": "123"}, # name vazio é ok? Se for obrigatório, falha.
        {"name": "N", "nickname": "natt", "email": "a@a.com", "password": "  "}
    ]
    for body in cases:
        res = client.post("/auth/signup", json=body)
        assert res.status_code == 422