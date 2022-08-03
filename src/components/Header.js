import React from 'react';

const Header = ({ icon }) => {
    return (
        <div className='flexbox'> 
            <h1 className='header'><span style={{color:'#EC8656'}}>Hitze</span> Logbuch</h1>
            <div className='header icon'>{ icon }</div>
        </div>
    );
}

Header.defaultProps = {
    title: 'Default Header Title',
}

export default Header;