FROM python:3

RUN python -m pip install --user --upgrade pip

WORKDIR /app

COPY requirements.txt .

RUN pip install --user -r requirements.txt

COPY . .

EXPOSE 3300

WORKDIR /app/Controllers

CMD ["python", "-u", "server.py"]



