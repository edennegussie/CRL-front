import { useState, useEffect } from 'react';
import { fetchResources } from '../service/api';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState([]);
  const [initialLocations, setInitialLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Fallback sample data in case API is not available
  const fallbackResources = [ ];

  // Fetch resources from API
  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Pass current filters to the API
        const filters = {
          location: selectedCity !== 'All' ? selectedCity : undefined,
          category: selectedCategory !== 'All' ? selectedCategory : undefined
        };
        
        const data = await fetchResources(filters);
        setResources(data);
     
        if(initialLocations.length === 0)
          setInitialLocations([...new Set(data.map(d => d.location))]);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError(err.message);
        // Use fallback data if API fails
        setResources(fallbackResources);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [selectedCategory, selectedCity]); // Refetch when filters change

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Predefined categories for the application
  const predefinedCategories = ['domestic-violence', 'mental-health', 'legal-aid', 'housing'];
  
  // Get unique categories and locations for filters (with fallback)
  const categories = ['All', ...predefinedCategories];
 const locations = ['All', ...initialLocations];

  // Filter resources based on search term (backend handles category/location filtering)
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50 rounded-2xl shadow-lg mb-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-65 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-0 right-0 w-72 h-65 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-65 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </div>
          
          {/* Content */}
          <div className="relative px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Crisis Resource Locator
            </h1>
            
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Community Resources
            </h2>
            
            <p className="text text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find the support and services you need. Browse our comprehensive directory of community resources available to help you on your journey.
            </p>
            
          </div>
        </div>

        {/* Error State */}
        {error && !loading && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  API Connection Issue
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Unable to fetch resources from API: {error}</p>
                  <p>Showing sample data instead.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters - Always visible */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Resources
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category+"llllllll"}</option>
                ))}
              </select>
            </div>

             {/* Location Filter */}
             <div>
               <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                 Location
               </label>
               <select
                 id="location"
                 value={selectedCity}
                 onChange={(e) => setSelectedCity(e.target.value)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               >
                 {locations.map(location => (
                   <option key={location} value={location}>{location}</option>
                 ))}
               </select>
             </div>
          </div>
        </div>

        {/* Loading State - Show below search bar */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading resources...</p>
          </div>
        )}

        {/* Results Count - Only show when not loading */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredResources.length} of {resources.length} resources
            </p>
          </div>
        )}

        {/* Resources Grid and Results - Only show when not loading */}
        {!loading && (
          <>
            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <div key={resource.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="p-6">
                    {/* Resource Header */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {resource.name}
                      </h3>
                       <div className="flex items-center space-x-2 mb-2">
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                           {resource.category}
                         </span>
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                           {resource.location}
                         </span>
                         {resource.available24h && (
                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                             24/7
                           </span>
                         )}
                       </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {resource.description}
                    </p>

                     {/* Contact Information */}
                     <div className="mb-4">
                       <h4 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h4>
                       <div className="space-y-1 text-sm text-gray-600">
                         <div className="flex items-center">
                           <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                           </svg>
                           {resource.phone}
                         </div>
                         {resource.website && (
                           <div className="flex items-center">
                             <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                             </svg>
                             <a 
                               href={resource.website} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-blue-600 hover:text-blue-800 underline"
                             >
                               {resource.website}
                             </a>
                           </div>
                         )}
                       </div>
                     </div>

                    {/* Availability */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Availability</h4>
                      <p className="text-sm text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {resource.available24h ? 'Available 24/7' : 'Business hours'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Resources from Database */}
            {!error && resources.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Currently there are no resources</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  We're working to add more resources to help you. Please check back later or contact us if you need immediate assistance.
                </p>
              </div>
            )}

            {/* No Results from Filtering */}
            {!error && resources.length > 0 && filteredResources.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No resources found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Resources;
