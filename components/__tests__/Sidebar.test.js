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
  it('renders tooltip span only for the Back to top icon on the home page', () => {
    render(<Sidebar />)

    expect(screen.getAllByText('Back to top').length).toBeGreaterThan(0)
    // toolkit/connect no longer appear on home
    expect(screen.queryByText('Toolkit')).not.toBeInTheDocument()
    expect(screen.queryByText('Connect')).not.toBeInTheDocument()
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

    const tooltip = within(homeWrapper).getByText('Back to top')
    // CSS handles hover state; the element should start hidden
    expect(tooltip).toHaveClass('opacity-0')
  })

  it('includes any extraLinks and renders tooltips for them on non-home/non-about pages', () => {
    const extras = [
      { icon: <span>X</span>, href: '/foo', title: 'Foo' },
    ]
    const { useRouter } = require('next/router')
    useRouter.mockReturnValue({ pathname: '/projects' })
    render(<Sidebar extraLinks={extras} />)
    // extras should render via the "other pages" branch
    expect(screen.getAllByText('Foo').length).toBeGreaterThan(0)
  })
})
