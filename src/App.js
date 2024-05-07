import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Tbd from './components/Tbd.js';
import HomeNav from './components/HomeNav';
import DashBoard from './components/DB/DashBoard.js';
import FloorPlan from './components/DB/FloorPlan.js';
import BreadcrumbNav from './components/BreadcrumbNav.js';
import Footer from './components/Footer.js'

import './App.css'

function App() {
  return (
    <BrowserRouter>
    <div style={{ display: 'flex', height: '100%' }}>
    <HomeNav />
    <div className='main'>
    <BreadcrumbNav />
    <div className='app-contents'>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Dashboard/FloorPlan" />} />
        <Route path="/Dashboard/FloorPlan" element={<FloorPlan />} />
        <Route path="/Dashboard" element={<DashBoard />} />
        <Route path="/Teams" element={<Tbd />} />
        <Route path="/Hive" element={<Tbd />} />
        <Route path="/File" element={<Tbd />} />
        <Route path="/Chart" element={<Tbd />} />
        <Route path="/Chat" element={<Tbd />} />
        <Route path="/Board" element={<Tbd />} />
        <Route path="/Gear" element={<Tbd />} />
      </Routes>
    </div>
    <Footer />
    </div>
  </div>
  </BrowserRouter>
  );
}

export default App;
