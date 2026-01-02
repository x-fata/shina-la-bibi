import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import BoxBibi from './components/BoxBibi';
import HabariFupi from './components/HabariFupi';
import Malengo from './components/Malengo';
import MaelezoJumla from './components/MaelezoJumla';
import SaadePage from './pages/SaadePage';
import MemberProfilePage from './pages/MemberProfilePage';
import CommentsPage from './pages/CommentsPage';

const Home = () => (
  <div className="container">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
      <HabariFupi />
      <Logo />
      <Malengo />
    </div>
    <BoxBibi />
    <MaelezoJumla />
  </div>
);

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saade" element={<SaadePage />} />
        <Route path="/member/:id" element={<MemberProfilePage />} />
        <Route path="/comments" element={<CommentsPage />} />
      </Routes>
    </div>
  );
}

export default App;