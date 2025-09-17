# Crisis Resource Locator

A comprehensive web application designed to help individuals find community resources and support services. The application provides an intuitive interface for discovering resources related to domestic violence, mental health, legal services, employment, housing, and more.

## 🌟 Features

- **Resource Directory**: Browse a comprehensive list of community resources
- **Advanced Filtering**: Filter resources by category and location
- **Real-time Search**: Search resources by name or description
- **Backend Integration**: Seamless API integration with backend filtering
- **Responsive Design**: Mobile-friendly interface with modern UI
- **24/7 Availability Indicators**: Visual indicators for round-the-clock services
- **Contact Information**: Direct access to phone numbers and websites

## 🛠️ Technologies Used

### Frontend
- **React 19.1.1** - Modern JavaScript library for building user interfaces
- **Vite 7.1.2** - Fast build tool and development server
- **Tailwind CSS 4.1.13** - Utility-first CSS framework for styling
- **JavaScript (ES6+)** - Modern JavaScript features and syntax

### Development Tools
- **ESLint 9.33.0** - Code linting and quality assurance
- **@vitejs/plugin-react 5.0.0** - React plugin for Vite
- **Node.js** - JavaScript runtime environment
- **npm** - Package manager

### API Integration
- **Fetch API** - For HTTP requests to backend services
- **Environment Variables** - Configuration management
- **Error Handling** - Graceful fallback mechanisms

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation for local development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crl-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5174` (or the port shown in terminal)

## 📁 Project Structure

```
src/
├── pages/
│   └── Resources.jsx          # Main resources component
├── service/
│   └── api.js                 # API utility functions
├── App.jsx                    # Main application component
├── App.css                    # Global styles
├── main.jsx                   # Application entry point
└── index.css                  # Base styles

public/
├── care-icon.svg              # Custom favicon
└── vite.svg                   # Vite logo
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

The application expects the following backend endpoints:

- `GET /resources` - Fetch all resources
- `GET /resources?location={city}&category={type}` - Filtered resources
- `GET /resources/filters` - Get available filter options

### Expected API Response Format
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Resource Name",
      "category": "category-name",
      "location": "Location",
      "phone": "Phone Number",
      "website": "https://website.com",
      "available24h": true,
      "description": "Resource description"
    }
  ],
  "count": 1,
  "filters": {
    "location": null,
    "category": null
  }
}
```

## 🎨 Design Features

- **Soothing Color Palette**: Blue and green gradient design intended to sooth page visitors.
- **Modern UI**: Clean, professional interface
- **Accessibility**: WCAG compliant design
- **Responsive Layout**: Works on all device sizes
