import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

function MwanafamiliaForm({ isOpen, onClose, parentId, existingData, mode }) {
    const [formData, setFormData] = useState({
        jina: "", hali: "hai", mahali: "", contact: "", maelezo: "",
        jinsia: "mwanaume"
    });

    const [loading, setLoading] = useState(false);
    const [showSecurity, setShowSecurity] = useState(false);
    const [password, setPassword] = useState("");
    const [pendingAction, setPendingAction] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    useEffect(() => {
        if (mode === 'edit' && existingData) {
            setFormData(existingData);
        } else {
            setFormData({ jina: "", hali: "hai", mahali: "", contact: "", maelezo: "", jinsia: "mwanaume" });
        }
    }, [mode, existingData, isOpen]);

    if (!isOpen) return null;

    const showToast = (msg, type = "success") => {
        setToast({ show: true, message: msg, type: type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    };

    const triggerSecurity = (action) => {
        setPendingAction(action);
        setShowSecurity(true);
    };

    const handleVerifyAndProceed = async () => {
        if (password !== "unga-udugu") {
            showToast("Neno la siri si sahihi!", "error");
            return;
        }
        setShowSecurity(false);
        setPassword("");

        if (pendingAction === 'save') await executeSave();
        else if (pendingAction === 'delete') await executeDelete();
    };

    const executeSave = async () => {
        setLoading(true);
        try {
            if (mode === 'add') {
                await addDoc(collection(db, "wanachama"), { ...formData, parentId, muda: new Date() });
                showToast("Mwanafamilia ameongezwa!");
            } else {
                const { id, ...updateData } = formData;
                await updateDoc(doc(db, "wanachama", existingData.id), updateData);
                showToast("Taarifa zimeboreshwa.");
            }
            setTimeout(onClose, 1500);
        } catch (err) {
            showToast("Tatizo la kuhifadhi.", "error");
        } finally {
            setLoading(false);
        }
    };

    const executeDelete = async () => {
        setLoading(true);
        try {
            await deleteDoc(doc(db, "wanachama", existingData.id));
            showToast("Taarifa zimefutwa!", "success");
            setTimeout(onClose, 1500);
        } catch (err) {
            showToast("Imeshindikana kufuta.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={overlayStyle}>
            {/* TOAST MPYA: Inatumia class ya CSS na iko nje ya form ili isifichwe */}
            {toast.show && (
                <div className="toast-box" style={{ background: toast.type === 'error' ? '#8b0000' : 'var(--gold-color)' }}>
                    {toast.message}
                </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); triggerSecurity('save'); }} style={formStyle}>
                <h3 style={{ color: 'var(--gold-color)', marginBottom: '15px', textAlign: 'center', fontSize: '1.2rem' }}>
                    {mode === 'add' ? 'SAJILI MWANAFAMILIA' : 'REKEBISHA KUMBUKUMBU'}
                </h3>

                <label style={labelStyle}>JINA KAMILI:</label>
                <input type="text" required style={inputStyle} value={formData.jina} onChange={(e) => setFormData({ ...formData, jina: e.target.value })} />

                <label style={labelStyle}>HALI:</label>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                    <label style={{ fontSize: '13px', cursor: 'pointer' }}>
                        <input type="radio" value="hai" checked={formData.hali === 'hai'} onChange={(e) => setFormData({ ...formData, hali: e.target.value })} /> Hai
                    </label>
                    <label style={{ fontSize: '13px', cursor: 'pointer' }}>
                        <input type="radio" value="marehemu" checked={formData.hali === 'marehemu'} onChange={(e) => setFormData({ ...formData, hali: e.target.value })} /> Marehemu
                    </label>
                </div>

                <label style={labelStyle}>JINSIA:</label>
                <select style={inputStyle} value={formData.jinsia} onChange={(e) => setFormData({ ...formData, jinsia: e.target.value })}>
                    <option value="mwanaume">Mwanaume</option>
                    <option value="mwanamke">Mwanamke</option>
                </select>

                <label style={labelStyle}>MAHALI / CONTACT:</label>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <input type="text" placeholder="Mahali" style={inputStyle} value={formData.mahali} onChange={(e) => setFormData({ ...formData, mahali: e.target.value })} />
                    <input type="text" placeholder="Simu" style={inputStyle} value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
                </div>

                <label style={labelStyle}>MAELEZO MAFUPI:</label>
                <textarea style={{ ...inputStyle, height: '60px' }} value={formData.maelezo} onChange={(e) => setFormData({ ...formData, maelezo: e.target.value })} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="button" onClick={onClose} style={btnSecondary}>Funga</button>
                        <button type="submit" disabled={loading} style={btnPrimary}>{loading ? 'Inasindika...' : 'HIFADHI'}</button>
                    </div>
                    {mode === 'edit' && <button type="button" onClick={() => triggerSecurity('delete')} style={btnDelete}>FUTA MWANACHAMA</button>}
                </div>

                {showSecurity && (
                    <div style={securityOverlayStyle}>
                        <div style={securityBoxStyle}>
                            <h4 style={{ color: 'var(--gold-color)' }}>ANGALIZO</h4>
                            <p style={{ fontSize: '12px' }}>Weka neno la siri ili kuthibitisha udugu.</p>
                            <input type="password" autoFocus style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button type="button" onClick={() => setShowSecurity(false)} style={btnSecondary}>Ghairi</button>
                                <button type="button" onClick={handleVerifyAndProceed} style={btnPrimary}>Thibitisha</button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

// STYLES
const overlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const formStyle = { background: '#161b22', padding: '20px', borderRadius: '15px', width: '90%', maxWidth: '400px', border: '1px solid #30363d', color: 'white', position: 'relative' };
const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #30363d', background: '#0d1117', color: 'white', boxSizing: 'border-box', fontSize: '14px' };
const labelStyle = { fontSize: '11px', color: '#8b949e', marginBottom: '5px', display: 'block' };
const btnPrimary = { flex: 1, padding: '10px', background: 'var(--gold-color)', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' };
const btnSecondary = { flex: 1, padding: '10px', background: '#333', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' };
const btnDelete = { padding: '8px', background: 'transparent', color: '#ff4444', border: '1px solid #ff4444', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' };
const securityOverlayStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(13, 17, 23, 0.95)', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1001, padding: '20px' };
const securityBoxStyle = { width: '100%', textAlign: 'center' };

export default MwanafamiliaForm;