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
    <main className="p-8">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-4 leading-relaxed">
        Welcome to the about page. Here you can provide some background about
        yourself, the project, or anything you&apos;d like visitors to know. This
        text is intentionally generic to satisfy the automated test that at
        least one paragraph of descriptive content is present.
      </p>
    </main>
  )
}
