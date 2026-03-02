// lib/posts.js
// Utilities for reading and parsing blog posts from the filesystem.
// Structure: imports → constants → helpers → exported functions

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ─── Constants ────────────────────────────────────────────────────────────────

const POSTS_DIR = path.join(process.cwd(), 'posts')

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Reads all .md and .mdx files from the posts directory.
 * @returns {string[]} Array of filenames (e.g. ['robinhood-gold-card.md'])
 */
function getPostFilenames() {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => /\.(md|mdx)$/.test(file))
}

/**
 * Derives a URL-safe slug from a filename by stripping the extension.
 * @param {string} filename
 * @returns {string}
 */
function slugFromFilename(filename) {
  return filename.replace(/\.(md|mdx)$/, '')
}

/**
 * Parses a single post file and returns its metadata + raw content.
 * Missing required fields are filled with empty-string fallbacks.
 * @param {string} filename
 * @returns {{ slug: string, title: string, date: string, description: string, tags: string[], content: string }}
 */
function parsePost(filename) {
  const slug = slugFromFilename(filename)
  const fullPath = path.join(POSTS_DIR, filename)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    description: data.description ?? '',
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
  }
}

// ─── Exported functions ───────────────────────────────────────────────────────

/**
 * Returns metadata for all posts, sorted by date descending.
 * The `content` body is omitted for performance — use getPostBySlug for full data.
 * @returns {{ slug: string, title: string, date: string, description: string, tags: string[] }[]}
 */
export function getAllPosts() {
  const filenames = getPostFilenames()
  const posts = filenames.map((filename) => {
    const { content: _content, ...meta } = parsePost(filename) // eslint-disable-line no-unused-vars
    return meta
  })
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

/**
 * Returns full post data (metadata + raw content string) for the given slug.
 * Returns null if the slug does not match any file.
 * @param {string} slug
 * @returns {{ slug: string, title: string, date: string, description: string, tags: string[], content: string } | null}
 */
export function getPostBySlug(slug) {
  const filenames = getPostFilenames()
  const match = filenames.find((f) => slugFromFilename(f) === slug)
  if (!match) return null
  return parsePost(match)
}

/**
 * Returns a sorted, deduplicated list of all tags across all posts.
 * Comparison is case-insensitive; output tags are preserved as written in frontmatter.
 * @returns {string[]}
 */
export function getAllTags() {
  const filenames = getPostFilenames()
  const tagMap = new Map() // lower-case key → original-casing value (first seen wins)
  for (const filename of filenames) {
    const { content: _content, tags } = parsePost(filename) // eslint-disable-line no-unused-vars
    for (const tag of tags) {
      const key = tag.toLowerCase()
      if (!tagMap.has(key)) tagMap.set(key, tag)
    }
  }
  return Array.from(tagMap.values()).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  )
}
