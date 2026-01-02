import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, increment, deleteDoc } from "firebase/firestore";

function CommentsPage() {
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [showSecurity, setShowSecurity] = useState(false);
    const [password, setPassword] = useState("");
    const [targetId, setTargetId] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "" });

    const triggerToast = (msg) => {
        setToast({ show: true, message: msg });
        setTimeout(() => setToast({ show: false, message: "" }), 3000);
    };

    useEffect(() => {
        const q = query(collection(db, "comments"), orderBy("muda", "desc"));
        return onSnapshot(q, (snap) => {
            setComments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    }, []);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        try {
            await addDoc(collection(db, "comments"), { text: newComment, muda: serverTimestamp() });
            await updateDoc(doc(db, "notifications", "global_count"), { count: increment(1) });
            setNewComment("");
            triggerToast("Ujumbe umetumwa!");
        } catch (err) { console.error(err); }
    };

    const handleDeleteClick = (id) => {
        setTargetId(id);
        setShowSecurity(true);
    };

    const verifyAndDelete = async () => {
        if (password === "unga-udugu") {
            await deleteDoc(doc(db, "comments", targetId));
            setShowSecurity(false);
            setPassword("");
            triggerToast("Ujumbe umefutwa!");
        } else {
            alert("Neno la siri si sahihi!");
        }
    };

    return (
        <div className="container">
            {toast.show && <div className="toast-box">{toast.message}</div>}
            <h2 style={{ color: 'var(--gold-color)', textAlign: 'center' }}>MAONI & MAWAZO</h2>

            <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #333', background: '#161b22', color: 'white' }}
                    value={newComment} onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Andika maoni yako..."
                />
                <button type="submit" style={{ background: '#1a5d3b', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '10px', fontWeight: 'bold' }}>TUMA</button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {comments.map(c => (
                    <div key={c.id} style={{ background: '#161b22', padding: '15px', borderRadius: '12px', borderLeft: '4px solid var(--gold-color)', position: 'relative' }}>
                        <p style={{ margin: 0, fontSize: '14px', paddingRight: '35px' }}>{c.text}</p>
                        <small style={{ color: '#666' }}>{c.muda?.toDate().toLocaleString()}</small>
                        <button onClick={() => handleDeleteClick(c.id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>🗑️</button>
                    </div>
                ))}
            </div>

            {showSecurity && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#161b22', padding: '20px', borderRadius: '15px', width: '85%', maxWidth: '300px', textAlign: 'center', border: '1px solid #333' }}>
                        <h4 style={{ color: 'var(--gold-color)' }}>THIBITISHA UDUGU</h4>
                        <input type="password" autoFocus style={{ width: '100%', padding: '10px', margin: '15px 0', borderRadius: '6px', border: '1px solid #444', background: '#0d1117', color: 'white', textAlign: 'center' }} placeholder="Neno la siri..." value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => setShowSecurity(false)} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: 'none', background: '#333', color: 'white' }}>Ghairi</button>
                            <button onClick={verifyAndDelete} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: 'none', background: '#ff4444', color: 'white', fontWeight: 'bold' }}>Futa</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default CommentsPage;