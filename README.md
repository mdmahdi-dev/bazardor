# BazarDor — Daily Market Price Tracker

BazarDor is a responsive web application that helps users explore daily market products and track price changes. Users can browse products, compare current prices with previous prices, view product details, and manage their accounts.

## Features

- **Product browsing:** Explore market products with names, categories, and prices.
- **Price tracking:** Compare today's prices with yesterday's, last week's, and last month's prices.
- **Price movement:** View products with rising and falling prices.
- **Product details:** Open individual product pages for more information.
- **Search and filtering:** Find products and browse by category.
- **Authentication:** Sign up, log in, and log out using email and password.
- **Profile management:** Access and manage your account profile.
- **Responsive design:** Use the application on mobile, tablet, and desktop screens.
- **Loading and error handling:** Display loading states and a custom not-found page.

## Technologies Used

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Better Auth
- MongoDB Atlas
- Git and GitHub
- Vercel

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB Atlas database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mdmahdi-dev/bazardor.git
   cd bazardor
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root and configure your environment variables:

   ```env
   MONGODB_URI="your_mongodb_connection_string"
   BETTER_AUTH_SECRET="your_secure_auth_secret"
   BETTER_AUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

   Use your own credentials. Never commit `.env.local` or expose database passwords and authentication secrets.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Production Build

Check the application with:

```bash
npm run build
```

## Deployment

Deploy the project using [Vercel](https://vercel.com/). Configure the required environment variables in the Vercel project settings before deploying.

## Repository

[GitHub — mdmahdi-dev/bazardor](https://github.com/mdmahdi-dev/bazardor)

---

Built as a Programming Hero Assignment 7 project.
