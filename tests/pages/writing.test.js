/**
 * TEST-004 / T014 – Writing page integration tests
 *
 * Tests the /writing page grid, year grouping, tag filtering, and empty states.
 * WritingPage receives posts and tags as props (from getStaticProps).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import WritingPage from '../../pages/writing'

// Mock Next.js Link to a simple anchor
jest.mock('next/link', () => {
  const MockLink = ({ href, children, className }) => (
    <a href={href} className={className}>{children}</a>
  )
  MockLink.displayName = 'MockLink'
  return MockLink
})

const mockPosts2026 = [
  {
    slug: 'robinhood-gold-card',
    title: 'Robinhood Gold Card Review',
    date: '2026-03-02',
    description: 'Thoughts on the Robinhood Gold credit card.',
    tags: ['Finance', 'Credit Cards'],
  },
]

const mockPosts2025 = [
  {
    slug: 'old-post',
    title: 'An Old Post',
    date: '2025-06-15',
    description: 'A post from last year.',
    tags: ['Tech'],
  },
]

const mockPosts = [...mockPosts2026, ...mockPosts2025]
const mockTags = ['Credit Cards', 'Finance', 'Tech']

describe('Writing page', () => {
  it('renders an <h1> element containing "Writing" inside a constrained left-aligned container', () => {
    const { container } = render(<WritingPage posts={mockPosts} tags={mockTags} />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/writing/i)
    // ensure the heading lives inside an element that constrains width and left-aligns text
    const wrapper = heading.closest('div')
    expect(wrapper).toHaveClass('max-w-3xl')
    expect(wrapper).toHaveClass('text-left')
  })

  it('renders year-group headings for each distinct year', () => {
    render(<WritingPage posts={mockPosts} tags={mockTags} />)
    expect(screen.getByText('2026')).toBeInTheDocument()
    expect(screen.getByText('2025')).toBeInTheDocument()
  })

  it('renders a PostCard for each post', () => {
    render(<WritingPage posts={mockPosts} tags={mockTags} />)
    expect(screen.getByText('Robinhood Gold Card Review')).toBeInTheDocument()
    expect(screen.getByText('An Old Post')).toBeInTheDocument()
  })

  it('constrains the grid within a centered container to avoid edge overflow on mobile', () => {
    const { container } = render(<WritingPage posts={mockPosts} tags={mockTags} />)
    // the wrapper div added for max-width should exist
    const constrained = container.querySelector('.max-w-3xl')
    expect(constrained).toBeInTheDocument()
    // it should also have horizontal margin auto
    expect(constrained).toHaveClass('mx-auto')
  })

  it('renders the TagFilter with available tags', () => {
    render(<WritingPage posts={mockPosts} tags={mockTags} />)
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Finance' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Tech' })).toBeInTheDocument()
  })

  it('filters posts to only Finance-tagged when Finance is clicked', () => {
    render(<WritingPage posts={mockPosts} tags={mockTags} />)
    fireEvent.click(screen.getByRole('button', { name: 'Finance' }))
    expect(screen.getByText('Robinhood Gold Card Review')).toBeInTheDocument()
    expect(screen.queryByText('An Old Post')).not.toBeInTheDocument()
  })

  it('restores all posts when All is clicked after filtering', () => {
    render(<WritingPage posts={mockPosts} tags={mockTags} />)
    fireEvent.click(screen.getByRole('button', { name: 'Finance' }))
    fireEvent.click(screen.getByRole('button', { name: /all/i }))
    expect(screen.getByText('Robinhood Gold Card Review')).toBeInTheDocument()
    expect(screen.getByText('An Old Post')).toBeInTheDocument()
  })

  it('shows a "No posts found" message when filter yields 0 results', () => {
    // Pass a tag that no post has
    render(<WritingPage posts={mockPosts} tags={['Science']} />)
    fireEvent.click(screen.getByRole('button', { name: 'Science' }))
    expect(screen.getByText(/no posts found/i)).toBeInTheDocument()
  })

  it('renders an empty state gracefully when no posts at all', () => {
    render(<WritingPage posts={[]} tags={[]} />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})
