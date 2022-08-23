import React, { useState } from 'react';

const EntryFooter = ({ onDelete, onToggleAll, showAll }) => {

    const [buttonText, setButtonText] = useState(showAll ? 'Weniger anzeigen' : 'Alle anzeigen');

    const deleteToday = () => {
        if(!onDelete()) {
            alert('Heute wurde noch kein Eintrag hinzugefügt! Nichts wurde gelöscht!');
        }
    };

    const ToggleAll = () => {
        onToggleAll();
        if(showAll)
            setButtonText('Alle anzeigen')
        else
            setButtonText('Weniger anzeigen');
    };

    return (
        <div className='entry-footer'>
            <div className='footer-child' onClick={deleteToday}>Heutigen Eintrag entfernen</div>
            <div className='footer-child' onClick={ToggleAll}>{buttonText}</div>
        </div>
    );
}

export default EntryFooter;