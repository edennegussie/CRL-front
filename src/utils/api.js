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
 * Fetch all resources from the API
 * @returns {Promise<Array>} Array of resource objects
 */
export const fetchResources = async () => {
  const response = await apiRequest('/resources');
  
  // Handle the API response format with success/data wrapper
  if (response.success && response.data) {
    return response.data;
  }
  
  // Fallback if response format is different
  return response;
};