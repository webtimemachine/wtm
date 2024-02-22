# app/models.py
from sqlalchemy import create_engine, Column, Integer, String, func, DateTime, ForeignKey, UUID
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
from os import getenv
import logging
import re


try:
    load_dotenv("../.env")
except Exception as e:
    logging.error(f"Error loading .env file: {e}", exc_info=e)

dburi = getenv('POSTGRES_URL')
if dburi and dburi.startswith("postgres://"):
    # This is necessary for the app to work on Vercel
    dburi = dburi.replace("postgres://", "postgresql://", 1)
    
# This is to clean the dburi of any query parameters 
dburi = re.sub(r"[?&]supa=[^&]*", "", dburi)
dburi = re.sub(r"\?$", "", dburi)

engine = create_engine(dburi)
Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()

class Log(Base):
    __tablename__ = "logs"
    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'title': self.title,
            'browserName': self.browserName,
            'browserVersion': self.browserVersion,
            'osName': self.osName,
            'osVersion': self.osVersion,
            'deviceName': self.deviceName,
            'userId': self.userId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
        
    id = Column(Integer, primary_key=True)
    url = Column(String)
    title = Column(String)
    browserName = Column(String)
    browserVersion = Column(String)
    osName = Column(String)
    osVersion = Column(String)
    deviceName = Column(String)
    userId = Column(UUID)
    createdAt = Column(DateTime, default=func.current_timestamp())
    updatedAt = Column(DateTime, default=func.current_timestamp(), onupdate=func.current_timestamp())
    
    
try:
    Base.metadata.create_all(engine)
except Exception as e:
    logging.error(f"Error creating tables: {e}", exc_info=e)
