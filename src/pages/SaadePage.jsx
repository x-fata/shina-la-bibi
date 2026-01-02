import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BoxMwanafamilia from '../components/BoxMwanafamilia';
import MwanafamiliaForm from '../components/MwanafamiliaForm';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from "firebase/firestore";

function SaadePage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState('add');
    const [selectedParentId, setSelectedParentId] = useState('SAADE_ROOT');
    const [selectedMember, setSelectedMember] = useState(null);
    const [waumeWapya, setWaumeWapya] = useState([]);

    // Logic ya Read More
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const q = query(collection(db, "wanachama"), where("parentId", "==", "SAADE_ROOT"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            setWaumeWapya(data);
        });
        return () => unsubscribe();
    }, []);

    const openAddForm = (parentId) => {
        setSelectedParentId(parentId);
        setFormMode('add');
        setSelectedMember(null);
        setIsFormOpen(true);
    };

    const openEditForm = (member) => {
        setSelectedMember(member);
        setFormMode('edit');
        setIsFormOpen(true);
    };

    // Sample ya Historia (Unaweza kuibadilisha baadae)
    const historiaFull = `Ukoo wa Bisaade una asili ya kipekee inayopatikana katika mizizi ya udugu na upendo. Saade Bint Hamad, akiwa kama shina kuu, alisimama kama mhimili wa hekima na mwongozo kwa kizazi chake. Historia inatueleza kuwa ukoo huu ulianza kupata umaarufu kutokana na juhudi za kilimo na biashara, lakini zaidi sana, kutokana na moyo wa ukarimu ambao Bibi Saade aliuasisi. Kila tawi unaloliona leo ni matokeo ya malezi bora na misingi imara ya kidini na kijamii. Mpaka leo, jina Bisaade linabaki kuwa alama ya umoja, likiunganisha matawi mbalimbali yaliyotanda maeneo mengi, huku yote yakirejea kwenye shina hili moja imara la Bibi Saade. Ni stori ya uvumilivu, mafanikio, na zaidi ya yote, upendo usio na kifani.`;

    const historiaShort = historiaFull.substring(0, 150) + "...";

    return (
        <div className="container">
            <Link to="/" style={{ color: 'var(--gold-color)', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>← RUDI MWANZO</Link>

            {/* Kadi Kuu ya Bibi - Maboksi ya pembeni yameondolewa, imebaki Logo/Jina tu */}
            <div className="card-dead" style={{ marginTop: '15px', textAlign: 'center', border: '1px solid rgba(212, 175, 55, 0.2)', padding: '30px 15px' }}>
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>🌿</div> {/* Hapa unaweza kuweka <img> ya Logo yako */}
                <h1 className="name-dead" style={{ fontSize: '1.8rem', color: 'var(--gold-color)', margin: '0' }}>SAADE BINT HAMAD</h1>
                <p style={{ color: '#888', fontSize: '0.9rem', letterSpacing: '2px' }}>SHINA KUU LA UKOO</p>
                <button onClick={() => openAddForm('SAADE_ROOT')} style={btnOngezaMain}> ONGEZA MUME/TAWI + </button>
            </div>

            {/* SEHEMU MPYA: HISTORIA YA UKOO WA BISAADE */}
            <div style={{ marginTop: '25px', background: '#161b22', padding: '20px', borderRadius: '15px', border: '1px solid #30363d' }}>
                <h3 style={{ color: 'var(--gold-color)', fontSize: '1rem', marginTop: '0', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                    HISTORIA YA UKOO WA BISAADE
                </h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#e6edf3', textAlign: 'justify' }}>
                    {isExpanded ? historiaFull : historiaShort}
                </p>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{ background: 'none', border: 'none', color: 'var(--gold-color)', fontWeight: 'bold', cursor: 'pointer', padding: '0', fontSize: '13px' }}
                >
                    {isExpanded ? "Onyesha kidogo ↑" : "Soma zaidi ↓"}
                </button>
            </div>

            {/* Orodha ya Waume/Matawi */}
            <div style={{ marginTop: '35px' }}>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--gold-color)', borderBottom: '1px solid #30363d', paddingBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Waume & Matawi ya Saade
                </h3>
                {waumeWapya.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>Hakuna tawi lililosajiliwa bado.</p>
                ) : (
                    waumeWapya.map((mme) => (
                        <BoxMwanafamilia
                            key={mme.id}
                            jina={mme.jina}
                            hali={mme.hali}
                            jinsia={mme.jinsia}
                            link={`/member/${mme.id}`}
                            onAdd={() => openAddForm(mme.id)}
                            onEdit={() => openEditForm(mme)}
                        />
                    ))
                )}
            </div>

            <MwanafamiliaForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                parentId={selectedParentId}
                existingData={selectedMember}
                mode={formMode}
            />
        </div>
    );
}

const btnOngezaMain = {
    marginTop: '20px',
    background: 'var(--gold-color)',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'black',
    fontSize: '13px',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)'
};

export default SaadePage;