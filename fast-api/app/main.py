from time import time
from fastapi import FastAPI, __version__
from routes import router
from fastapi.middleware.cors import CORSMiddleware
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

app.include_router(router)

@app.get('/ping')
async def hello():
    logging.debug('ping')
    return {'res': 'pong', 'version': __version__, "time": time()}