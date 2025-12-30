import React from 'react';
import { Link } from 'react-router-dom';
import BoxMwanafamilia from '../components/BoxMwanafamilia';

function KhadijaPage() {
    return (
        <div className="container">
            {/* Kitufe cha kurudi kwa baba yake (Omar Bin Aly) */}
            <Link to="/omar-aly" style={{ color: 'var(--gold-color)', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                ← KURUDI KWA OMAR BIN ALY
            </Link>

            {/* 1. PROFILE YA KHADIJA */}
            <div className="card-dead" style={{ marginTop: '15px', textAlign: 'center' }}>
                <h1 className="name-dead" style={{ fontSize: '1.5rem' }}>KHADIJA OMAR</h1>
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
                    <p><strong>MAELEZO:</strong> Khadija ni mjukuu wa kwanza upande wa Omar Bin Aly. Hapa tutaweka historia ya kizazi chake.</p>
                </div>
            </div>

            {/* 2. SEHEMU YA WATOTO WA KHADIJA (WAJUKUU WA OMAR / VITUKUU VYA SAADE) */}
            <div style={{ marginTop: '40px' }}>
                <h3 style={{
                    fontSize: '0.9rem',
                    letterSpacing: '2px',
                    borderBottom: '1px solid #30363d',
                    paddingBottom: '10px',
                    marginBottom: '20px'
                }}>
                    WATOTO WA KHADIJA OMAR
                </h3>

                {/* Hapa utakuja kuweka mabox ya watoto wa Khadija */}
                <p style={{ fontSize: '11px', color: 'var(--text-dim)', textAlign: 'center' }}>
                    Unasubiri orodha ya watoto wa Khadija...
                </p>
            </div>
        </div>
    );
}

export default KhadijaPage;