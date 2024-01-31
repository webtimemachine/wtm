# app/routes.py
import logging
from typing import Optional
from fastapi import APIRouter, HTTPException, Request
from sqlalchemy import desc
from user_agents import parse
from models import Log, session
from pydantic import BaseModel

router = APIRouter()

@router.get("/devices")
async def get_devices(userId : int):
    try:
        devices = session.query(Log.deviceName).filter(Log.userId == userId).distinct().all()
        devices = [device[0] for device in devices]
        try:
            devices.remove(None)
        except:
            pass
                    
        return {'devices': devices}
    except Exception as error:
        logging.error('Error while fetching devices:', exc_info=error)
        raise HTTPException(status_code=500, detail="An error occurred while fetching devices")
@router.get("/logs")
async def get_logs(limit: int = 50, offset: int = 0, deviceName: Optional[str] = None, userId: int = 1):
    try:
        logsQuery = session.query(Log)
        countQuery = session.query(Log)
        countQuery = countQuery.filter(Log.userId == userId)
        if deviceName is not None and deviceName != 'All':
            countQuery = countQuery.filter(Log.deviceName == deviceName)
            logsQuery = logsQuery.filter(Log.deviceName == deviceName)
        count = countQuery.count()
        logsQuery = logsQuery.order_by(desc(Log.id)).filter(Log.userId == userId).limit(limit).offset(offset).all()
        return {'urls': logsQuery, 'count': count}
    except Exception as error:
        logging.error('Error while fetching logs:', exc_info=error)
        raise HTTPException(status_code=500, detail="An error occurred while fetching logs")

@router.get("/")
async def hello_world():
    return {'message': 'Hello World!'}

class LogPost(BaseModel):
    title: str
    url: str
    # Making content optional
    content: Optional[str] = None
    deviceName: Optional[str] = None
@router.post("/")
async def index(request: Request, logPost: LogPost):
    ua = parse(request.headers.get('user-agent'))
    url = logPost.url
    title = logPost.title
    

    if url:
        new_log = Log(url=url, title=title, browserName=ua.browser.family, browserVersion=ua.browser.version_string,
                           osName=ua.os.family, osVersion=ua.os.version_string, userId=1, deviceName=logPost.deviceName)
        session.add(new_log)
        session.commit()

    return 'Ok'