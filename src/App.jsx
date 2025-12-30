import { Routes, Route } from 'react-router-dom';
import Logo from './components/Logo';
import BoxBibi from './components/BoxBibi';
import HabariFupi from './components/HabariFupi';
import Malengo from './components/Malengo';
import MaelezoJumla from './components/MaelezoJumla';
import SaadePage from './pages/SaadePage';

// 1. LAZIMA U-IMPORT HIZI PAGE HAPA JUU
import OmarAlyPage from './pages/OmarAlyPage';
import YussufKhamisPage from './pages/YussufKhamisPage';
import OmarMussaPage from './pages/OmarMussaPage';
import KhadijaPage from './pages/KhadijaPage'; // TUMEONGEZA HII
import ShaybPage from './pages/ShaybPage';     // TUMEONGEZA HII
import TatuPage from './pages/TatuPage';
import KhamisPage from './pages/KhamisPage';
import OthmanPage from './pages/OthmanPage';
import AliPage from './pages/AliPage';
const Home = () => (
  <div className="container">
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px'
    }}>
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/saade" element={<SaadePage />} />

      {/* NJIA ZA WAUME */}
      <Route path="/omar-aly" element={<OmarAlyPage />} />
      <Route path="/yussuf-khamis" element={<YussufKhamisPage />} />
      <Route path="/omar-mussa" element={<OmarMussaPage />} />

      {/* NJIA ZA WATOTO (WAJUKUU) */}
      <Route path="/khadija-omar" element={<KhadijaPage />} />
      <Route path="/shayb-omar" element={<ShaybPage />} />
      <Route path="/tatu-yussuf" element={<TatuPage />} />
      <Route path="/khamis-yussuf" element={<KhamisPage />} />
      <Route path="/othman-omar" element={<OthmanPage />} />
      <Route path="/ali-omar" element={<AliPage />} />
    </Routes>
  );
}

export default App;