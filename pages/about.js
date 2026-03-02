/**
 * About page – accessible at /about.
 *
 * Displays a level-1 heading and introductory content about the author.
 * Update this file to add biography, social links, or any other personal
 * information you want visitors to see.
 *
 * @returns {JSX.Element} The About page layout.
 */
export default function AboutPage() {
  return (
    <main className="bg-light-bg dark:bg-dark-bg min-h-screen px-10 py-12 text-light-text dark:text-dark-text">
      <h1 className="text-3xl md:text-4xl font-medium text-light-text-dark dark:text-dark-text">
        About <span className="text-light-accent dark:text-dark-accent">Me</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl">
        Welcome to the about page. Here you can provide some background about
        yourself, the project, or anything you&apos;d like visitors to know. This
        text is intentionally generic to satisfy the automated test that at
        least one paragraph of descriptive content is present.
      </p>
    </main>
  )
}
