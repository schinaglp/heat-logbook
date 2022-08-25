import React, { useState } from 'react';

const EntryHeader = ({ onToggleAdd, entryHeader, showAdd, noPlus }) => {

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
            {
            noPlus ?
                <div></div>
            :
                <div className='add-btn' onClick={toggleButton}>{ button }</div>
            }
        </div>
    );
}

EntryHeader.defaultProps = {
    noPlus: false,
  }

export default EntryHeader;