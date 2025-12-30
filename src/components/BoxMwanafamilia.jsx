import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dead.css';
import '../styles/alive.css';

// Hii Object inapokea 'jina', 'hali' (hai/marehemu), na 'link' ya page yake
function BoxMwanafamilia({ jina, hali, link }) {

    // Hapa tunaamua: Kama ni marehemu tumia card-dead, vinginevyo card-alive
    const styleCard = hali === 'marehemu' ? 'card-dead' : 'card-alive';
    const styleName = hali === 'marehemu' ? 'name-dead' : 'name-alive';
    const styleBtn = hali === 'marehemu' ? 'btn-dead' : 'btn-alive';

    return (
        <div className={styleCard} style={{ marginBottom: '15px', padding: '15px' }}>
            <h4 className={styleName} style={{ fontSize: '1rem' }}>{jina}</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '5px 0' }}>
                {hali === 'marehemu' ? 'Marehemu' : 'Hai'}
            </p>

            {link && (
                <Link to={link} style={{ position: 'relative', zIndex: 10 }}>
                    <button className={styleBtn} style={{ fontSize: '10px', padding: '5px 10px', cursor: 'pointer' }}>
                        Maelezo
                    </button>
                </Link>
            )}
        </div>
    );
}

export default BoxMwanafamilia;