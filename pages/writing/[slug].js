// pages/writing/[slug].js
// Individual blog post page — accessible at /writing/[slug].
// Structure: imports → helpers → component → export → getStaticPaths → getStaticProps

import Head from 'next/head'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { getAllPosts, getPostBySlug } from '../../lib/posts'
import SpendCalculator from '../../components/SpendCalculator'

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
 * PostPage — renders a single blog post with its full body content.
 *
 * @param {{ post: object, mdxSource: object }} props  Provided by getStaticProps.
 * @returns {JSX.Element}
 */
export default function PostPage({ post, mdxSource }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tmaltizo.github.io/portfolio'
  const cleanSiteUrl = siteUrl.replace(/\/$/, '')
  const pageUrl = `${cleanSiteUrl}/writing/${post.slug}`
  const ogImage = `${cleanSiteUrl}/images/robinhood-gold-card.png`
  const keywords = [
    ...post.tags,
    'Robinhood Gold review',
    'best credit card 2026',
    'flat rate cashback card',
  ]
    .filter(Boolean)
    .join(', ')
  const shareText = encodeURIComponent(`${post.title} — ${post.description}`)
  const encodedPageUrl = encodeURIComponent(pageUrl)
  const twitterHref = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedPageUrl}&via=tmaltizo`
  // linkedin-sharing.com is often more reliable for modern LinkedIn redirects
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedPageUrl}`
  // Gmail Desktop override if default mailto fails (common in Windows/Chrome without protocol handler)
  const mailtoHref = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.description + "\n\n" + pageUrl)}`

  return (
    <>
      <Head>
        <title>{`${post.title} | Writing`}</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <main className="bg-light-bg dark:bg-dark-bg min-h-screen py-12">
        <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/writing"
          className="inline-flex items-center gap-1 text-sm text-light-accent dark:text-dark-accent
            hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-accent
            dark:focus-visible:ring-dark-accent mb-8"
        >
          ← Back to Writing
        </Link>

        {/* Header */}
        <header className="mb-8">
          <p className="text-xs text-light-text dark:text-dark-text mb-2">
            {formatDate(post.date)}
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-light-text-dark dark:text-dark-text leading-snug mb-3">
            {post.title}
          </h1>
          <p className="text-base text-light-text dark:text-dark-text leading-relaxed mb-4">
            {post.description}
          </p>
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Post tags">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/writing?tag=${encodeURIComponent(tag)}`}
                    className="inline-block rounded-full px-3 py-0.5 text-xs font-medium
                      bg-light-accent/20 text-light-accent-hover
                      dark:bg-dark-accent/20 dark:text-dark-accent
                      hover:bg-light-accent/30 dark:hover:bg-dark-accent/30
                      focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light-accent"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </header>

          <div className="flex flex-wrap gap-3 mb-6 text-sm">
            <a
              href={twitterHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-light-border dark:border-dark-border px-4 py-2 text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg transition-colors hover:border-light-accent dark:hover:border-dark-accent"
            >
              Share on X
            </a>
            <a
              href={linkedInHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-light-border dark:border-dark-border px-4 py-2 text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg transition-colors hover:border-light-accent dark:hover:border-dark-accent"
            >
              Share on LinkedIn
            </a>
            <a
              href={mailtoHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-light-border dark:border-dark-border px-4 py-2 text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg transition-colors hover:border-light-accent dark:hover:border-dark-accent"
            >
              Email this brief
            </a>
          </div>

        {/* Post body */}
        <article className="prose dark:prose-invert max-w-none">
          <MDXRemote {...mdxSource} components={{ SpendCalculator }} />
        </article>
        </div>
      </main>
    </>
  )
}

// ─── Static paths ─────────────────────────────────────────────────────────────

export async function getStaticPaths() {
  const posts = getAllPosts()
  const paths = posts.map((post) => ({ params: { slug: post.slug } }))
  return { paths, fallback: false }
}

// ─── Data fetching ────────────────────────────────────────────────────────────

export async function getStaticProps({ params }) {
  const { slug } = params
  const full = getPostBySlug(slug)
  if (!full) return { notFound: true }

  const { content, ...post } = full
  const { default: remarkGfm } = await import('remark-gfm')
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  })

  return { props: { post, mdxSource } }
}
