/**
 * TEST-001 – Unit tests for lib/posts.js
 *
 * Tests the three exported utilities: getAllPosts, getPostBySlug, getAllTags.
 * Uses the real posts/ directory with the robinhood-gold-card.md fixture post.
 */
import { getAllPosts, getPostBySlug, getAllTags } from '../../lib/posts'

describe('getAllPosts', () => {
  it('returns an array of posts', () => {
    const posts = getAllPosts()
    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeGreaterThanOrEqual(1)
  })

  it('each post has required metadata fields', () => {
    const posts = getAllPosts()
    for (const post of posts) {
      expect(post).toHaveProperty('slug')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('date')
      expect(post).toHaveProperty('description')
      expect(post).toHaveProperty('tags')
      expect(Array.isArray(post.tags)).toBe(true)
    }
  })

  it('does not include the raw content body', () => {
    const posts = getAllPosts()
    for (const post of posts) {
      expect(post).not.toHaveProperty('content')
    }
  })

  it('includes the robinhood-gold-card fixture post', () => {
    const posts = getAllPosts()
    const found = posts.find((p) => p.slug === 'robinhood-gold-card')
    expect(found).toBeDefined()
    expect(found.title).toBe("Deleting the $50 Fee - An Industry Insider's Take On Robinhood’s 3% Loss-Leader")
    expect(found.tags).toContain('Finance')
  })

  it('sorts posts by date descending', () => {
    const posts = getAllPosts()
    for (let i = 0; i < posts.length - 1; i++) {
      expect(posts[i].date >= posts[i + 1].date).toBe(true)
    }
  })
})

describe('getPostBySlug', () => {
  it('returns full post data for a valid slug', () => {
    const post = getPostBySlug('robinhood-gold-card')
    expect(post).not.toBeNull()
    expect(post.slug).toBe('robinhood-gold-card')
    expect(post.title).toBe("Deleting the $50 Fee - An Industry Insider's Take On Robinhood’s 3% Loss-Leader")
    expect(post.content).toBeTruthy()
  })

  it('returns null for an unknown slug', () => {
    const post = getPostBySlug('this-post-does-not-exist')
    expect(post).toBeNull()
  })

  it('includes content body in returned data', () => {
    const post = getPostBySlug('robinhood-gold-card')
    expect(typeof post.content).toBe('string')
    expect(post.content.length).toBeGreaterThan(0)
  })
})

describe('getAllTags', () => {
  it('returns an array of strings', () => {
    const tags = getAllTags()
    expect(Array.isArray(tags)).toBe(true)
    tags.forEach((t) => expect(typeof t).toBe('string'))
  })

  it('includes tags from the fixture post', () => {
    const tags = getAllTags()
    const lowerTags = tags.map((t) => t.toLowerCase())
    expect(lowerTags).toContain('finance')
  })

  it('returns deduplicated tags', () => {
    const tags = getAllTags()
    const lowerTags = tags.map((t) => t.toLowerCase())
    const unique = [...new Set(lowerTags)]
    expect(unique.length).toBe(lowerTags.length)
  })

  it('returns tags sorted alphabetically (case-insensitive)', () => {
    const tags = getAllTags()
    const sorted = [...tags].sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    )
    expect(tags).toEqual(sorted)
  })
})
