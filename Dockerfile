# ----------------------------
# 1. Builder stage
# ----------------------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Accept env at build time
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

# Build Next.js with those envs
RUN npm run build

# ----------------------------
# 2. Production stage
# ----------------------------
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only package.json files
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy build artifacts and public assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Optional: if you have custom next.config.js or env files
COPY --from=builder /app/next.config.ts ./ 
COPY --from=builder /app/postcss.config.mjs ./ 
COPY --from=builder /app/tailwind.config.ts ./ 

# Expose port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "start"]
