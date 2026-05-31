# ─── Stage 1 : build ───────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copie uniquement les manifestes pour profiter du cache Docker
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# Copie le reste du code et build
COPY . .
RUN npm run build

# ─── Stage 2 : serve ──────────────────────────────────────────────
FROM nginx:1.25-alpine AS runner

# Retire la config par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Config nginx SPA
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copie uniquement les assets buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx tourne en non-root
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]