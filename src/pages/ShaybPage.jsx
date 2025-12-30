import React from 'react';
import { Link } from 'react-router-dom';
import BoxMwanafamilia from '../components/BoxMwanafamilia';

function ShaybPage() {
    return (
        <div className="container">
            {/* Kitufe cha kurudi kwa baba yake */}
            <Link to="/omar-aly" style={{ color: 'var(--gold-color)', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                ← KURUDI KWA OMAR BIN ALY
            </Link>

            <div className="card-dead" style={{ marginTop: '15px', textAlign: 'center' }}>
                <h1 className="name-dead" style={{ fontSize: '1.5rem' }}>SHAYB OMAR</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>MTOTO WA OMAR BIN ALY & SAADE BINT HAMAD</p>

                <div style={{
                    marginTop: '20px',
                    textAlign: 'left',
                    fontSize: '14px',
                    lineHeight: '1.8',
                    borderTop: '1px solid rgba(212,175,55,0.2)',
                    paddingTop: '15px'
                }}>
                    <p><strong>HALI:</strong> Marehemu</p>
                    <p><strong>MAELEZO:</strong> Maelezo mafupi kuhusu Shayb Omar na familia yake.</p>
                </div>
            </div>

            <div style={{ marginTop: '40px' }}>
                <h3 style={{ fontSize: '0.9rem', letterSpacing: '2px', borderBottom: '1px solid #30363d', paddingBottom: '10px', marginBottom: '20px' }}>
                    WATOTO WA SHAYB OMAR
                </h3>
                {/* Hapa utakuja kuweka mabox ya watoto wa Shayb */}
            </div>
        </div>
    );
}

export default ShaybPage;