# app/routes.py
from fastapi import APIRouter, HTTPException, Request
from sqlalchemy import desc
from user_agents import parse
from models import Log, session

router = APIRouter()

@router.get("/logs")
async def get_logs(limit: int = 50, offset: int = 0):
    try:
        logs = session.query(Log).order_by(desc(Log.id)).limit(limit).offset(offset).all()
        count = session.query(Log).count()
        return {'urls': logs, 'count': count}
    except Exception as error:
        logging.error('Error while fetching logs:', exc_info=error)
        raise HTTPException(status_code=500, detail="An error occurred while fetching logs")

@router.get("/"){
    return 'Hello World'

}

@router.post("/")
async def index(request: Request):
    ua = parse(request.headers.get('user-agent'))
    url = request.query_params.get('url')

    if url:
        new_log = Log(url=url, browserName=ua.browser.family, browserVersion=ua.browser.version_string,
                           osName=ua.os.family, osVersion=ua.os.version_string)
        session.add(new_log)
        session.commit()

    return 'Ok'