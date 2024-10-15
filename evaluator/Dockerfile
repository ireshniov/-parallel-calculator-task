ARG NODE_VERSION=18
ARG DEBIAN_VERSION=buster

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim as development

WORKDIR /evaluator-app

EXPOSE 3001

ENTRYPOINT ["bash", "-c"]

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim as builder

WORKDIR /evaluator-app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig.build.json .

RUN npm ci --ignore-scripts

COPY src src

RUN npm run build

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim as release

WORKDIR /evaluator-app

# Add Tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

RUN addgroup --gid 1001 --system evaluator && \
    adduser --system --uid 1001 --gid 1001 evaluator && \
    chown -R evaluator:evaluator /evaluator-app && \
    chown evaluator:evaluator /tini

RUN mkdir -p /var/logs/evaluator && \
    chown -R evaluator:evaluator /var/logs/evaluator

COPY --chown=evaluator:evaluator --from=builder /evaluator-app/package.json package.json
COPY --chown=evaluator:evaluator --from=builder /evaluator-app/node_modules node_modules
COPY --chown=evaluator:evaluator --from=builder /evaluator-app/dist dist

USER 1001:1001

CMD ["node", "dist/main.js"]
