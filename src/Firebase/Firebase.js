
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import 'firebase/storage';



    const firebaseConfig = {
        apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket:'event-management-3df7d.appspot.com',
        messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId:import.meta.env.VITE_FIREBASE_APP_ID, 
        measurementId:import.meta.env.VITE_FIREBASE_MEASUREMENT_ID 
      };

      const app = initializeApp(firebaseConfig);
      const storage = getStorage(app);

      export default storage;
      




