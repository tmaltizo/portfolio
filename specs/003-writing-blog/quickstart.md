# Quickstart: Writing Blog

This document shows the minimal steps required to publish a new blog post and view it locally.

1. **Add a Markdown/MDX file**
   - Create a new file in the repository root under `posts/`. If the `posts/` folder does not exist yet, create it.
   - Filename should be a URL-safe slug (lowercase, hyphens instead of spaces), for example: `robinhood-gold-card.md`.
   - Include frontmatter at the top using `---` delimiters. Example:
     ```markdown
     ---
     title: "Robinhood Gold Card Review"
     date: "2026-03-15"
     description: "My thoughts on the new Robinhood Gold credit card."
     tags:
       - Finance
       - Credit Cards
     ---

     The body of your article goes here.
     ```
   - Optionally use `.mdx` extension if you need to embed JSX or custom components.
   - Use standard markdown syntax for text formatting and images. You may embed video/animation via an `<iframe>` or other HTML/JSX snippet.
   - Place any local images or assets in `public/` and reference them with `/image.png`.

2. **Run the development server**
   ```bash
   npm run dev
   # or yarn dev
   ```
   Navigate to `http://localhost:3000/writing` to see the grid update automatically. If using Next.js hot-reloading, the page should refresh when the file is saved.

3. **View an individual post**
   Click on the card for your new post in the grid. You will be taken to `/writing/<slug>` where the full content renders.

4. **Publishing**
   - Commit the new file to Git and push to the `003-writing-blog` branch or create a pull request.
   - Once merged into `main`, the new post will appear on the live site automatically via Vercel deploy.

5. **Tag filtering**
   - Tags listed on the Writing page can be clicked to filter the grid. Ensure your frontmatter `tags` array includes any categories you want visitors to filter by.

That's it! Adding additional posts follows the same pattern: create a Markdown/MDX file, write your content, and let Next.js rebuild.