from pydantic import BaseModel
from datetime import datetime

class PastQuestionOut(BaseModel):
    id: int
    course_code: str
    course_title: str | None = None
    filename: str
    filepath: str
    uploaded_at: datetime

    class Config:
        orm_mode = True
