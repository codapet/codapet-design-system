import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { DateInput } from './date-input'
import { vi } from 'vitest'

describe('DateInput', () => {
  it('renders correctly', () => {
    const setDate = vi.fn()
    render(<DateInput date={null} setDate={setDate} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('updates input value when typing a valid date', () => {
    const setDate = vi.fn()
    render(<DateInput date={null} setDate={setDate} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '01/01/2023' } })
    expect(input).toHaveValue('01/01/2023')
    
    // Expect local date for 2023-01-01
    const expectedDate = new Date('01/01/2023')
    expectedDate.setHours(0, 0, 0, 0)
    expect(setDate).toHaveBeenCalledWith(expectedDate)
  })

  it('does not update date state when typing an invalid date', () => {
    const setDate = vi.fn()
    render(<DateInput date={null} setDate={setDate} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'invalid-date' } })
    expect(input).toHaveValue('invalid-date')
    expect(setDate).not.toHaveBeenCalled()
  })

  it('resets to previous valid date on blur if invalid', () => {
    // Use local date
    const initialDate = new Date('01/01/2023')
    initialDate.setHours(0, 0, 0, 0)
    
    const setDate = vi.fn()
    render(<DateInput date={initialDate} setDate={setDate} />)
    const input = screen.getByRole('textbox')
    
    // Initial value should be formatted
    expect(input).toHaveValue('01/01/2023')

    fireEvent.change(input, { target: { value: 'invalid-date' } })
    fireEvent.blur(input)
    
    expect(input).toHaveValue('01/01/2023')
  })

  it('respects minDate', () => {
    const minDate = new Date('01/01/2023')
    minDate.setHours(0, 0, 0, 0)
    
    const setDate = vi.fn()
    render(<DateInput date={null} setDate={setDate} minDate={minDate} />)
    const input = screen.getByRole('textbox')

    // Try setting a date before minDate (Dec 31, 2022)
    fireEvent.change(input, { target: { value: '12/31/2022' } })
    expect(setDate).not.toHaveBeenCalled()

    // Try setting a date equal to minDate
    fireEvent.change(input, { target: { value: '01/01/2023' } })
    expect(setDate).toHaveBeenCalledWith(minDate)
  })

  it('respects maxDate', () => {
    const maxDate = new Date('01/01/2023')
    maxDate.setHours(0, 0, 0, 0)
    
    const setDate = vi.fn()
    // disableFuture=false to allow testing maxDate specifically without interference
    render(<DateInput date={null} setDate={setDate} maxDate={maxDate} disableFuture={false} />)
    const input = screen.getByRole('textbox')

    // Try setting a date after maxDate (Jan 2, 2023)
    fireEvent.change(input, { target: { value: '01/02/2023' } })
    expect(setDate).not.toHaveBeenCalled()

    // Try setting a date equal to maxDate
    fireEvent.change(input, { target: { value: '01/01/2023' } })
    expect(setDate).toHaveBeenCalledWith(maxDate)
  })
})
