import React, { useState } from 'react';

const EntryFooter = ({ onDelete, onToggleAll }) => {

    const [buttonText, setButtonText] = useState(["Alle anzeigen", "Weniger anzeigen"]);
    const [buttonCount, setButtonCount] = useState(0);

    const deleteToday = () => {
        if(!onDelete()) {
            alert('Heute wurde noch kein Eintrag hinzugefügt! Nichts wurde gelöscht!');
        }
    };

    const ToggleAll = () => {
        onToggleAll();
        setButtonCount(buttonCount + 1);
    };

    return (
        <div className='entry-footer'>
            <div className='footer-child' onClick={deleteToday}>Heutigen Eintrag entfernen</div>
            <div className='footer-child' onClick={ToggleAll}>{buttonText[buttonCount%2]}</div>
        </div>
    );
}

export default EntryFooter;