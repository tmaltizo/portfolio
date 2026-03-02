/**
 * T018 – NavBar data-driven extensibility test
 *
 * Verifies that NavBar renders one link per entry in the navLinks module and
 * that modifying the exported array (simulated here by mocking the module)
 * automatically changes what is rendered — confirming data-driven design.
 *
 * These tests WILL FAIL until components/NavBar.js and components/navLinks.js
 * are created (TDD red phase).
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock the navLinks data with a custom set so we control exactly how many
// links there are and can verify the component iterates over the array.
jest.mock('../navLinks', () => [
  { label: 'Home', href: '/' },
  { label: 'TestSection', href: '/test' },
  { label: 'AnotherSection', href: '/another' },
])

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ pathname: '/' })),
}))

// Dynamic require so the mock above is applied before the module loads.
const NavBar = require('../NavBar').default

describe('NavBar – data-driven extensibility', () => {
  it('renders exactly as many links as there are entries in navLinks', () => {
    render(<NavBar />)
    const links = screen.getAllByRole('link')
    // Our mock provides exactly 3 entries
    expect(links).toHaveLength(3)
  })

  it('renders a link for the mocked label "TestSection"', () => {
    render(<NavBar />)
    expect(screen.getByRole('link', { name: /testsection/i })).toBeInTheDocument()
  })

  it('renders a link for the mocked label "AnotherSection"', () => {
    render(<NavBar />)
    expect(screen.getByRole('link', { name: /anothersection/i })).toBeInTheDocument()
  })

  it('renders links with correct href values from mock data', () => {
    render(<NavBar />)
    expect(screen.getByRole('link', { name: /testsection/i })).toHaveAttribute(
      'href',
      '/test'
    )
  })
})
