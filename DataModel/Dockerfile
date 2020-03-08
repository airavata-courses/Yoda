FROM python:3

RUN python -m pip install --user --upgrade pip

WORKDIR /app

COPY requirements.txt .

RUN pip install --user -r requirements.txt

COPY . .

CMD ["python", "app.py"]