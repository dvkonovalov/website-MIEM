FROM node:latest as build-stage
WORKDIR /app

COPY frontend/ ./frontend/

RUN cd frontend && npm install

COPY frontend/ ./frontend/
RUN cd frontend && npm run build

FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


WORKDIR /app
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

COPY . .
RUN rm -rf /app/frontend
COPY --from=build-stage /app/frontend/ /app/frontend


EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
