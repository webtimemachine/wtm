from os import getenv
from time import time
from fastapi import FastAPI, Request, HTTPException
from routes.routes import router
from services.supabase import supabaseRouter
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from models.models import Log, session

import logging

app = FastAPI()

templates = Jinja2Templates(directory="templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(filename='error.log', level=logging.ERROR, format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

logging.basicConfig(filename='info.log', level=logging.INFO, format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

API_VERSION = getenv("API_VERSION", "0.1.0")

logging.info('Starting app %s', API_VERSION)

app.include_router(supabaseRouter)
app.include_router(router)

# Mounting static folder
# app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get('/login')
async def login(request: Request, provider = "github"):
    return templates.TemplateResponse("login.html", {"request": request, "provider": provider, 'supabaseUrl': getenv("SUPABASE_URL", ""), 'supabaseAnonKey': getenv("SUPABASE_ANON_KEY", "")})

@app.get('/')
@app.get('/login-success')
async def login(request: Request, provider = "github"):
    return templates.TemplateResponse("login-success.html", {"request": request, "provider": provider, 'supabaseUrl': getenv("SUPABASE_URL", ""), 'supabaseAnonKey': getenv("SUPABASE_ANON_KEY", "")})

@app.get('/health')
async def health():
    logging.debug('health')
    
    try:
        count = session.query(Log.deviceName).limit(0).count()
    except Exception as e:
        session.rollback()
        logging.error(e)
        raise HTTPException(status_code=500, detail= "db error")
    finally:
        session.close()
    
    return {'version': API_VERSION, "time": time(), "db": count == 0}

@app.get('/setup')
async def setup():
    logging.debug('setup')
    return {'version': API_VERSION, "supabaseUrl": getenv("SUPABASE_URL", ""), 'supabaseAnonKey': getenv("SUPABASE_ANON_KEY", "")}