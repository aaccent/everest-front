FROM node:21-alpine AS base

ENV PNPM_HOME="/pnpm"
RUN corepack enable pnpm
WORKDIR /app

FROM base AS prod-deps
RUN apk add --no-cache libc6-compat

COPY package.json pnpm-lock.yaml ./
RUN npm pkg delete scripts.prepare
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS builder
RUN apk add --no-cache libc6-compat

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .

RUN pnpm run build

FROM base AS runner
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown nextjs:nodejs .

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=prod-deps --chown=nextjs:nodejs /app/node_modules/ ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE ${PORT}

CMD HOSTNAME="0.0.0.0" PORT=${PORT} node server.js