Certainly! Here is the formatted `README.md` file:

---

# Next.js Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Install Packages

```bash
npm i 

```

### Configure Your OAuth Client ID

Fill this URL in "Authorized redirect URIs" while configuring:
```
http://localhost:3000/api/auth/callback/google
```

### Setup Environment Variables

Add the following keys to your `.env` file:

```
API_KEY="Your API Key"
GOOGLE_CLIENT_SECRET="Your Google Client Secret"
GOOGLE_CLIENT_ID="Your Google Client ID"
AUTH_SECRET="Your Auth Secret"
```

You can get your `AUTH_SECRET` by running:
```bash
npx auth secret
```

### Run the Development Server

To start the development server, run:

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

You can start editing the page by modifying `app/page.jsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - Your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---