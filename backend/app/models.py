from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from app.database import Base

Base = declarative_base()

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True)
    title = Column(String)
    unit = Column(String)
    status = Column(String) 
    level = Column(String)
    past_questions = relationship("PastQuestion", back_populates="course")

class PastQuestion(Base):
    __tablename__ = "past_questions"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    course_code = Column(String, index=True)
    course_title = Column(String)
    filename = Column(String) 
    filepath = Column(String)
    uploaded_at = Column(DateTime, default=datetime.now)
    year = Column(String)

    course = relationship("Course", back_populates="past_questions")
    

