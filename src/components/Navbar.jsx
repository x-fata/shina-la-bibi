import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function Navbar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [allMembers, setAllMembers] = useState([]);
    const [results, setResults] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [notifCount, setNotifCount] = useState(0);

    useEffect(() => {
        onSnapshot(collection(db, "wanachama"), (snap) => {
            setAllMembers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        onSnapshot(collection(db, "notifications"), (snap) => {
            let total = 0;
            snap.forEach(doc => total += (doc.data().count || 0));
            setNotifCount(total);
        });
    }, []);

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        setResults(val.length > 1 ? allMembers.filter(m => m.jina.toLowerCase().includes(val.toLowerCase())) : []);
    };

    return (
        <header className="top-header">
            <div className="search-wrapper">
                <input className="search-input" placeholder="🔍 Tafuta..." value={searchTerm} onChange={handleSearch} />
                {results.length > 0 && (
                    <div style={{ position: 'absolute', width: '100%', background: '#1c2128', borderRadius: '10px', marginTop: '5px', border: '1px solid var(--gold-color)', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
                        {results.map(m => (
                            <div key={m.id} onClick={() => { navigate(`/member/${m.id}`); setSearchTerm(""); setResults([]); }} style={{ padding: '12px', cursor: 'pointer', borderBottom: '1px solid #222' }}>{m.jina}</div>
                        ))}
                    </div>
                )}
            </div>

            <button className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

            {menuOpen && (
                <div className="dropdown-menu">
                    <button className="menu-link" onClick={() => { navigate('/'); setMenuOpen(false); }}>🏠 Home</button>
                    <button className="menu-link" onClick={() => { navigate('/comments'); setMenuOpen(false); }}>
                        💬 Maoni {notifCount > 0 && <span style={{ background: 'red', padding: '1px 6px', borderRadius: '10px', fontSize: '10px', marginLeft: '5px' }}>{notifCount}</span>}
                    </button>
                    <button className="menu-link" onClick={() => { navigate('/saade'); setMenuOpen(false); }}>🌿 Saade</button>
                    <button className="menu-link" onClick={() => { alert("Kuja hivi punde..."); setMenuOpen(false); }}>⚙️ Setting</button>
                </div>
            )}
        </header>
    );
}
export default Navbar;