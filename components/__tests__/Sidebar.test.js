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

    // check that the tooltip text nodes are in the document
    expect(screen.getByText('Welcome')).toBeInTheDocument()
    expect(screen.getByText('Toolkit')).toBeInTheDocument()
    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  it('shows the tooltip when the icon is hovered', async () => {
    render(<Sidebar />)
    // locate the wrapper div for the home button (group)
    const homeWrapper = screen.getByLabelText('Back to top').closest('div')
    expect(homeWrapper).toBeInTheDocument()

    const tooltip = within(homeWrapper).getByText('Welcome')
    // initially hidden via opacity class
    expect(tooltip).toHaveClass('opacity-0')
    // spacing should include larger offset class applied earlier
    expect(tooltip).toHaveClass('translate-x-4')

    await userEvent.hover(homeWrapper)
    expect(tooltip).toHaveClass('opacity-100')
  })

  it('includes any extraLinks and renders tooltips for them', () => {
    const extras = [
      { icon: <span>X</span>, href: '/foo', title: 'Foo' },
    ]
    render(<Sidebar extraLinks={extras} />)
    expect(screen.getByText('Foo')).toBeInTheDocument()
  })
})
