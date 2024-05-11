FROM python:3.11-slim AS base
ENV PATH /opt/venv/bin:$PATH
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

FROM base AS builder
WORKDIR /opt
RUN pip install poetry
COPY pyproject.toml poetry.lock ./
RUN poetry config virtualenvs.in-project true \
    && poetry install --no-interaction --no-root --only main

FROM base as worker
WORKDIR /opt

ARG SERVER_VERSION
ENV SERVER_VERSION $SERVER_VERSION

ARG PORT=8080
ENV PORT $PORT
EXPOSE $PORT

COPY --from=builder /opt/.venv .venv
COPY main.py main.py
RUN useradd -r user
USER user
ENTRYPOINT .venv/bin/gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app
