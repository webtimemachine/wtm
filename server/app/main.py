from time import time
from fastapi import FastAPI, __version__
from routes.routes import router
from services.supabase import supabaseRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import logging

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(filename='error.log', level=logging.ERROR, format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

logging.basicConfig(filename='info.log', level=logging.INFO, format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

logging.info('Starting app', __version__)

app.include_router(supabaseRouter)
app.include_router(router)

# Mounting static file static/login.html
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get('/ping')
async def hello():
    logging.debug('ping')
    return {'res': 'pong', 'version': __version__, "time": time()}