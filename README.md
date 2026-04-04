# Tee Store

A full-stack e-commerce app for custom t-shirts, built with Next.js 15, Prisma, and PostgreSQL.

## Prerequisites

- **Node.js** v18+
- **PostgreSQL** database
- **Cloudinary** account (image storage)
- **Google account** with OAuth credentials (email sending via Nodemailer)

## Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Auth
JWT_SECRET="your-jwt-secret"
JWT_VALIDATION_SECRET="your-jwt-validation-secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_SECRET="your-api-secret"

# Email (Google OAuth)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_REFRESH_TOKEN="your-google-refresh-token"

# App
NEXT_PUBLIC_URL="http://localhost:3000"
```

## Setup & Run

**1. Install dependencies**

```bash
npm install
```

**2. Run database migrations**

```bash
npx prisma migrate deploy
```

**3. Generate Prisma client**

```bash
npx prisma generate
```

**4. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Other Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Production build (runs `prisma generate` automatically) |
| `npm start` | Start the production server |

## Docker

A `Dockerfile` is included. Build and run with:

```bash
docker build -t tee-store .
docker run -p 3000:3000 --env-file .env tee-store
```
