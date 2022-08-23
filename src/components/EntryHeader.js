import React, { useState } from 'react';

const EntryHeader = ({ onToggleAdd, entryHeader, showAdd }) => {

    const [button, setButton] = useState(showAdd ? <>&mdash;</> : '+');

    const toggleButton = () => {
        if(showAdd)
            setButton('+');
        else
            setButton(<>&mdash;</>)


        onToggleAdd();
    }

    return (
        <div className='entry-header'>
            <div><strong>{ entryHeader }</strong></div>
            <div className='add-btn' onClick={toggleButton}>{ button }</div>
        </div>
    );
}

export default EntryHeader;