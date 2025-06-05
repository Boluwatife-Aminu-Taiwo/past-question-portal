from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, Query
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.routes.scraper import fetch_courses
from app.routes.course_utils import CourseData
from app.models import Course, PastQuestion
from app.schemas import PastQuestionOut
from app.deps import get_db
from typing import List
import shutil
import os
from datetime import datetime
from pathlib import Path
import json

router = APIRouter()
URL = "https://tech.ui.edu.ng/courses-8"
# Setup upload directory
UPLOAD_DIR = Path("app/uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# metadata_file = Path("uploads/metadata.json")

# # Save upload metadata locally (optional)
# def save_metadata(filename, course_code):
#     metadata = {}
#     if metadata_file.exists():
#         with open(metadata_file, "r") as f:
#             metadata = json.load(f)

#     metadata[filename] = {
#         "course_code": course_code,
#         "uploaded_at": datetime.now().isoformat()
#     }

#     with open(metadata_file, "w") as f:
#         json.dump(metadata, f, indent=2)


# Upload past question endpoint
@router.post("/upload")
async def upload_past_question(
    course_code: str = Form(...),
    year: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Check if course exists
    course = db.query(Course).filter_by(code=course_code.upper()).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    past_question = PastQuestion(
        course_code=course.code,
        course_id=course.id,  # Proper link to course
        filename=file.filename,
        filepath=file_location,
        year=year,
    )
    db.add(past_question)
    db.commit()
    db.refresh(past_question)
    # save_metadata(file.filename, course_code)

    return {"message": "Upload successful", "id": past_question.id}

# upload courses endpoint
@router.post("/courses")
def scrape_and_save_courses(db: Session = Depends(get_db)):
    courses = fetch_courses(URL)

    seen_codes = set()
    unique_courses = []
    for c in courses:
        if c.code in seen_codes:
            print(f"Duplicate in fetched data, skipping course {c.code}")
            continue
        seen_codes.add(c.code)
        unique_courses.append(c)

    added_count = 0
    for c in unique_courses:
        existing_course = db.query(Course).filter_by(code=c.code).first()
        if existing_course:
            print(f"Course {c.code} already exists in DB, skipping.")
            continue

        new_course = Course(
            code=c.code,
            title=c.title,
            unit=c.gpa,
            status=c.status,
            level=c.year
        )
        db.add(new_course)
        added_count += 1
        print(f"Adding course: {c.code} - {c.title}")

    try:
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error committing to DB: {e}")
        return {"error": "Failed to save courses due to DB error."}

    saved_count = db.query(Course).count()
    print(f"Total courses now saved: {saved_count}")
    return {"added": added_count}



# get past question endpoint
@router.get("/past-questions", response_model=List[PastQuestionOut])
def get_all_questions(
    course_code: str = Query(None),
    course_title: str = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(PastQuestion).join(Course)

    if course_code:
        query = query.filter(Course.code.ilike(f"%{course_code}%"))
    if course_title:
        query = query.filter(Course.title.ilike(f"%{course_title}%"))

    return query.all()


# get pastquestion endpoint
@router.get("/past-questions/{filename}")
def get_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename=filename)
    return {"error": "File not found"}


# get courses endpoint
@router.get("/get-courses")
def get_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()

# delete past question endpoint

@router.delete("/past-questions/{file_id}")
def delete_past_question(file_id: int, db: Session = Depends(get_db)):
    record = db.query(PastQuestion).filter(PastQuestion.id == file_id).first()

    if not record:
        raise HTTPException(status_code=404, detail="File not found")

    # Delete the physical file from disk
    # file_path = UPLOAD_DIR / record.filename
    # if file_path.exists():
    #     file_path.unlink()

    # Delete the DB record
    db.delete(record)
    db.commit()

    return {"detail": "File deleted successfully"}