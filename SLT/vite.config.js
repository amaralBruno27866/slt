import { defineConfig, loadEnv } from 'vite'; // Importing Vite configuration utilities
import react from '@vitejs/plugin-react'; // Importing the React plugin for Vite
import process from 'process'; // Importing process to access environment variables

// Exporting the Vite configuration
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (e.g., development, production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Plugins: Add the React plugin to enable React-specific features
    plugins: [react()],

    // Server configuration
    server: {
      // PORT: The port on which the Vite development server will run
      // This is used to avoid conflicts with other applications running on the same machine
      // Example: If set to 3000, the frontend will be accessible at http://localhost:3000
      port: parseInt(env.VITE_PORT) || 3000,

      // Proxy configuration
      /**
       * Objective: Forward API requests from the frontend to the backend server.
       * Functionality: Redirects requests starting with `/api` to the backend server running on port 5000.
       * Expected Result: The frontend can make API requests without encountering CORS issues.
       */
      proxy: {
        '/api': {
          target: 'http://localhost:5000', // Backend server URL
          changeOrigin: true, // Change the origin of the request to match the target
        },
      },
    },
  };
});