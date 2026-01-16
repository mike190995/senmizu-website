import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainContent from './MainContent';

import { AudioProvider } from './context/AudioContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <AudioProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/*" element={<MainContent />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </AudioProvider>
  );
}

export default App;
