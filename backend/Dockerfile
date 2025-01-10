# Using python 3.13-slim-bookworm as base image to have access to the latest python bugfixes and features while keeping the image size small
FROM python:3.13-slim-bookworm

# ensurre that python output (stderr, stdout) is sent straight to terminal without being buffered
ENV PYTHONUNBUFFERED 1
# Since we are using docker, we don't need to generate .pyc files because the process will run just once continuously
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /backend

# Install libpq5 to avoid psycopg2 error
RUN apt-get update && apt install libpq5 -y
# install required dependencies
COPY requirements.txt /backend/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /backend/

CMD [ "python3", "manage.py", "runserver", "0.0.0.0:8000" ]
