import { useState } from 'react';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample resource data
  const resources = [
    {
      id: 1,
      name: "Legal Aid Society",
      description: "Free legal assistance for low-income individuals facing criminal charges. We provide experienced attorneys and support services.",
      contactInfo: {
        phone: "(555) 123-4567",
        email: "help@legalaidsociety.org",
        website: "www.legalaidsociety.org"
      },
      category: "Legal Services",
      city: "New York",
      availability: "Monday-Friday, 9AM-5PM"
    },
    {
      id: 2,
      name: "Community Support Center",
      description: "Comprehensive support services including counseling, job placement, and housing assistance for individuals re-entering society.",
      contactInfo: {
        phone: "(555) 234-5678",
        email: "support@communitycenter.org",
        website: "www.communitycenter.org"
      },
      category: "Support Services",
      city: "Los Angeles",
      availability: "24/7 Hotline, Office: Mon-Sat 8AM-8PM"
    },
    {
      id: 3,
      name: "Mental Health Crisis Team",
      description: "Immediate mental health support and crisis intervention services. Trained professionals available for emergency situations.",
      contactInfo: {
        phone: "(555) 345-6789",
        email: "crisis@mentalhealth.org",
        website: "www.mentalhealthcrisis.org"
      },
      category: "Mental Health",
      city: "Chicago",
      availability: "24/7 Emergency Line"
    },
    {
      id: 4,
      name: "Employment Resource Center",
      description: "Job training, resume building, and employment placement services specifically for individuals with criminal backgrounds.",
      contactInfo: {
        phone: "(555) 456-7890",
        email: "jobs@employmentcenter.org",
        website: "www.employmentcenter.org"
      },
      category: "Employment",
      city: "Houston",
      availability: "Monday-Friday, 8AM-6PM"
    },
    {
      id: 5,
      name: "Housing Assistance Program",
      description: "Temporary and permanent housing solutions, rental assistance, and housing counseling for individuals in need.",
      contactInfo: {
        phone: "(555) 567-8901",
        email: "housing@assistance.org",
        website: "www.housingassistance.org"
      },
      category: "Housing",
      city: "Phoenix",
      availability: "Monday-Friday, 9AM-4PM"
    },
    {
      id: 6,
      name: "Substance Abuse Recovery Center",
      description: "Comprehensive addiction treatment programs including detox, counseling, and long-term recovery support.",
      contactInfo: {
        phone: "(555) 678-9012",
        email: "recovery@substanceabuse.org",
        website: "www.recoverycenter.org"
      },
      category: "Substance Abuse",
      city: "Philadelphia",
      availability: "24/7 Intake, Programs: Daily 7AM-9PM"
    },
    {
      id: 7,
      name: "Family Reunification Services",
      description: "Support for families affected by incarceration, including visitation assistance, family counseling, and reunification planning.",
      contactInfo: {
        phone: "(555) 789-0123",
        email: "family@reunification.org",
        website: "www.familyreunification.org"
      },
      category: "Family Services",
      city: "San Antonio",
      availability: "Monday-Saturday, 10AM-6PM"
    },
    {
      id: 8,
      name: "Financial Literacy Program",
      description: "Education and support for financial management, credit repair, and economic empowerment for individuals rebuilding their lives.",
      contactInfo: {
        phone: "(555) 890-1234",
        email: "finance@literacy.org",
        website: "www.financialliteracy.org"
      },
      category: "Financial Services",
      city: "San Diego",
      availability: "Tuesday-Thursday, 6PM-8PM"
    }
  ];

  // Get unique categories and cities for filters
  const categories = ['All', ...new Set(resources.map(resource => resource.category))];
  const cities = ['All', ...new Set(resources.map(resource => resource.city))];

  // Filter resources based on selected filters and search term
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesCity = selectedCity === 'All' || resource.city === selectedCity;
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Community Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the support and services you need. Browse our comprehensive directory of community resources available to help you on your journey.
          </p>
        </div>

        {/* Search and Filters */}
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
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
        </div>

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
                      {resource.city}
                    </span>
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
                      {resource.contactInfo.phone}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {resource.contactInfo.email}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                      {resource.contactInfo.website}
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Availability</h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {resource.availability}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
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
      </div>
    </div>
  );
};

export default Resources;
