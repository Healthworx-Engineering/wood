// nuxt.config.ts
export default defineNuxtConfig({
  // Enable Vue DevTools
  devtools: { enabled: true },
  
  // Configure app metadata
  app: {
    head: {
      title: 'Environmental Product Scanner',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Scan products and check their environmental impact' }
      ],
      // Removed TensorFlow.js CDN scripts to prevent double loading
    }
  },
  
  // Auto-import components
  components: true,
  
  // Configure modules (optional)
  modules: [
    '@nuxtjs/tailwindcss', 
  ],
  
  // Build configuration
  build: {
    transpile: [
      '@tensorflow/tfjs',
      '@tensorflow/tfjs-backend-webgl',
      '@tensorflow/tfjs-backend-cpu'
    ]
  },
  
  // Runtime config
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://data.epa.gov/efservice/',
    }
  },
  
  // Webpack configuration to handle CommonJS modules
  webpack: {
    config: (config) => {
      if (!config.resolve) config.resolve = {};
      if (!config.resolve.fallback) config.resolve.fallback = {};
      
      // Add Node.js polyfills
      config.resolve.fallback.fs = false;
      config.resolve.fallback.path = false;
      config.resolve.fallback.util = false;
      config.resolve.fallback.process = false;
      config.resolve.fallback.buffer = false;
      
      return config;
    }
  }
})