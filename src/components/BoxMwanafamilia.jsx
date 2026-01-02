import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dead.css';
import '../styles/alive.css';

function BoxMwanafamilia({ jina, hali, jinsia, link, onAdd, onEdit }) {
    const styleCard = hali === 'marehemu' ? 'card-dead' : 'card-alive';
    const styleName = hali === 'marehemu' ? 'name-dead' : 'name-alive';

    // SVG Avatars (Hizi hazihitaji internet, ni kodi tu)
    const kiumeAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238b949e'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
    const kikeAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23d4af37'%3E%3Cpath d='M12 2c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11c0-4.97-4.03-9-9-9zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

    const profilePicha = jinsia === 'mwanamke' ? kikeAvatar : kiumeAvatar;

    return (
        <div className={styleCard} style={{
            marginBottom: '15px', padding: '15px', position: 'relative',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
            <div style={{ flex: 1 }}>
                <div>
                    <h4 className={styleName} style={{ fontSize: '1.05rem', margin: 0 }}>{jina}</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>
                        {hali === 'marehemu' ? '⚫ MAREHEMU' : '🟢 HAI'} | {jinsia?.toUpperCase() || 'MALE'}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); }} style={btnActionStyle} title="Badili"> ✍️ </button>
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd(); }} disabled={hali === 'marehemu'} style={btnActionStyle} title="Ongeza Mtoto"> + </button>
                    {link && (
                        <Link to={link}>
                            <button className={hali === 'marehemu' ? 'btn-dead' : 'btn-alive'} style={{ fontSize: '10px', padding: '5px 15px' }}>
                                Maelezo
                            </button>
                        </Link>
                    )}
                </div>
            </div>

            <div style={{ marginLeft: '15px' }}>
                <div style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    border: hali === 'marehemu' ? '2px solid #555' : '2px solid var(--gold-color)',
                    background: '#161b22', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    overflow: 'hidden'
                }}>
                    <img
                        src={profilePicha}
                        alt="avatar"
                        style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                    />
                </div>
            </div>
        </div>
    );
}

const btnActionStyle = {
    background: 'rgba(212, 175, 55, 0.1)',
    border: '1px solid var(--gold-color)',
    color: 'var(--gold-color)',
    borderRadius: '4px',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: '14px'
};

export default BoxMwanafamilia;