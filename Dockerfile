# syntax=docker/dockerfile:1
FROM ubuntu:22.04

WORKDIR /Household_Chores_Schedule
COPY . .
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip install -r requirements.txt

RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get -y install nodejs
RUN npm install
RUN npm run build

ENV FLASK_APP=weekly_schedule
EXPOSE 3000
CMD flask run --host 0.0.0.0 --port 3000
