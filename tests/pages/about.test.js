/**
 * T014 – About page heading test
 *
 * Verifies that the /about page renders a level-1 heading containing "About".
 * This test WILL FAIL until pages/about.js is created (TDD red phase).
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AboutPage from '../../pages/about'
import HomePage from '../../components/Home'

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

  it('contains toolkit and connect sections with appropriate headings', () => {
    render(<AboutPage />)
    const toolkitSection = screen.getByRole('heading', { name: /toolkit/i })
    expect(toolkitSection).toBeInTheDocument()
    const connectSection = screen.getByRole('heading', { name: /connect/i })
    expect(connectSection).toBeInTheDocument()
    // sections should have ids for anchors
    expect(document.getElementById('toolkit')).toBeInTheDocument()
    expect(document.getElementById('connect')).toBeInTheDocument()

    // the toolkit icon list should allow expansion on large screens
    const toolkitList = screen.getByRole('list', { hidden: true })
    expect(toolkitList).toHaveClass('max-w-3xl')
    expect(toolkitList).toHaveClass('lg:max-w-none')
  })

  it('renders the contact form', () => {
    render(<AboutPage />)
    // form element may not be picked up by role queries; check via label proximity
    const nameInput = screen.getByLabelText(/name/i)
    expect(nameInput).toBeInTheDocument()
    const form = nameInput.closest('form')
    expect(form).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// verify homepage no longer shows the moved pieces

describe('Home page after restructuring', () => {
  it('does not render the contact form', () => {
    render(<HomePage />)
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })
  it('does not include toolkit or connect sections', () => {
    render(<HomePage />)
    expect(screen.queryByText(/toolkit/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/connect/i)).not.toBeInTheDocument()
  })
})
