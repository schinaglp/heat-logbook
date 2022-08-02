import React, { useState } from 'react';

const EntryHeader = ({ onToggleAdd, entryHeader }) => {

    const [button, setButton] = useState('+');

    const toggleButton = () => {
        if(button === '+')
            setButton(<>&mdash;</>)
        else
            setButton('+');

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