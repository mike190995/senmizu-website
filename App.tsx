import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainContent from './MainContent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainContent />} />
      </Routes>
    </Router>
  );
}

export default App;
