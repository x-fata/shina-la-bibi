import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import BoxMwanafamilia from '../components/BoxMwanafamilia';
import MwanafamiliaForm from '../components/MwanafamiliaForm';

function MemberProfilePage() {
    const { id } = useParams();
    const [member, setMember] = useState(null);
    const [children, setChildren] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [formMode, setFormMode] = useState('add');
    const [activeParentId, setActiveParentId] = useState(id);

    useEffect(() => {
        const fetchMember = async () => {
            const docRef = doc(db, "wanachama", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setMember({ id: docSnap.id, ...docSnap.data() });
            }
        };
        fetchMember();
    }, [id]);

    useEffect(() => {
        const q = query(collection(db, "wanachama"), where("parentId", "==", id));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            setChildren(data);
        });
        return () => unsubscribe();
    }, [id]);

    if (!member) return <div className="container">Inapakia...</div>;

    return (
        <div className="container">
            <Link to={-1} style={{ color: 'var(--gold-color)', textDecoration: 'none', fontSize: '12px' }}>← KURUDI NYUMA</Link>

            <div className={member.hali === 'marehemu' ? 'card-dead' : 'card-alive'} style={{ marginTop: '15px', textAlign: 'center' }}>
                <h1 className={member.hali === 'marehemu' ? 'name-dead' : 'name-alive'} style={{ fontSize: '1.5rem' }}>{member.jina}</h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{member.mahali} | {member.contact}</p>
                <button onClick={() => { setActiveParentId(id); setFormMode('add'); setSelectedMember(null); setIsFormOpen(true); }} style={btnOngezaStyle}> ONGEZA MTOTO + </button>
            </div>

            <div style={{ marginTop: '30px' }}>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--gold-color)', borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>WATOTO WA {member.jina}</h3>
                {children.map((child) => (
                    <BoxMwanafamilia
                        key={child.id}
                        jina={child.jina}
                        hali={child.hali}
                        jinsia={child.jinsia}
                        link={`/member/${child.id}`}
                        onAdd={() => { setActiveParentId(child.id); setFormMode('add'); setSelectedMember(null); setIsFormOpen(true); }}
                        onEdit={() => { setSelectedMember(child); setFormMode('edit'); setIsFormOpen(true); }}
                    />
                ))}
            </div>

            <MwanafamiliaForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} parentId={activeParentId} existingData={selectedMember} mode={formMode} />
        </div>
    );
}

const btnOngezaStyle = { marginTop: '15px', background: 'var(--gold-color)', border: 'none', borderRadius: '5px', padding: '8px 20px', cursor: 'pointer', fontWeight: 'bold' };

export default MemberProfilePage;