import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Resources from '../pages/Resources'

// Mock the API service
vi.mock('../service', () => ({
  fetchResources: vi.fn(),
  fetchFilterOptions: vi.fn()
}))

import { fetchResources, fetchFilterOptions } from '../service'

describe('Resources Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the main title and subtitle', async () => {
    // Mock successful API responses
    fetchResources.mockResolvedValueOnce([])
    fetchFilterOptions.mockResolvedValueOnce({ categories: [], locations: [] })

    render(<Resources />)

    expect(screen.getByText('Crisis Resource Locator')).toBeInTheDocument()
    expect(screen.getByText('Community Resources')).toBeInTheDocument()
  })

  it('should display resources when API returns data', async () => {
    const mockResources = [
      {
        id: 1,
        name: 'Test Resource',
        category: 'mental-health',
        location: 'National',
        phone: '123-456-7890',
        website: 'https://test.com',
        available24h: true,
        description: 'Test description'
      }
    ]

    fetchResources.mockResolvedValueOnce(mockResources)
    fetchFilterOptions.mockResolvedValueOnce({ categories: [], locations: [] })

    render(<Resources />)

    await waitFor(() => {
      expect(screen.getByText('Test Resource')).toBeInTheDocument()
      expect(screen.getByText('Test description')).toBeInTheDocument()
      expect(screen.getByText('123-456-7890')).toBeInTheDocument()
    })
  })

  it('should show loading state initially', () => {
    fetchResources.mockImplementation(() => new Promise(() => {})) // Never resolves
    fetchFilterOptions.mockResolvedValueOnce({ categories: [], locations: [] })

    render(<Resources />)

    expect(screen.getByText('Loading resources...')).toBeInTheDocument()
  })

  it('should display no resources message when API returns empty array', async () => {
    fetchResources.mockResolvedValueOnce([])
    fetchFilterOptions.mockResolvedValueOnce({ categories: [], locations: [] })

    render(<Resources />)

    await waitFor(() => {
      expect(screen.getByText('Currently there are no resources')).toBeInTheDocument()
    })
  })

  it('should filter resources by search term', async () => {
    const mockResources = [
      {
        id: 1,
        name: 'Mental Health Resource',
        category: 'mental-health',
        location: 'National',
        phone: '123-456-7890',
        website: 'https://test.com',
        available24h: true,
        description: 'Mental health support'
      },
      {
        id: 2,
        name: 'Housing Resource',
        category: 'housing',
        location: 'New York',
        phone: '987-654-3210',
        website: 'https://housing.com',
        available24h: false,
        description: 'Housing assistance'
      }
    ]

    fetchResources.mockResolvedValueOnce(mockResources)
    fetchFilterOptions.mockResolvedValueOnce({ categories: [], locations: [] })

    render(<Resources />)

    await waitFor(() => {
      expect(screen.getByText('Mental Health Resource')).toBeInTheDocument()
      expect(screen.getByText('Housing Resource')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search by name or description...')
    await userEvent.type(searchInput, 'Mental')

    await waitFor(() => {
      expect(screen.getByText('Mental Health Resource')).toBeInTheDocument()
      expect(screen.queryByText('Housing Resource')).not.toBeInTheDocument()
    })
  })

  it('should display category filter options', async () => {
    fetchResources.mockResolvedValueOnce([])
    fetchFilterOptions.mockResolvedValueOnce({ categories: [], locations: [] })

    render(<Resources />)

    await waitFor(() => {
      const categorySelect = screen.getByLabelText('Category')
      expect(categorySelect).toBeInTheDocument()
      
      // Check that predefined categories are available
      expect(screen.getByText('domestic-violence')).toBeInTheDocument()
      expect(screen.getByText('mental-health')).toBeInTheDocument()
      expect(screen.getByText('legal-aid')).toBeInTheDocument()
      expect(screen.getByText('housing')).toBeInTheDocument()
    })
  })
})
