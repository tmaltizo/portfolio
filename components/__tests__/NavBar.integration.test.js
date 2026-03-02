/**
 * T010 – NavBar integration tests
 *
 * Verify that:
 * 1. All four expected navigation links are rendered (Home, About, Writing,
 *    Projects).
 * 2. The link whose href matches the current route receives aria-current="page".
 * 3. Non-active links do NOT receive aria-current="page".
 *
 * These tests WILL FAIL until components/NavBar.js is created (TDD red phase).
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavBar from '../NavBar'

const mockUseRouter = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => mockUseRouter(),
}))

describe('NavBar – link rendering', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({ pathname: '/' })
  })

  it('renders a "Home" link pointing to /', () => {
    render(<NavBar />)
    const link = screen.getByRole('link', { name: /home/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders an "About" link pointing to /about', () => {
    render(<NavBar />)
    const link = screen.getByRole('link', { name: /about/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/about')
  })

  it('renders a "Writing" link pointing to /writing', () => {
    render(<NavBar />)
    const link = screen.getByRole('link', { name: /writing/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/writing')
  })

  it('renders a "Projects" link pointing to /projects', () => {
    render(<NavBar />)
    const link = screen.getByRole('link', { name: /projects/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/projects')
  })
})

describe('NavBar – active state', () => {
  it('gives aria-current="page" to the link matching the current pathname', () => {
    mockUseRouter.mockReturnValue({ pathname: '/about' })
    render(<NavBar />)
    const active = screen.getByRole('link', { name: /about/i })
    expect(active).toHaveAttribute('aria-current', 'page')
  })

  it('does NOT give aria-current to links that do not match the pathname', () => {
    mockUseRouter.mockReturnValue({ pathname: '/about' })
    render(<NavBar />)
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).not.toHaveAttribute('aria-current', 'page')
  })

  it('marks the home link active when pathname is "/"', () => {
    mockUseRouter.mockReturnValue({ pathname: '/' })
    render(<NavBar />)
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })
})
