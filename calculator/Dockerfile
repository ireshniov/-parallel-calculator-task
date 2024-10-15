ARG NODE_VERSION=18
ARG DEBIAN_VERSION=buster

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim as development

WORKDIR /calculator-app

EXPOSE 8080

ENTRYPOINT ["bash", "-c"]

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim as builder

WORKDIR /calculator-app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY tsconfig.build.json .

RUN npm ci --ignore-scripts

COPY src src

RUN npm run build

FROM node:${NODE_VERSION}-${DEBIAN_VERSION}-slim as release

WORKDIR /calculator-app

# Add Tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

RUN addgroup --gid 1001 --system calculator && \
    adduser --system --uid 1001 --gid 1001 calculator && \
    chown -R calculator:calculator /calculator-app && \
    chown calculator:calculator /tini

RUN mkdir -p /var/logs/calculator && \
    chown -R calculator:calculator /var/logs/calculator

COPY --chown=calculator:calculator --from=builder /calculator-app/package.json package.json
COPY --chown=calculator:calculator --from=builder /calculator-app/node_modules node_modules
COPY --chown=calculator:calculator --from=builder /calculator-app/dist dist

USER 1001:1001

CMD ["node", "dist/main.js"]
