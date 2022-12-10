import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddRepo from './pages/AddRepo';
import ManageRepo from './pages/ManageRepo';
import PageNotFound from './pages/PageNotFound';
import { Layout } from './components/Layout';
import ThemeContext from './utils/themeContext';
import './App.scss';

function App() {
  const [theme, setTheme] = useState("dark")
  const value = { theme, setTheme }
  return (
      <ThemeContext.Provider value={value}>
        <Layout>
          <Router>
            <Routes>
              <Route path="/" element={<AddRepo />} />
              <Route path="/manage/:owner/:project" element={<ManageRepo />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </Layout>
      </ThemeContext.Provider>
  );
}

export default App;
