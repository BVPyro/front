FROM bitnami/node:17 as base
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install

# Development
FROM base as dev
WORKDIR /app
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]

# Building
FROM base as build
WORKDIR /app
COPY . .
COPY --from=base /app .
RUN npm prune --production
RUN npm run build

# Production
FROM bitnami/node:17 as prod
WORKDIR /app
RUN groupadd -g 999 appuser && \
    useradd -r -u 999 -g appuser appuser
USER appuser
COPY --chown=appuser package.json .
COPY --from=build --chown=appuser /app/public ./public
COPY --from=build --chown=appuser /app/.next ./.next
COPY --from=build --chown=appuser /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3001
CMD ["npm", "run", "start"]
