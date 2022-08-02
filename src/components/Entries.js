import React from 'react';
import Entry from './Entry';

const Entries = ({ entries }) => {

    const monthNames = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

    const shortList = entries.map((e) => (
                        <Entry key={e._id} entry={e} />
                      ));

    let lastEntry = {
        date: 0
    }
    const longList = entries.map((e) => {
                        if((new Date(e.date*1000)).getMonth() !== (new Date(lastEntry.date*1000)).getMonth()) {
                            lastEntry = e;
                            return <div key={e._id}><h2 className='month-name'>{monthNames[(new Date(e.date*1000)).getMonth()]}</h2> <Entry entry={e} /></div>
                        }
                          
                        lastEntry = e;
                        return <Entry key={e._id} entry={e} />
                     });

    return (
        Object.keys(entries).length <= 3 ?
            <div className='temp-container'>
                { shortList }
            </div>
        :
            <div className='temp-container'>
                { longList }
            </div>
    );
}

export default Entries;