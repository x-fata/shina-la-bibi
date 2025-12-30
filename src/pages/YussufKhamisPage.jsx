import React from 'react';
import { Link } from 'react-router-dom';
import BoxMwanafamilia from '../components/BoxMwanafamilia';

function YussufKhamisPage() {
    return (
        <div className="container">
            {/* Kitufe cha kurudi kwa Bibi */}
            <Link to="/saade" style={{ color: 'var(--gold-color)', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                ← KURUDI KWA SAADE BINT HAMAD
            </Link>

            {/* 1. PROFILE YA MUME WA TATU */}
            <div className="card-dead" style={{ marginTop: '15px', textAlign: 'center' }}>
                <h1 className="name-dead" style={{ fontSize: '1.5rem' }}>YUSSUF BIN KHAMIS</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>MUME WA TATU WA SAADE BINT HAMAD</p>

                <div style={{
                    marginTop: '20px',
                    textAlign: 'left',
                    fontSize: '14px',
                    lineHeight: '1.8',
                    borderTop: '1px solid rgba(212,175,55,0.2)',
                    paddingTop: '15px'
                }}>
                    <p><strong>MAHALI:</strong> Zanzibar</p>
                    <p><strong>MAELEZO:</strong> Yussuf Bin Khamis alikuwa mume wa tatu wa Bibi Saade na walijaaliwa kupata watoto wawili (2).</p>
                </div>
            </div>

            {/* 2. SEHEMU YA WATOTO WA YUSSUF (HAWA WAKO HAI - RANGI YA KIJANI) */}
            <div style={{ marginTop: '40px' }}>
                <h3 style={{
                    fontSize: '0.9rem',
                    letterSpacing: '2px',
                    borderBottom: '1px solid #30363d',
                    paddingBottom: '10px',
                    marginBottom: '20px'
                }}>
                    WATOTO WA YUSSUF BIN KHAMIS
                </h3>

                {/* Tatu - Hai */}
                <BoxMwanafamilia
                    jina="TATU YUSSUF"
                    hali="hai"
                    link="/tatu-yussuf"
                />

                {/* Khamis - Hai */}
                <BoxMwanafamilia
                    jina="KHAMIS YUSSUF"
                    hali="hai"
                    link="/khamis-yussuf"
                />
            </div>
        </div>
    );
}

export default YussufKhamisPage;