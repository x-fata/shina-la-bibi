import React from 'react';

function Logo() {
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{
                width: '120px',
                height: '120px',
                border: '2px solid white',
                borderRadius: '50%',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden' // Hii inakata picha iwe duara
            }}>
                {/* Hapa ndipo picha yako itakaa */}
                <img
                    src="/nembo.jpeg"
                    alt="Logo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>SHINA KUU</p>
        </div>
    );
}

export default Logo;