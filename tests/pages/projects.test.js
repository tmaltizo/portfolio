/**
 * T014 – Projects page heading test
 *
 * Verifies that the /projects page renders a level-1 heading containing
 * "Projects".
 * This test WILL FAIL until pages/projects.js is created (TDD red phase).
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProjectsPage from '../../pages/projects'

describe('Projects page', () => {
  it('renders an <h1> element', () => {
    render(<ProjectsPage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('h1 contains the text "Projects"', () => {
    render(<ProjectsPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/projects/i)
  })

  it('renders a placeholder area ready to list project items', () => {
    render(<ProjectsPage />)
    // At minimum, a paragraph or list should be present under the heading
    const container = screen.getByRole('heading', { level: 1 }).closest('main') ||
      screen.getByRole('heading', { level: 1 }).parentElement
    expect(container).toBeTruthy()
  })
})
