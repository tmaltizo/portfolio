This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The project now includes a simple navigation bar at the top of every page. Links are defined in
`components/navLinks.js` and automatically rendered by `components/NavBar.js`. By default the
header contains links for **Home**, **About**, **Writing**, and **Projects**; adding a new object
there and creating the corresponding page (e.g. `pages/contact.js`) is all that’s required to
extend the menu.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Contact form / SendGrid setup

This project ships with a simple API route that uses SendGrid to deliver messages from the
contact form (`components/Contact.js`). Before the route will work you must:

1. Create an [API key in your SendGrid dashboard](https://app.sendgrid.com/settings/api_keys) and give it
   *Full Access* to `Mail Send`.
2. Add the key to your environment as `SENDGRID_API_KEY`.
   - Locally create a `.env.local` file in the project root and add:
     ```env
     SENDGRID_API_KEY=SG.your_real_key_here
     ```
   - When deploying (for example to Vercel) add the same variable through the platform's
     dashboard or CLI.
3. Verify the `from` address in your SendGrid account. SendGrid will reject
   any message whose sender does not match a **verified Sender Identity**;
   the error you saw earlier (`The from address does not match a verified Sender Identity`)
   is exactly this problem. Go to SendGrid → *Settings → Sender Identities* and either
   verify the email you intend to use or configure a custom domain.
   
   The API now reads the sender and recipient from environment variables:
   ```env
   # must be a verified sender identity inside SendGrid. you can use your
   # existing Gmail address if you've verified it as shown in your screenshot.
   SENDGRID_FROM_EMAIL=tristan.maltizo@gmail.com

   # where the messages are delivered; defaults to the same value as
   # SENDGRID_FROM_EMAIL if you leave it unset (handy when emailing yourself).
   SENDGRID_TO_EMAIL=tristan.maltizo@gmail.com
   ```
   If the variables are empty the code falls back to previous hard-coded
   defaults (`to`→your gmail, `from`→`no-reply@trizothethird.com`).

Once configured you can submit the form on the home page and watch the server logs for
`sendgrid result` or `sendgrid error` messages. Errors will also be returned in the JSON
response so you can display them in the UI if desired.

For local debugging there is a simple helper script at the project root, `test-sendgrid.js`.
Run it with a correctly‑formatted (or dummy) key to exercise the API handler without starting
Next.js:

```bash
# check behaviour when key is missing
node test-sendgrid.js

# simulate a bad but syntactically valid key
SENDGRID_API_KEY=SG.fake node test-sendgrid.js
```

The script sends a fake form payload and prints the handler’s response, which is handy when
iterating or writing tests. You can remove it later if you like.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
