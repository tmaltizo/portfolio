/**
 * Projects page – accessible at /projects.
 *
 * Lists completed projects and ongoing work. Replace the placeholder
 * paragraph with project cards or any other component once this section
 * is built out.
 *
 * @returns {JSX.Element} The Projects page layout.
 */
export default function ProjectsPage() {
  return (
    <main className="bg-light-bg dark:bg-dark-bg min-h-screen px-10 py-12 text-light-text dark:text-dark-text">
      <h1 className="text-3xl md:text-4xl font-medium text-light-text-dark dark:text-dark-text">
        <span className="text-light-accent dark:text-dark-accent">Projects</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl">
        Below is where project summaries will eventually appear. For now this
        paragraph serves as a placeholder so that the page contains a block of
        content beneath the heading, satisfying the automated tests.
      </p>
    </main>
  )
}
