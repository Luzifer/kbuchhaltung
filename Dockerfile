FROM luzifer/alpine-nginx-php

RUN rm -rf /var/www/* \
 && apk-install php-zlib

ADD . /var/www/
ADD doc/docker-env-config /etc/cont-init.d/docker-env-config
