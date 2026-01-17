    // frontend/src/main.jsx
    // This is the entry point for your React application.

    import React from 'react'; // Import React library
    import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
    import App from './App.jsx'; // Import your main App component
    // NOTE: './index.css' is NOT imported here. It is linked directly in index.html for simplicity,
    // as we are bypassing PostCSS and other build-time CSS processing for now.

    // Get the root DOM element where the React app will be mounted
    const rootElement = document.getElementById('root');

    // Create a React root and render the App component into it
    // React.StrictMode is a tool for highlighting potential problems in an application.
    // It does not render any visible UI.
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App /> {/* Render your main App component */}
      </React.StrictMode>,
    );
    