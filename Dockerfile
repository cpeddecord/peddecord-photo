FROM node:8-alpine as builder
# cache dem modules
ADD package*.json /tmp/
RUN cd /tmp && npm install --quiet --no-optional --color false

RUN mkdir -p /var/www
WORKDIR /var/www

RUN  cp -a /tmp/node_modules /var/www/
COPY . . 

RUN npm run tsc
RUN npm prune --production

# working container
FROM node:8-alpine
ENV NODE_ENV=production
ARG BUILD_DATE
ENV COMMIT_REF=${COMMIT_REF} \
  BUILD_DATE=${BUILD_DATE}

WORKDIR /var/www
COPY --from=builder /var/www/lib ./lib
COPY --from=builder /var/www/node_modules ./node_modules
EXPOSE 3000

CMD ["node", "lib/app.js", "--max_old_space_size=", "408"]