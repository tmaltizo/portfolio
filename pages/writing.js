// pages/writing.js
// Writing page — accessible at /writing.
// Renders all blog posts in a year-grouped responsive grid with tag filtering.
// Structure: imports → helpers → component → export → getStaticProps

import { useState } from 'react'
import PostCard from '../components/PostCard'
import TagFilter from '../components/TagFilter'
import { getAllPosts, getAllTags } from '../lib/posts'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Groups an array of posts by the four-digit year from their date field.
 * Returns an array of { year, posts } objects sorted newest year first.
 * @param {{ date: string }[]} posts
 * @returns {{ year: number, posts: object[] }[]}
 */
function groupByYear(posts) {
  const map = new Map()
  for (const post of posts) {
    const year = new Date(post.date).getUTCFullYear()
    if (!map.has(year)) map.set(year, [])
    map.get(year).push(post)
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, yearPosts]) => ({ year, posts: yearPosts }))
}

/**
 * Formats an ISO date string to a human-readable date (e.g. "March 2, 2026").
 * @param {string} isoDate
 * @returns {string}
 */
function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * WritingPage — displays all blog posts in a year-grouped grid with tag filtering.
 *
 * @param {{ posts: object[], tags: string[] }} props  Provided by getStaticProps.
 * @returns {JSX.Element}
 */
export default function WritingPage({ posts = [], tags = [] }) {
  const [activeTag, setActiveTag] = useState(undefined)

  const filteredPosts =
    activeTag === undefined
      ? posts
      : posts.filter((p) =>
          p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
        )

  const yearGroups = groupByYear(filteredPosts)

  return (
    <main className="bg-light-bg dark:bg-dark-bg min-h-screen px-6 pr-14 sm:pr-20 md:px-10 md:pr-20 py-12 text-light-text dark:text-dark-text">
      <div className="mx-auto max-w-3xl text-left">
        <h1 className="text-3xl md:text-4xl font-medium text-light-text-dark dark:text-dark-text mb-2">
          <span className="text-light-accent dark:text-dark-accent">Writing</span>
        </h1>

        <p className="text-sm md:text-base text-light-text dark:text-dark-text mb-8 max-w-lg">
          Blog posts, articles, and anything else I want to share.
        </p>

        {tags.length > 0 && (
          <div className="mb-10">
            <TagFilter tags={tags} activeTag={activeTag} onSelect={setActiveTag} />
          </div>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-light-text dark:text-dark-text mt-12 text-center">
          No posts found for this tag.
        </p>
      ) : (
        // constrain the grid to prevent cards spilling to the viewport edge on small screens
        <div className="space-y-14 max-w-3xl mx-auto">
          {yearGroups.map(({ year, posts: yearPosts }) => (
            <section key={year} aria-label={`Posts from ${year}`}>
              <h2 className="text-xl font-semibold text-light-text-dark dark:text-dark-text mb-5 border-b border-light-border dark:border-dark-border pb-2">
                {year}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {yearPosts.map((post) => (
                  <PostCard
                    key={post.slug}
                    title={post.title}
                    date={formatDate(post.date)}
                    description={post.description}
                    tags={post.tags}
                    href={`/writing/${post.slug}`}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  )
}

// ─── Data fetching ────────────────────────────────────────────────────────────

export async function getStaticProps() {
  const posts = getAllPosts()
  const tags = getAllTags()
  return { props: { posts, tags } }
}

