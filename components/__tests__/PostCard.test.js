/**
 * TEST-002 – Unit tests for components/PostCard.js
 *
 * Tests that the PostCard component renders title, date, description,
 * tag pills, and a correct link — as defined in contracts/ui-components.md.
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PostCard from '../PostCard'

// Mock Next.js Link to render a simple anchor in tests
jest.mock('next/link', () => {
  const MockLink = ({ href, children }) => <a href={href}>{children}</a>
  MockLink.displayName = 'MockLink'
  return MockLink
})

const baseProps = {
  title: 'Robinhood Gold Card Review',
  date: 'March 2, 2026',
  description: 'My thoughts on the Robinhood Gold credit card.',
  tags: ['Finance', 'Credit Cards'],
  href: '/writing/robinhood-gold-card',
}

describe('PostCard', () => {
  it('renders the post title', () => {
    render(<PostCard {...baseProps} />)
    expect(screen.getByText('Robinhood Gold Card Review')).toBeInTheDocument()
  })

  it('renders the post date', () => {
    render(<PostCard {...baseProps} />)
    expect(screen.getByText('March 2, 2026')).toBeInTheDocument()
  })

  it('renders the post description', () => {
    render(<PostCard {...baseProps} />)
    expect(
      screen.getByText('My thoughts on the Robinhood Gold credit card.')
    ).toBeInTheDocument()
  })

  it('renders each tag as a visible element', () => {
    render(<PostCard {...baseProps} />)
    expect(screen.getByText('Finance')).toBeInTheDocument()
    expect(screen.getByText('Credit Cards')).toBeInTheDocument()
  })

  it('wraps the card in a link to the correct href', () => {
    render(<PostCard {...baseProps} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/writing/robinhood-gold-card')
  })

  it('renders without crashing when tags is an empty array', () => {
    render(<PostCard {...baseProps} tags={[]} />)
    expect(screen.getByText('Robinhood Gold Card Review')).toBeInTheDocument()
  })
})
