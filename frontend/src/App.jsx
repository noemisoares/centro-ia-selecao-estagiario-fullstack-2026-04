import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import Results from './views/Results';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100 selection:bg-blue-500/30 font-sans">
        <Header />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
