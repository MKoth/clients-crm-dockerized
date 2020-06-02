# pull official base image
FROM python:3

# set environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# install psycopg2 dependencies
#RUN apk update 
#    && apk add postgresql-dev gcc python3-dev musl-dev

# install netcat for running nc in bash file
RUN apt-get update && apt-get install -y netcat

# create set work directory
RUN mkdir /backend
WORKDIR /backend

# install dependencies
RUN pip install --upgrade pip
COPY requirements.txt /backend/
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh /backend/entrypoint.sh

# copy project
COPY . /backend/
EXPOSE 8000

# run entrypoint.sh
ENTRYPOINT ["/backend/entrypoint.sh"]
