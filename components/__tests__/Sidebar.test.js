import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Sidebar from '../Sidebar'

// next/router must be mocked because Sidebar uses useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ pathname: '/' })),
}))

describe('Sidebar – tooltip popups', () => {
  it('renders tooltip spans for every icon on the home page', () => {
    render(<Sidebar />)

    // check that the tooltip text nodes are in the document (allow duplicates)
    expect(screen.getAllByText('Welcome').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Toolkit').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Connect').length).toBeGreaterThan(0)
  })

  it('places the dark-mode toggle near the top edge (mt-1)', () => {
    render(<Sidebar />)
    const toggleWrapper = screen.getByRole('button', {
      name: /switch to (light|dark) mode/i,
    }).closest('div')
    expect(toggleWrapper).toHaveClass('mt-1')
  })

  it('tooltip for the home icon is hidden by default', () => {
    render(<Sidebar />)
    const homeWrapper = screen.getByLabelText('Back to top').closest('div')
    expect(homeWrapper).toBeInTheDocument()

    const tooltip = within(homeWrapper).getByText('Welcome')
    // CSS handles hover state; the element should start hidden
    expect(tooltip).toHaveClass('opacity-0')
  })

  it('includes any extraLinks and renders tooltips for them on non-home pages', () => {
    const extras = [
      { icon: <span>X</span>, href: '/foo', title: 'Foo' },
    ]
    const { useRouter } = require('next/router')
    useRouter.mockReturnValue({ pathname: '/about' })
    render(<Sidebar extraLinks={extras} />)
    // there may be multiple matches (tooltip + sr-only); at least one should exist
    expect(screen.getAllByText('Foo').length).toBeGreaterThan(0)
  })
})
