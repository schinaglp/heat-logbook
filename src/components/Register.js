import React from 'react';
import { useState } from 'react';
import { MdSupervisorAccount } from 'react-icons/md'
import { HiCode } from 'react-icons/hi'

const Register = ({ onLogin, onRegister }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRep, setPasswordRep] = useState('');
    const [error, setError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if(password === passwordRep)
        {
            let matches = password.match(/\d+/g);
            if(password.length < 8)
                setError('Passwort muss länger als 8 Zeichen sein!');
            else if(password.includes(' '))
                setError('Passwort darf kein Leerzeichen beinhalten!');
            else if(matches === null)
                setError('Passwort muss mindestens eine Zahl beinhalten!')
            else
            {
                setError('');
                onRegister(email, password);
            }
        }
        else
            setError('Passwörter nicht identisch!');


        setPassword('');
        setPasswordRep('');
    }

    return (
        <div>
            <h1 className='login-header'>Registrieren</h1>
            <form className='login-form' onSubmit={onSubmit}>
                <div className='login-input'>
                    <label htmlFor="login-email" className='login-label'>E-Mail</label><br />
                    <input type="email" id="login-email" name="email" required value={email} onChange={e => {setEmail(e.target.value)}}/><br />
                    <label htmlFor="login-password" className='login-label'>Passwort</label><br />
                    <input type="password" id="login-password" name="password" value={password} onChange={e => {setPassword(e.target.value)}}/>
                    <label htmlFor="login-password-rep" className='login-label'>Passwort wiederholen</label><br />
                    <input type="password" id="login-password-rep" name="password-rep"  value={passwordRep} onChange={e => {setPasswordRep(e.target.value)}}/>
                    <p className='login-failed'>{error}</p>
                </div>

                <div className='submit-form'>
                    <input type="submit" value='Registrieren' className='submit-btn' />
                </div>
            </form>

            <div className='register-link-message'>
                <MdSupervisorAccount className='login-icon' /> 
                <div className='register-text'>Bereits ein Konto? <span className='register-link' onClick={onLogin}>Login</span></div>
            </div>

            <div className='register-link-message'>
                <HiCode className='login-icon' /> 
                <div className='register-text'>Unschlüssig? <span className='register-link'>Testversion</span></div>
            </div>
        </div>
    );
  };

  export default Register;