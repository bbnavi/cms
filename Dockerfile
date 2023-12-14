FROM node:16.13

RUN mkdir -p /app
WORKDIR /app

# copy the app, note .dockerignore
COPY . /app/

# copy generated favicons into new nuxt3 stucture, public folder instead of static
RUN mkdir -p /app/public
# RUN cp -r /app/static/* /app/public

RUN yarn install
# build necessary, even if no static files are needed,
# since it builds the server as well

ARG NUXT_PUBLIC_AUTH_SECRET
ARG NUXT_PUBLIC_AUTH_ORIGIN
ARG NUXT_PUBLIC_AUTH_ENDPOINT
ARG NUXT_PUBLIC_USER_ENDPOINT
ARG NUXT_PUBLIC_GRAPHQL_ENDPOINT
ARG NUXT_PUBLIC_GRAPHQL_AUTH_ENDPOINT

ENV NUXT_PUBLIC_AUTH_SECRET="CDP3a8GPqvJyf498svvHWy7EX7uztnwP"
ENV NUXT_PUBLIC_AUTH_ORIGIN="https://cms.bbnavi.de"
ENV NUXT_PUBLIC_AUTH_ENDPOINT="https://datahub.bbnavi.de/users/sign_in.json"
ENV NUXT_PUBLIC_USER_ENDPOINT="https://datahub.bbnavi.de/user.json"
ENV NUXT_PUBLIC_GRAPHQL_ENDPOINT="https://datahub.bbnavi.de/graphql"
ENV NUXT_PUBLIC_GRAPHQL_AUTH_ENDPOINT="https://datahub.bbnavi.de/oauth/token"

RUN env

RUN yarn run build


