/**
 * Writing page – accessible at /writing.
 *
 * Intended to host blog posts, articles, or other written content.
 * Replace the placeholder paragraph with an article list, MDX content,
 * or any other component once ready.
 *
 * @returns {JSX.Element} The Writing page layout.
 */
export default function WritingPage() {
  return (
    <main className="bg-light-bg dark:bg-dark-bg min-h-screen px-10 py-12 text-light-text dark:text-dark-text">
      <h1 className="text-3xl md:text-4xl font-medium text-light-text-dark dark:text-dark-text">
        <span className="text-light-accent dark:text-dark-accent">Writing</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl">
        This section hosts my variously categorized blog posts, articles, or any
        written content I want to share. Feel free to explor this page to check out my latest thoughts and insights on software development, technology trends, or any other topics I find interesting. Stay tuned for regular updates and new content!
      </p>
    </main>
  )
}
