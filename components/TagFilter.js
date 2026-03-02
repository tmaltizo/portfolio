/**
 * TagFilter – renders a horizontal list of clickable tag filter pills.
 *
 * The "All" pill clears the active tag; individual tag pills set the active
 * filter. Keyboard-accessible via standard `<button>` elements.
 *
 * @param {{ tags: string[], activeTag?: string, onSelect: (tag?: string) => void }} props
 * @returns {JSX.Element}
 */
export default function TagFilter({ tags, activeTag, onSelect }) {
  const pillBase =
    'inline-block rounded-full px-4 py-1 text-sm font-medium transition-colors duration-150 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-accent dark:focus-visible:ring-dark-accent'

  const activePill =
    'bg-light-accent text-white dark:bg-dark-accent dark:text-dark-bg'

  const inactivePill =
    'bg-light-accent/10 text-light-accent-hover dark:bg-dark-accent/10 dark:text-dark-accent ' +
    'hover:bg-light-accent/20 dark:hover:bg-dark-accent/20'

  return (
    <div
      role="group"
      aria-label="Filter posts by tag"
      className="flex flex-wrap gap-2"
    >
      <button
        type="button"
        className={`${pillBase} ${activeTag === undefined ? activePill : inactivePill}`}
        aria-pressed={activeTag === undefined}
        onClick={() => onSelect(undefined)}
      >
        All
      </button>

      {tags.map((tag) => {
        const isActive = tag === activeTag
        return (
          <button
            key={tag}
            type="button"
            className={`${pillBase} ${isActive ? activePill : inactivePill}`}
            aria-pressed={isActive}
            data-active={isActive}
            onClick={() => onSelect(tag)}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
