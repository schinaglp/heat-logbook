import React from 'react';
import { useState } from 'react';
import { MdSupervisorAccount } from 'react-icons/md'
import { HiCode } from 'react-icons/hi'

const Login = ({ onLogin, onTest, onRegister, loginFailed }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()

        onLogin(email, password);

        setEmail('');
        setPassword('');
    }

    return (
        <div>
            <h1 className='login-header'>Login</h1>
            <form className='login-form' onSubmit={onSubmit}>
                <div className='login-input'>
                    <label htmlFor="login-email" className='login-label'>E-Mail</label><br />
                    <input type="email" id="login-email" name="email" required value={email} onChange={e => {setEmail(e.target.value)}}/><br />
                    <label htmlFor="login-password" className='login-label'>Passwort</label><br />
                    <input type="password" id="login-password" name="password" value={password} onChange={e => {setPassword(e.target.value)}}/>
                    {
                        loginFailed ?
                            <p className='login-failed'>E-Mail oder Password falsch!</p>
                        :
                            <div></div>
                    }
                </div>


                <div className='submit-form'>
                    <input type="submit" value='Login' className='submit-btn' />
                </div>
            </form>

            <div className='register-link-message'>
                <MdSupervisorAccount className='login-icon' /> 
                <div className='register-text'>Noch kein Konto? <span className='register-link' onClick={onRegister}>Registrieren</span></div>
            </div>

            <div className='register-link-message'>
                <HiCode className='login-icon' /> 
                <div className='register-text'>Unschlüssig? <span className='register-link' onClick={onTest}>Testversion</span></div>
            </div>
        </div>
    );
  };

  export default Login;