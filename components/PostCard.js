import Link from 'next/link'

/**
 * PostCard – displays a blog post summary card in the Writing grid.
 *
 * Renders the post title, formatted date, description, and a set of tag pills.
 * The entire card is wrapped in a Next.js Link so the full area is clickable.
 *
 * @param {{ title: string, date: string, description: string, tags: string[], href: string }} props
 * @returns {JSX.Element}
 */
export default function PostCard({ title, date, description, tags, href }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-light-border dark:border-dark-border
        bg-light-bg dark:bg-dark-bg p-5
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-lg
        hover:border-light-accent/60 dark:hover:border-dark-accent/60
        hover:bg-light-accent/5 dark:hover:bg-dark-accent/5
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-light-accent dark:focus-visible:ring-dark-accent"
    >
      <p className="text-xs text-light-text dark:text-dark-text-secondary mb-1">{date}</p>
      <h3 className="text-base md:text-lg font-semibold text-light-text-dark dark:text-dark-text leading-snug mb-2">
        {title}
      </h3>
      <p className="text-sm text-light-text dark:text-dark-text leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>
      {tags.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Post tags">
          {tags.map((tag) => (
            <li key={tag}>
              <span
                className="inline-block rounded-full px-3 py-0.5 text-xs font-medium
                  bg-light-accent/20 text-light-accent-hover
                  dark:bg-dark-accent/20 dark:text-dark-accent"
              >
                {tag}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Link>
  )
}
