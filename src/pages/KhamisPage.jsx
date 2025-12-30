import React from 'react';
import { Link } from 'react-router-dom';
import BoxMwanafamilia from '../components/BoxMwanafamilia';

function KhamisPage() {
    return (
        <div className="container">
            {/* Kitufe cha kurudi kwa Baba yake */}
            <Link to="/yussuf-khamis" style={{ color: 'var(--gold-color)', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                ← KURUDI KWA YUSSUF BIN KHAMIS
            </Link>

            {/* PROFILE YA KHAMIS */}
            <div className="card-alive" style={{ marginTop: '15px', textAlign: 'center' }}>
                <h1 className="name-alive" style={{ fontSize: '1.5rem' }}>KHAMIS YUSSUF</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>MTOTO WA YUSSUF BIN KHAMIS & SAADE BINT HAMAD</p>

                <div style={{
                    marginTop: '20px',
                    textAlign: 'left',
                    fontSize: '14px',
                    lineHeight: '1.8',
                    borderTop: '1px solid rgba(0, 255, 127, 0.2)',
                    paddingTop: '15px'
                }}>
                    <p><strong>HALI:</strong> Hai</p>
                    <p><strong>MAELEZO:</strong> Khamis ni mwana wa Yussuf Bin Khamis na Bibi Saade.</p>
                </div>
            </div>

            {/* SEHEMU YA WATOTO WA KHAMIS (INFINITY) */}
            <div style={{ marginTop: '40px' }}>
                <h3 style={{
                    fontSize: '0.9rem',
                    letterSpacing: '2px',
                    borderBottom: '1px solid #30363d',
                    paddingBottom: '10px',
                    marginBottom: '20px'
                }}>
                    WATOTO WA KHAMIS YUSSUF
                </h3>
                {/* Hapa tutaweka watoto wake ukishanipa orodha */}
            </div>
        </div>
    );
}

export default KhamisPage;