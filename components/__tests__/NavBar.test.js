/**
 * T007 – NavBar placeholder render tests
 *
 * These tests verify the most basic structural requirements of the NavBar
 * component: that it can be rendered without crashing and that it produces a
 * proper <nav> landmark element accessible by role.
 *
 * These tests WILL FAIL until components/NavBar.js is created (TDD red phase).
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavBar from '../NavBar'

// next/router must be mocked in every test that renders NavBar because the
// component calls useRouter() to compute the active link.
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ pathname: '/' })),
}))

describe('NavBar – basic render', () => {
  it('renders without crashing', () => {
    render(<NavBar />)
  })

  it('renders a <nav> landmark element', () => {
    render(<NavBar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders at least one link', () => {
    render(<NavBar />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(1)
  })
})
