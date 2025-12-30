import React from 'react';
import { Link } from 'react-router-dom';
import BoxMwanafamilia from '../components/BoxMwanafamilia';

function AliPage() {
    return (
        <div className="container">
            {/* Kitufe cha kurudi kwa Baba yake */}
            <Link to="/omar-mussa" style={{ color: 'var(--gold-color)', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                ← KURUDI KWA OMAR BIN MUSSA
            </Link>

            {/* PROFILE YA ALI */}
            <div className="card-alive" style={{ marginTop: '15px', textAlign: 'center' }}>
                <h1 className="name-alive" style={{ fontSize: '1.5rem' }}>ALI OMAR</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>MTOTO WA OMAR BIN MUSSA & SAADE BINT HAMAD</p>

                <div style={{
                    marginTop: '20px',
                    textAlign: 'left',
                    fontSize: '14px',
                    lineHeight: '1.8',
                    borderTop: '1px solid rgba(0, 255, 127, 0.2)',
                    paddingTop: '15px'
                }}>
                    <p><strong>HALI:</strong> Hai</p>
                    <p><strong>MAELEZO:</strong> Ali ni mwana wa Omar Bin Mussa na Bibi Saade.</p>
                </div>
            </div>

            {/* SEHEMU YA WATOTO (INFINITY) */}
            <div style={{ marginTop: '40px' }}>
                <h3 style={{
                    fontSize: '0.9rem',
                    letterSpacing: '2px',
                    borderBottom: '1px solid #30363d',
                    paddingBottom: '10px',
                    marginBottom: '20px'
                }}>
                    WATOTO WA ALI OMAR
                </h3>
                {/* Hapa tutaweka watoto wake */}
            </div>
        </div>
    );
}

export default AliPage;