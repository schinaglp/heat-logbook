import React from 'react';
import { FaSnowflake } from 'react-icons/fa'
import { HiThumbUp } from 'react-icons/hi'
import { FaHotjar } from 'react-icons/fa'
import { useState } from 'react';

const AddEntry = ({ onAdd, updatedToday }) => {

    const [temp, setTemp] = useState('');
    const [feedback, setFeedback] = useState();

    const onSubmit = (e) => {
        e.preventDefault()

        if(updatedToday()) {
            alert('Es wurde heute bereits eine Temperatur eingetragen!')
            return
        }
    
        if (!temp) {
          alert('Es wurde keine Temperatur eingetragen!')
          return
        }
        if (feedback !== 0 && feedback !== 1 && feedback !==2) {
          alert('Es wurde kein Temperatur-Feedback eingetragen!')
          return
        }
        if (temp > 70 || temp < -30) {
            alert('Temperaturen können nur im Bereich zwischen -30°C und 70°C eingetragen werden!')
            return
        }
    
        onAdd({ temp, feedback });
    
        setTemp('')
        setFeedback(-1)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='icon-disclaimer'>
                Ist es kalt, angenehm oder heiß?
            </div>
            <div className='add-input'>
                <div className='add-temp'>
                    <input className='add-temp-form' type='number' value={temp} onChange={e => setTemp(e.target.value)} step={0.1} placeholder='21.0&deg;C'/>
                </div>
                <div className='add-feedback'>
                    <label htmlFor='radio-snowflake'>
                        <input type='radio' id='radio-snowflake' name='feedback' value={feedback} onClick={e => {setFeedback(0)}} />
                        <FaSnowflake className={feedback === 0 ? 'green-text radio-icon' : 'radio-icon'} />
                    </label>
                    <label htmlFor='radio-thumb'>
                        <input type='radio' id='radio-thumb' name='feedback' value={feedback} onClick={e => {setFeedback(1)}}/>
                        <HiThumbUp className={feedback === 1 ? 'green-text radio-icon' : 'radio-icon'} />
                    </label>
                    <label htmlFor='radio-flame'>
                        <input type='radio' id='radio-flame' name='feedback' value={feedback} onClick={e => {setFeedback(2)}}/>
                        <FaHotjar className={feedback === 2 ? 'green-text radio-icon' : 'radio-icon'} />
                    </label>
                </div>   
            </div>

            <div className='submit-form'>
                <input type="submit" value='Speichern' className='submit-btn' />
            </div>
        </form>
    );
}

export default AddEntry;