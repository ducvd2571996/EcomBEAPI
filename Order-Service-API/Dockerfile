ARG NODE_IMAGE=node:16-alpine   

FROM $NODE_IMAGE as base

RUN npm install -g pm2

FROM base as builder

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . ./

RUN npm run build
RUN npm ci --only=production --ignore-scripts && npm cache clean --force

FROM base AS runner
WORKDIR /usr/src/app

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=builder /usr/src/app ./

COPY pm2-config.yml ./

EXPOSE 3004

CMD pm2-runtime start pm2-config.yml
