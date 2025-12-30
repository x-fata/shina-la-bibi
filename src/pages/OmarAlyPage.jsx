import React from 'react';
import { Link } from 'react-router-dom';
import BoxMwanafamilia from '../components/BoxMwanafamilia';

function OmarAlyPage() {
    return (
        <div className="container">
            {/* Kitufe cha kurudi kwa Bibi */}
            <Link to="/saade" style={{ color: 'var(--gold-color)', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                ← KURUDI KWA SAADE BINT HAMAD
            </Link>

            {/* 1. SEHEMU YA PROFILE YA MUME WA PILI */}
            <div className="card-dead" style={{ marginTop: '15px', textAlign: 'center' }}>
                <h1 className="name-dead" style={{ fontSize: '1.5rem' }}>OMAR BIN ALY</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>MUME WA PILI WA SAADE BINT HAMAD</p>

                <div style={{
                    marginTop: '20px',
                    textAlign: 'left',
                    fontSize: '14px',
                    lineHeight: '1.8',
                    borderTop: '1px solid rgba(212,175,55,0.2)',
                    paddingTop: '15px'
                }}>
                    <p><strong>MAHALI:</strong> Zanzibar</p>
                    <p><strong>MAELEZO:</strong> Omar Bin Aly alikuwa mume wa pili wa Bibi Saade na walijaaliwa kupata watoto wawili (2).</p>
                </div>
            </div>

            {/* 2. SEHEMU YA WATOTO (SHERIA YA INFINITY) */}
            <div style={{ marginTop: '40px' }}>
                <h3 style={{
                    fontSize: '0.9rem',
                    letterSpacing: '2px',
                    borderBottom: '1px solid #30363d',
                    paddingBottom: '10px',
                    marginBottom: '20px'
                }}>
                    WATOTO WA OMAR BIN ALY
                </h3>

                {/* Khadija - Marehemu */}
                <BoxMwanafamilia
                    jina="KHADIJA OMAR"
                    hali="marehemu"
                    link="/khadija-omar"
                />

                {/* Shayb - Marehemu */}
                <BoxMwanafamilia
                    jina="SHAYB OMAR"
                    hali="marehemu"
                    link="/shayb-omar"
                />
            </div>

            <p style={{ marginTop: '30px', fontSize: '11px', color: 'var(--text-dim)', textAlign: 'center' }}>
                Bonyeza mtoto kuona kizazi chake (Wajukuu wa Bibi Saade).
            </p>
        </div>
    );
}

export default OmarAlyPage;