FROM python:3.9-slim-buster

# ADD app/ /

WORKDIR /app

COPY app/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

# WORKDIR /app/app

CMD ["uvicorn", "main:app", "--reload", "--host=0.0.0.0", "--port=8000"]