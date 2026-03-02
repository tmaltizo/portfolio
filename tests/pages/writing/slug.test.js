/**
 * TEST-005 – Tests for pages/writing/[slug].js (individual post page)
 *
 * Tests that the page renders the post title, date, description from props
 * and that the body content renders. Uses mocked MDXRemote.
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PostPage from '../../../pages/writing/[slug]'

// next-mdx-remote renders asynchronously in real use; we mock it for tests
jest.mock('next-mdx-remote', () => ({
  MDXRemote: ({ compiledSource }) => (
    <div data-testid="mdx-content">{compiledSource}</div>
  ),
}))

// serialize is a server-side function not exercised in component tests
jest.mock('next-mdx-remote/serialize', () => ({
  serialize: jest.fn().mockResolvedValue({ compiledSource: '' }),
}))


// Mock Next.js Link
jest.mock('next/link', () => {
  const MockLink = ({ href, children }) => <a href={href}>{children}</a>
  MockLink.displayName = 'MockLink'
  return MockLink
})

const fakeSource = {
  compiledSource:
    'Hello, this is the post body. <img src="/images/robinhood-gold-card.png" alt="Robinhood Gold Card" />',
}

const baseProps = {
  post: {
    title: 'Robinhood Gold Card Review',
    date: '2026-03-02',
    description: 'Thoughts on the Robinhood Gold credit card.',
    tags: ['Finance', 'Credit Cards'],
    slug: 'robinhood-gold-card',
  },
  mdxSource: fakeSource,
}

describe('PostPage', () => {
  it('renders the post title', () => {
    render(<PostPage {...baseProps} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Robinhood Gold Card Review'
    )
  })

  it('renders the formatted date', () => {
    render(<PostPage {...baseProps} />)
    // The page formats the date; we just check something date-like is present
    expect(screen.getByText(/2026/)).toBeInTheDocument()
  })

  it('renders the post description', () => {
    render(<PostPage {...baseProps} />)
    expect(
      screen.getByText('Thoughts on the Robinhood Gold credit card.')
    ).toBeInTheDocument()
  })

  it('renders the MDX content area', () => {
    render(<PostPage {...baseProps} />)
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
  })

  it('passes through images from the MDX source', () => {
    render(<PostPage {...baseProps} />)
    // our mock just prints the compiledSource as text, so look for the tag string
    expect(screen.getByTestId('mdx-content').textContent).toContain(
      '<img src="/images/robinhood-gold-card.png" alt="Robinhood Gold Card" />'
    )
  })

  it('renders tag pills for each tag', () => {
    render(<PostPage {...baseProps} />)
    expect(screen.getByText('Finance')).toBeInTheDocument()
    expect(screen.getByText('Credit Cards')).toBeInTheDocument()
  })

  it('includes a back link to the writing page', () => {
    render(<PostPage {...baseProps} />)
    const backLink = screen.getByRole('link', { name: /writing|back/i })
    expect(backLink).toHaveAttribute('href', '/writing')
  })

  it('renders social share links with expected prefixes', () => {
    render(<PostPage {...baseProps} />)
    expect(screen.getByRole('link', { name: /Share on X/i })).toHaveAttribute(
      'href',
      expect.stringContaining('twitter.com/intent/tweet')
    )
    expect(screen.getByRole('link', { name: /Share on LinkedIn/i })).toHaveAttribute(
      'href',
      expect.stringContaining('linkedin.com/sharing/share-offsite')
    )
    expect(screen.getByRole('link', { name: /Email this brief/i })).toHaveAttribute(
      'href',
      expect.stringContaining('mail.google.com')
    )
  })
})
