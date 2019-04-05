# Alpine
FROM python:3.7-alpine

RUN apk add --update gcc bash libc-dev fortify-headers linux-headers && rm -rf /var/cache/apk/*

RUN mkdir -p /home/app
COPY ./run /home/app
COPY requirements.txt /home/app
RUN mkdir -p /home/app/keeplinkin
ADD keeplinkin /home/app/keeplinkin

WORKDIR /home/app
RUN pip install -r requirements.txt

ENV PYTHONPATH=/home/app
ENV REDIS_HOST=redis

EXPOSE 8000

RUN chmod +x /home/app/run

ENTRYPOINT ["/home/app/run"]