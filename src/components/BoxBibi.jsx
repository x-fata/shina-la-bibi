import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dead.css';

function BoxBibi() {
    return (
        <div className="card-dead">
            <h2 className="name-dead">SAADE BINT HAMAD</h2>
            <p style={{ color: '#8b949e', marginTop: '5px' }}>Marehemu</p>

            {/* Tumeongeza style ya kuhakikisha kitufe kinagusika */}
            <Link to="/saade" style={{ position: 'relative', zIndex: 10 }}>
                <button className="btn-dead" style={{ cursor: 'pointer' }}>
                    Maelezo
                </button>
            </Link>
        </div>
    );
}

export default BoxBibi;