// plugins/tensorflow.client.ts
export default defineNuxtPlugin(async (nuxtApp) => {
    // Check if TensorFlow has already been initialized
    if (window.tf) {
      console.log('TensorFlow.js already initialized, using existing instance');
      return {
        provide: {
          tf: window.tf,
          tfReady: true
        }
      };
    }
  
    try {
      // Use a single import to avoid multiple registrations
      const tf = await import('@tensorflow/tfjs');
      
      // Import ONLY the backends you need, one at a time
      // First set the CPU backend, which is the fallback
      await tf.setBackend('cpu');
      
      // Then try to set WebGL if available, which is faster
      if (tf.getBackend() !== 'webgl') {
        try {
          await tf.setBackend('webgl');
        } catch (e) {
          console.warn('WebGL backend not available, using CPU instead:', e);
        }
      }
      
      await tf.ready(); // Wait until backend is ready
      
      // Make tf available globally to help debugging, but avoid duplicate window.tf assignments
      if (!window.tf) {
        window.tf = tf;
      }
      
      console.log('TensorFlow.js initialized successfully. Backend:', tf.getBackend());
      
      return {
        provide: {
          tf,
          tfReady: true
        }
      };
    } catch (error) {
      console.error('Failed to initialize TensorFlow.js:', error);
      return {
        provide: {
          tf: null,
          tfReady: false
        }
      };
    }
  });