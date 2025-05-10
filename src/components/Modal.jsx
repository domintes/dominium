import React, { useEffect, useState } from 'react';
import '../styles/modal.scss';

export default function Modal(props) {
    const { children, onClose } = props;

    /* eslint-disable-next-line no-unused-vars */
    const [data, setData] = useState(props ? props : null);

    useEffect(() => {
        
    }, []);

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal__close-btn" onClick={onClose}>
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
}
