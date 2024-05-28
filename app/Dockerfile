FROM node:latest as build-frontend
WORKDIR /app
COPY frontend/ ./frontend/
RUN cd frontend && npm install
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

FROM python:3.11-slim AS base
ENV PATH /opt/venv/bin:$PATH
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

FROM base AS poetry-installer
WORKDIR /opt
RUN pip install poetry
COPY pyproject.toml poetry.lock ./
RUN poetry config virtualenvs.in-project true \
&& poetry install --no-interaction --no-root --only main

FROM base as worker
WORKDIR /app
COPY . .
COPY --from=poetry-installer /opt/.venv .venv
RUN rm -rf /app/frontend
COPY --from=build-frontend /app/frontend/ /app/frontend
RUN useradd -r user
RUN chown user /app && chown user /app/db.sqlite3 || true
RUN chown user /app/media -R && chown user /app/core -R

USER user
EXPOSE 80
ENTRYPOINT .venv/bin/python manage.py runserver 0.0.0.0:80