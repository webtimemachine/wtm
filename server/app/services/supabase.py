
from supabase.client import create_client, Client
from dotenv import load_dotenv
from os import getenv
from fastapi import APIRouter

load_dotenv(".env")

url = getenv("SUPABASE_URL", "")
key = getenv("SUPABASE_KEY", "")

supabase: Client = create_client(url, key)

supabaseRouter = APIRouter()

@supabaseRouter.get("/user")
async def callback(code: str):
    if code:
        try:
            res = supabase.auth.get_user(code)
            return {"jwt": code, "user": res.user}
        except Exception as error:
            return {"error": str(error)}
