/**
 * TEST-003 – Unit tests for components/TagFilter.js
 *
 * Tests that the TagFilter component renders an "All" button and one button
 * per tag, handles selection correctly, and highlights the active tag.
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TagFilter from '../TagFilter'

const defaultTags = ['Finance', 'Credit Cards', 'Tech']

describe('TagFilter', () => {
  it('renders an "All" button', () => {
    render(<TagFilter tags={defaultTags} onSelect={jest.fn()} />)
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()
  })

  it('renders one button per tag', () => {
    render(<TagFilter tags={defaultTags} onSelect={jest.fn()} />)
    expect(screen.getByRole('button', { name: 'Finance' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Credit Cards' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Tech' })).toBeInTheDocument()
  })

  it('calls onSelect with the tag name when a tag is clicked', () => {
    const onSelect = jest.fn()
    render(<TagFilter tags={defaultTags} onSelect={onSelect} />)
    fireEvent.click(screen.getByRole('button', { name: 'Finance' }))
    expect(onSelect).toHaveBeenCalledWith('Finance')
  })

  it('calls onSelect with undefined when "All" is clicked', () => {
    const onSelect = jest.fn()
    render(<TagFilter tags={defaultTags} onSelect={onSelect} />)
    fireEvent.click(screen.getByRole('button', { name: /all/i }))
    expect(onSelect).toHaveBeenCalledWith(undefined)
  })

  it('marks the active tag button as aria-pressed or data-active', () => {
    render(
      <TagFilter tags={defaultTags} activeTag="Finance" onSelect={jest.fn()} />
    )
    const btn = screen.getByRole('button', { name: 'Finance' })
    // Either aria-pressed="true" or data-active="true" is acceptable
    const isActive =
      btn.getAttribute('aria-pressed') === 'true' ||
      btn.getAttribute('data-active') === 'true'
    expect(isActive).toBe(true)
  })

  it('does not mark a non-active tag as active', () => {
    render(
      <TagFilter tags={defaultTags} activeTag="Finance" onSelect={jest.fn()} />
    )
    const btn = screen.getByRole('button', { name: 'Tech' })
    const isActive =
      btn.getAttribute('aria-pressed') === 'true' ||
      btn.getAttribute('data-active') === 'true'
    expect(isActive).toBe(false)
  })

  it('renders without crashing when tags is an empty array', () => {
    render(<TagFilter tags={[]} onSelect={jest.fn()} />)
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()
  })
})
