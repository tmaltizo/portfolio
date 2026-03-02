/**
 * T014 – About page heading test
 *
 * Verifies that the /about page renders a level-1 heading containing "About".
 * This test WILL FAIL until pages/about.js is created (TDD red phase).
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AboutPage from '../about'

describe('About page', () => {
  it('renders an <h1> element', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('h1 contains the text "About"', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/about/i)
  })

  it('renders some descriptive body text below the heading', () => {
    render(<AboutPage />)
    // The page should contain at least one paragraph of descriptive content
    const paragraphs = screen.getAllByRole('paragraph')
    expect(paragraphs.length).toBeGreaterThanOrEqual(1)
  })
})
