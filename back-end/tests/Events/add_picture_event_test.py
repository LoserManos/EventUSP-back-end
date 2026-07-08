import pytest
from sqlmodel import Session, select
from app.models import User, Event
import os
import shutil
import datetime


def test_upload_event_picture_sucess(auth_client, db_session):

    user = db_session.exec(select(User).where(User.email == "test@example.com")).first()
    event = Event(
        title="seila",
        start_date=datetime.datetime(2027, 5, 10, 14, 0, 0),
        duration=60,
        local="Pátio",
        category_id=2,
        user_id=user.id
    )
    db_session.add(event)
    db_session.commit()
    db_session.refresh(event)

    file_name = "test_event.jpg"
    file_content = b"fake_image_content"
    file_name2 = "test_event.jpg"
    file_content2 = b"fake_image_content"
    files = {"file": (file_name, file_content, "image/jpeg")}
    response = auth_client.post(f"/eventos/{event.id}/fotos", files=files)
    assert response.status_code == 201
    data = response.json()
    assert data["mensagem"] == "Foto adicionada no evento com sucesso."
    assert "event_" in data["url"]
    ## foto 2    
    files = {"file": (file_name2, file_content2, "image/jpeg")}
    response = auth_client.post(f"/eventos/{event.id}/fotos", files=files)
    assert response.status_code == 201
    data = response.json()
    assert data["mensagem"] == "Foto adicionada no evento com sucesso."
    assert "event_" in data["url"]
    
    
    
    full_path = f"app/{data['url']}"
    if os.path.exists(full_path):
        os.remove(full_path)

def test_upload_event_photo_no_permission(auth_client, db_session):
    other_event = Event(user_id=999,title="seila",
        start_date=datetime.datetime(2027, 5, 10, 14, 0, 0),
        duration=60,
        local="Pátio",
        category_id=2,)
    db_session.add(other_event)
    db_session.commit()

    files = {"file": ("test.jpg", b"content", "image/jpeg")}
    response = auth_client.post(f"/eventos/{other_event.id}/fotos", files=files)
    
    assert response.status_code == 403