# Tristan Maltizo's Portfolio

A modern, responsive portfolio website built with Next.js, showcasing projects, writing, and professional journey. This portfolio serves as a digital garden with performance and accessibility in mind.

## Features

- **Modern Design**: Clean, responsive UI with dark/light mode support
- **Project Showcase**: Dynamic project cards with filtering and categorization
- **Blog/Writing Section**: MDX-powered blog with newsletter integration
- **Contact Form**: Functional contact form with SendGrid integration
- **SEO Optimized**: Comprehensive meta tags, structured data, and sitemap
- **Performance**: Optimized images, lazy loading, and fast page loads
- **Accessibility**: WCAG compliant with semantic HTML and ARIA labels

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Database**: Firebase/Firestore for dynamic content
- **Email**: SendGrid for contact form notifications
- **Content**: MDX for blog posts
- **Deployment**: Vercel with CI/CD pipeline

## Project Structure

```
portfolio/
├── components/          # Reusable React components
│   ├── ProjectCard.js  # Individual project display
│   ├── NavBar.js       # Navigation component
│   └── Contact.js      # Contact form
├── pages/              # Next.js pages and API routes
│   ├── projects.js     # Projects showcase page
│   ├── writing/        # Blog posts
│   └── api/           # API endpoints
├── lib/               # Utility functions and data
│   ├── projects.js    # Project data management
│   └── posts.js       # Blog post management
├── posts/             # MDX blog post files
├── public/            # Static assets
└── styles/            # Global CSS and Tailwind config
```

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
# or
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the project root:

```env
# SendGrid Configuration
SENDGRID_API_KEY=SG.your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_verified_email@example.com
SENDGRID_TO_EMAIL=recipient@example.com

# Firebase Configuration (optional)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## SendGrid Setup

1. Create an [API key in your SendGrid dashboard](https://app.sendgrid.com/settings/api_keys) with *Full Access* to `Mail Send`.
2. Add the key to your environment as `SENDGRID_API_KEY`.
3. Verify the `from` address in your SendGrid account under *Settings → Sender Identities*.
4. Configure the sender and recipient emails in your environment variables.

For local debugging, use the test script:
```bash
# Test with missing key
node test-sendgrid.js

# Test with invalid key
SENDGRID_API_KEY=SG.fake node test-sendgrid.js
```

## Content Management

### Adding Projects

Projects are managed in `lib/projects.js`. To add a new project:

```javascript
{
  id: 'project-slug',
  title: 'Project Title',
  description: 'Brief description',
  longDescription: 'Detailed project description',
  image: '/images/project-screenshot.png',
  technologies: ['React', 'Next.js', 'Tailwind'],
  category: 'Web Application',
  status: 'Completed',
  startDate: '2024-01-01',
  lastUpdated: '2024-01-15',
  liveUrl: 'https://live-demo.com',
  githubUrl: 'https://github.com/user/repo',
  featured: true,
  tags: ['frontend', 'web development']
}
```

### Adding Blog Posts

Blog posts are MDX files in the `posts/` directory. Each post should include frontmatter:

```mdx
---
title: "Post Title"
description: "Post description"
date: "2024-01-01"
tags: ["tag1", "tag2"]
---

# Post content here...
```

## Deployment

### Vercel (Recommended)

1. Connect your repository to [Vercel](https://vercel.com/new)
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## Performance Optimization

- **Images**: Optimized with Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Static generation for improved performance
- **Bundle Size**: Optimized dependencies and tree-shaking

## SEO Features

- **Meta Tags**: Dynamic meta descriptions and titles
- **Structured Data**: JSON-LD for search engines
- **Sitemap**: Auto-generated sitemap.xml
- **Open Graph**: Social media sharing optimization

## Poll System

Interactive polls are powered by Firebase Firestore. Polls appear in blog posts and allow readers to vote on questions related to the article.

### How It Works

- Votes are stored in Firestore under the `polls` and `poll_votes` collections
- Results are displayed immediately after voting
- Poll data is initialized on first vote if the poll doesn't exist yet

### Voting Limitations (Per Poll)

- **One vote per browser fingerprint** — the same browser cannot vote twice on the same poll
- **One vote per session** — sessionStorage prevents re-voting within the same browser session
- **Rate limiting** — max 3 votes per hour per IP address across all polls
- These restrictions are appropriate for a portfolio site and are not intended to be bulletproof

### Resetting Poll Data

To clear all poll data (e.g. during development/testing):
```bash
firebase firestore:delete polls --recursive --force
firebase firestore:delete poll_votes --recursive --force
```

## Contributing

This is a personal portfolio project. For suggestions or improvements, please reach out through the contact form or GitHub issues.

## License

MIT License - feel free to use this as a template for your own portfolio.
