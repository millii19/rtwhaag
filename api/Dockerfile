FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine
WORKDIR /usr/src/api
RUN apk --update add bash gcc
# RUN apk --update add bash nano

COPY . .
RUN pip install --upgrade pip
RUN pip install -r ./requirements.txt
EXPOSE 80
CMD ["start.sh"]
