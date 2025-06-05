from pydantic import BaseModel
from datetime import datetime

class CourseOut(BaseModel):
    code: str
    title: str
    status: str
    unit: int
    level: str

    class Config:
        orm_mode = True

class PastQuestionOut(BaseModel):
    id: int
    course_code: str
    filename: str
    uploaded_at: datetime
    year: str
    course: CourseOut

    class Config:
        orm_mode = True
