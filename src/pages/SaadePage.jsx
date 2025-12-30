import React from 'react';
import { Link } from 'react-router-dom';
import BoxMwanafamilia from '../components/BoxMwanafamilia';

function SaadePage() {
    return (
        <div className="container">
            {/* Kitufe cha kurudi nyuma */}
            <Link to="/" style={{ color: 'var(--gold-color)', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                ← KURUDI HOME
            </Link>

            {/* 1. SEHEMU YA PROFILE YA BIBI (SHINA KUU) */}
            <div className="card-dead" style={{ marginTop: '15px', textAlign: 'center' }}>
                <h1 className="name-dead" style={{ fontSize: '1.5rem' }}>SAADE BINT HAMAD</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>SHINA KUU</p>

                <div style={{
                    marginTop: '20px',
                    textAlign: 'left',
                    fontSize: '14px',
                    lineHeight: '1.8',
                    borderTop: '1px solid rgba(212,175,55,0.2)',
                    paddingTop: '15px'
                }}>
                    <p><strong>MAHALI:</strong> Zanzibar</p>
                    <p><strong>MAELEZO:</strong> Shina mama la familia hii. Chini yake kuna vizazi vilivyozaliwa kupitia waume watatu (3).</p>
                </div>
            </div>

            {/* 2. SEHEMU YA WAUME (KILA MUME NI LANGO LA WATOTO WAKE) */}
            <div style={{ marginTop: '30px' }}>
                <h3 style={{
                    fontSize: '0.9rem',
                    letterSpacing: '2px',
                    color: 'var(--gold-color)',
                    borderBottom: '1px solid #30363d',
                    paddingBottom: '10px',
                    marginBottom: '20px'
                }}>
                    WAUME ZAKE SAADE (SHINA)
                </h3>

                {/* Kila mume sasa ana LINK yake maalum kuelekea kwa watoto wake */}
                <BoxMwanafamilia
                    jina="OMAR BIN ALY"
                    hali="marehemu"
                    link="/omar-aly"
                />

                <BoxMwanafamilia
                    jina="YUSSUF BIN KHAMIS"
                    hali="marehemu"
                    link="/yussuf-khamis"
                />

                <BoxMwanafamilia
                    jina="OMAR BIN MUSSA"
                    hali="marehemu"
                    link="/omar-mussa"
                />
            </div>

            <p style={{ marginTop: '40px', fontSize: '11px', color: 'var(--text-dim)', textAlign: 'center' }}>
                Bonyeza mume kuona watoto aliowazaa na Bibi Saade.
            </p>
        </div>
    );
}

export default SaadePage;