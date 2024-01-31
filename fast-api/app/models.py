# app/models.py
from sqlalchemy import create_engine, Column, Integer, String, func, DateTime, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv("../.env")
from os import getenv

dburi = getenv('POSTGRES_URL')
if dburi and dburi.startswith("postgres://"):
    # This is necessary for the app to work on Vercel
    dburi = dburi.replace("postgres://", "postgresql://", 1)

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
    userId = Column(Integer, ForeignKey('users.id'))
    createdAt = Column(DateTime, default=func.current_timestamp())
    updatedAt = Column(DateTime, default=func.current_timestamp(), onupdate=func.current_timestamp())
    
class User(Base):
    __tablename__ = "users"
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
        
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    createdAt = Column(DateTime, default=func.current_timestamp())
    updatedAt = Column(DateTime, default=func.current_timestamp(), onupdate=func.current_timestamp())
    
Base.metadata.create_all(engine)