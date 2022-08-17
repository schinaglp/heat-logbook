import React from 'react';
import { useState } from 'react';

const Header = ({ icon, currentPage, onLogout, showStats }) => {

    const [showNavbar, setShowNavbar] = useState(false);

    const toggleNavbar = () => {
        setShowNavbar(!showNavbar);
    }

    const logout = () => {
        setShowNavbar(false);
        onLogout();
    };

    return (
        <div className='header'>
            <div className='flexbox'> 
                <h1 className='header-name'><span style={{color:'#EC8656'}}>Hitze</span> Logbuch</h1>
                {
                    currentPage !== 'login' ?
                        <div className='header-name icon' onClick={toggleNavbar}>{ icon }</div>
                    :
                        <div></div>
                }
            </div>
            {
                showNavbar ?
                    <div>
                        <div className='arrow-up'></div>
                        <div className={ currentPage === 'stats' ? 'navbar navbar-stats' : 'navbar' }>
                            <p className={ currentPage === 'home' ? 'navbar-active navbar-element' : 'navbar-element' } onClick={() => showStats(false)}>Start</p>
                            <p className={ currentPage === 'stats' ? 'navbar-active navbar-element' : 'navbar-element' } onClick={() => showStats(true)}>Statistik</p>
                            <p className='navbar-element' onClick={logout}>Logout</p>
                        </div>
                    </div>
                :
                <div></div>
            }
        </div>
    );
}

Header.defaultProps = {
    title: 'Default Header Title',
}

export default Header;