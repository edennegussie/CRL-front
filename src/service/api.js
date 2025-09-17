// API utility functions for connecting to the backend

// Get API base URL from environment variables, fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Generic API request function
 * @param {string} endpoint - API endpoint (e.g., '/resources')
 * @param {Object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<Object>} API response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Fetch resources from the API with optional filters
 * @param {Object} filters - Optional filters object
 * @param {string} filters.location - Filter by location (e.g., "New York", "National")
 * @param {string} filters.category - Filter by category (e.g., "domestic-violence", "mental-health")
 * @returns {Promise<Array>} Array of resource objects
 * 
 * Example usage:
 * - fetchResources() - Get all resources
 * - fetchResources({ location: "New York" }) - Get resources in New York
 * - fetchResources({ category: "domestic-violence" }) - Get domestic violence resources
 * - fetchResources({ location: "National", category: "mental-health" }) - Get national mental health resources
 */
export const fetchResources = async (filters = {}) => {
  // Build query string from filters
  const queryParams = new URLSearchParams();
  
  if (filters.location && filters.location !== 'All') {
    queryParams.append('location', filters.location);
  }
  
  if (filters.category && filters.category !== 'All') {
    queryParams.append('category', filters.category);
  }
  
  // Construct the endpoint with query parameters
  const endpoint = queryParams.toString() 
    ? `resources?${queryParams.toString()}`
    : 'resources';
  
  const response = await apiRequest(endpoint);
  
  // Handle the API response format with success/data wrapper
  if (response.success && response.data) {
    return response.data;
  }
  
  // Fallback if response format is different
  return response;
};

/**
 * Fetch all available categories and locations for filter dropdowns
 * @returns {Promise<Object>} Object with categories and locations arrays
 */
export const fetchFilterOptions = async () => {
  const response = await apiRequest('resources/filters');
  
  // Handle the API response format with success/data wrapper
  if (response.success && response.data) {
    return response.data;
  }
  
  // Fallback if response format is different
  return response;
};