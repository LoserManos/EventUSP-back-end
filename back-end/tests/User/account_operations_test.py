import pytest
from sqlmodel import Session,select
from app.models import User
import os
import shutil
import pytest

## cenario 1: visualizar  perfil de usuário com token de autenticação
def test_get_profile(auth_client):
    response = auth_client.get("/usuarios/me")
    dtreponse = response.json()
    assert response.status_code == 200
    assert dtreponse["email"] == "test@example.com"
    assert dtreponse["name"] == "Test User"
## cenario 2: visualizar  perfil de usuário sem token de autenticação
def test_get_profile_no_token(client):
    response = client.get("/usuarios/me")
    assert response.status_code == 401

## cenario 3: editar meu perfil de usuário com token de autenticação
def test_get_profile(auth_client):
    body = {"name": "novo nome", "bio":"nova bio"}
    response = auth_client.post("/usuarios/me",body)
    dtreponse = response.json()
    assert response.status_code == 200
    assert dtreponse["name"] == "novo nome"
    assert dtreponse["name"] == "nova bio"
## cenario 4: editar meu perfil de usuário com token de autenticação, porém, campo não permitido
def test_get_profile_foribidden(auth_client):
    body = {"email": "novo@gmail.com", "bio":"nova bio"}
    response = auth_client.post("/usuarios/me",body)
    assert response.status_code == 422

## cenario 5: editar meu perfil de usuário sem token de autenticação
def test_get_profile(client):
    body = {"name": "novo nome", "bio":"nova bio"}
    response = client.patch("/usuarios/me",body)
    assert response.status_code == 401


## cenario 7: upload em foto de perfil com sucesso
def test_upload_user_photo_com_sucesso(auth_client):
    file_name = "foto_teste.jpg"
    file_content = b"conteudo_da_imagem_fake"
    files = {
        "file": (file_name, file_content, "image/jpeg")
    }
    
    response = auth_client.post("/me/foto", files=files)
    assert response.status_code == 200
    data = response.json()
    assert data["mensagem"] == "Foto atualizada com sucesso."
    assert "static/defaults/user_" in data["picture_profile"]
    db_path = data["picture_profile"]
    full_saved_path = f"app/{db_path}" 
    
    if os.path.exists(full_saved_path):
        os.remove(full_saved_path)

## cenario 8: visualizar perfil de outro usuário existente
def test_get_profile(auth_client,db_session):
    user = User(name="otavio", email="ot@example.com", password="hash_da_senha")
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    res = auth_client.get(f"/usuarios/{user.id}")
    dtres = res.json()
    assert res.status_code == 200
    assert dtres["name"] == user.name
    assert dtres["email"] == user.email
    assert dtres["id"] == user.id
    assert dtres["picture_profile"] == user.picture_profile

## cenario 9: tenta visualizar o perfil de um usuário que não existe no sistema
def test_get_profile_no_user(auth_client):
    res = auth_client.get(f"/usuarios/{-2}")
    assert res.status_code == 404


## cenario 9: seguir usuário existente
def test_follow_user(auth_client,db_session):
    user = User(name="otavio", email="ot@example.com", password="hash_da_senha")
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    res = auth_client.post(f"/usuarios/{user.id}/seguir")
    dtres = res.json()
    assert res.status_code == 200
    assert dtres["seguindo_id"] == user.id


## cenario 10: seguir própria conta, deve retornar erro
def test_follow_myself(auth_client):
    res = auth_client.get("/usuarios/me")
    dtres = res.json()
    assert dtres["id"] is not None
    res = auth_client.post(f"/usuarios/{dtres["id"]}/seguir")    
    assert res.status_code == 400


## cenario 11: seguir  conta que já está seguindo
def test_follow_already_follow(auth_client,db_session):
    user = User(name="otavio", email="ot@example.com", password="hash_da_senha")
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    auth_client.post(f"/usuarios/{user.id}/seguir")
    res = auth_client.post(f"/usuarios/{user.id}/seguir")
    dtres =  res.json()
    assert res.status_code == 200
    assert dtres["mensagem"] == "Você já segue este usuário"

## cenário 12: seguir conta que não existe
def test_follow_nobody(auth_client,client,db_session):

    res = auth_client.post(f"/usuarios/{-2}/seguir")
    dtres =  res.json()
    assert res.status_code == 200
    assert dtres["mensagem"] == "Você já segue este usuário"






