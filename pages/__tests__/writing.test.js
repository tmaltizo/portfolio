/**
 * T014 – Writing page heading test
 *
 * Verifies that the /writing page renders a level-1 heading containing
 * "Writing".
 * This test WILL FAIL until pages/writing.js is created (TDD red phase).
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import WritingPage from '../writing'

describe('Writing page', () => {
  it('renders an <h1> element', () => {
    render(<WritingPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('h1 contains the text "Writing"', () => {
    render(<WritingPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/writing/i)
  })

  it('renders some explanatory text describing the blog section', () => {
    render(<WritingPage />)
    const paragraphs = screen.getAllByRole('paragraph')
    expect(paragraphs.length).toBeGreaterThanOrEqual(1)
  })
})
