import './App.css';
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import Gallery from './components/Gallery';
// import { DragDropContextProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';


const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Initialize the Firebase app
    const firebaseConfig = {
      apiKey: "AIzaSyAM-F4pciMf_WxjxVbgJQhio_OUPJNp4E0",
      authDomain: "imagesite-91298.firebaseapp.com",
      projectId: "imagesite-91298",
      storageBucket: "imagesite-91298.appspot.com",
      messagingSenderId: "32062178803",
      appId: "1:32062178803:web:fc2d4fc32c4d76de537e86"
    };

    const app = initializeApp(firebaseConfig);

    // Get the Firebase auth instance
    const auth = getAuth(app);

    // Listen for changes to the user's authentication status
    onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
    });
  }, []);

  return (
    <div>
      {authenticated ? (
        <DndProvider backend={HTML5Backend}>
          <Gallery />
        </DndProvider>
      ) : (
        <Login onLogin={setAuthenticated} />
      )}
    </div>
  );
};

export default App;
