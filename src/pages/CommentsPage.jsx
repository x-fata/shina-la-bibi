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

    // Inasoma maamuzi ya user kutoka kwenye memory ya simu yake
    const [userReactions, setUserReactions] = useState(() => {
        const saved = localStorage.getItem('ukoo_reactions');
        return saved ? JSON.parse(saved) : {};
    });

    const triggerToast = (msg) => {
        setToast({ show: true, message: msg });
        setTimeout(() => setToast({ show: false, message: "" }), 3000);
    };

    useEffect(() => {
        localStorage.setItem('ukoo_reactions', JSON.stringify(userReactions));
    }, [userReactions]);

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
            await addDoc(collection(db, "comments"), {
                text: newComment,
                muda: serverTimestamp(),
                likes: 0,
                unlikes: 0,
                loves: 0
            });
            await updateDoc(doc(db, "notifications", "global_count"), { count: increment(1) });
            setNewComment("");
            triggerToast("Ujumbe umetumwa!");
        } catch (err) { console.error(err); }
    };

    // LOGIC MPYA: Like, Unlike, na Love kufuata sheria zako
    const handleReaction = async (id, type) => {
        const commentRef = doc(db, "comments", id);
        const currentReaction = userReactions[id]; // Ni nini user alibonyeza mwanzo kwenye huu ujumbe?
        let updates = {};
        let newUserReactions = { ...userReactions };

        if (type === 'loves') {
            // Instagram Style: Love inajitegemea (On/Off)
            if (currentReaction === 'loves') {
                updates = { loves: increment(-1) };
                delete newUserReactions[id];
            } else {
                updates = { loves: increment(1) };
                newUserReactions[id] = 'loves';
            }
        } else if (type === 'likes') {
            // Kama tayari alishalike, basi anaiondoa (Toggle)
            if (currentReaction === 'likes') {
                updates = { likes: increment(-1) };
                delete newUserReactions[id];
            }
            // Kama alikuwa ame-unlike, tunaondoa unlike na kuweka like
            else if (currentReaction === 'unlikes') {
                updates = { likes: increment(1), unlikes: increment(-1) };
                newUserReactions[id] = 'likes';
            }
            // Kama hakuwa amebonyeza chochote
            else {
                updates = { likes: increment(1) };
                newUserReactions[id] = 'likes';
            }
        } else if (type === 'unlikes') {
            if (currentReaction === 'unlikes') {
                updates = { unlikes: increment(-1) };
                delete newUserReactions[id];
            } else if (currentReaction === 'likes') {
                updates = { unlikes: increment(1), likes: increment(-1) };
                newUserReactions[id] = 'unlikes';
            } else {
                updates = { unlikes: increment(1) };
                newUserReactions[id] = 'unlikes';
            }
        }

        try {
            await updateDoc(commentRef, updates);
            setUserReactions(newUserReactions);
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {comments.map(c => (
                    <div key={c.id} style={{ background: '#161b22', padding: '15px', borderRadius: '12px', borderLeft: '4px solid var(--gold-color)', position: 'relative' }}>
                        <p style={{ margin: 0, fontSize: '14px', paddingRight: '35px', lineHeight: '1.5' }}>{c.text}</p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                            <small style={{ color: '#666' }}>{c.muda?.toDate().toLocaleString()}</small>

                            <div className="reaction-container">
                                <button onClick={() => handleReaction(c.id, 'likes')} className={`react-btn ${userReactions[c.id] === 'likes' ? 'active-like' : ''}`}>
                                    👍 <span>{c.likes || 0}</span>
                                </button>
                                <button onClick={() => handleReaction(c.id, 'unlikes')} className={`react-btn ${userReactions[c.id] === 'unlikes' ? 'active-unlike' : ''}`}>
                                    👎 <span>{c.unlikes || 0}</span>
                                </button>
                                <button onClick={() => handleReaction(c.id, 'loves')} className={`react-btn ${userReactions[c.id] === 'loves' ? 'active-love' : ''}`}>
                                    {userReactions[c.id] === 'loves' ? '❤️' : '🤍'} <span>{c.loves || 0}</span>
                                </button>
                            </div>
                        </div>

                        <button onClick={() => handleDeleteClick(c.id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', opacity: 0.6 }}>🗑️</button>
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