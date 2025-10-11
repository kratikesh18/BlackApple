This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- MongoDB database (local or cloud)
- Spotify Developer Account (for OAuth)

### Environment Setup

1. Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in the required environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXTAUTH_SECRET`: Generate a secure random string (you can use `openssl rand -base64 32`)
   - `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for local development)
   - `SPOTIFY_CLIENT_ID`: From Spotify Developer Dashboard
   - `SPOTIFY_CLIENT_SECRET`: From Spotify Developer Dashboard

### Running Locally

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository on Vercel
3. Configure environment variables:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Make sure to set `NEXTAUTH_URL` to your production URL (e.g., https://yourdomain.com)
4. Deploy!

### Deploy on Other Platforms

This app can also be deployed on:
- **Netlify**: Connect your Git repository and configure build settings
- **Railway**: Deploy with automatic HTTPS and database support
- **DigitalOcean App Platform**: Deploy with managed infrastructure
- **AWS Amplify**: Deploy with AWS managed services

**Important**: Ensure all environment variables are properly configured on your deployment platform.

### Build Configuration

The app is configured with:
- Automatic API base URL detection (no manual configuration needed in production)
- Image optimization for Spotify CDN images
- Middleware for authentication protection
- MongoDB connection pooling

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
