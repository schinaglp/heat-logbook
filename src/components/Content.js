import React, { useEffect } from 'react';
import Header from './Header';
import CurrentTemp from './CurrentTemp';
import Entries from './Entries';
import EntryHeader from './EntryHeader';
import EntryFooter from './EntryFooter';
import Error from './Error';
import AddEntry from './AddEntry';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi'
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, query, limitToLast, orderByChild, set, remove } from "firebase/database"
import { v4 as uuidv4 } from 'uuid';

const Content = ({ apiKeys }) => {

    useEffect(() => {
        fetchData();

        function fetchData() {
            readLatestTemps(currentUser, !showAll);
        }
    }, []);

    const [entryHeader, setEntryHeader] = useState(["Letzte Einträge", `Alle Einträge ${new Date().getFullYear()}`])
    const [headerCount, setHeaderCount] = useState(0);
    const [currentUser, setCurrentUser] = useState("c860d359-f598-4cee-8025-cc4510267854");
    // const [currentUser, setCurrentUser] = useState("123");
    const [showAdd, setShowAdd] = useState(false);
    const [tempList, setTempList] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const firebaseConfig = {
        apiKey: apiKeys.firebaseApiKey,
        authDomain: "hitzelogbuch.firebaseapp.com",
        databaseURL: "https://hitzelogbuch-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "hitzelogbuch",
        storageBucket: "hitzelogbuch.appspot.com",
        messagingSenderId: "38401268137",
        appId: "1:38401268137:web:8be0b912d2da774bff8cb8"
    };
      
    const app = initializeApp(firebaseConfig);

    const writeDriver = (email, hash, id = uuidv4()) => {
        const db = getDatabase();
        const reference = ref(db, 'drivers/' + id);
        
        set(reference, {
            _id: id,
            email: email,
            hash: hash,
            temps: {}
        });
    };
    
    const writeTemp = (driverId, entry) => {
        const db = getDatabase();
        const reference = ref(db, `drivers/${driverId}/temps/${entry._id}`);
        
        set(reference, {
            _id: entry._id,
            feedback: entry.feedback,
            temp: entry.temp,
            date: entry.date
        });
    };
    
    const readDriver = (driverId) => {
        const db = getDatabase();
        const reference = ref(db, `drivers/${driverId}`);
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            if(data === null)
                console.log(`Keinen Eintrag mit der ID ${driverId} gefunden.`);
            else {
                console.log(data);
            }
        });
    };
    
    const readLatestTemps = (driverId, withLimit = true) => {
        const db = getDatabase();
        let reference = query(ref(db, `drivers/${driverId}/temps`), orderByChild('date'));
        if(withLimit)
            reference = query(ref(db, `drivers/${driverId}/temps`), orderByChild('date'), limitToLast(3));
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            let newTempList = [];
            if(data === null)
                console.log(`Keinen Eintrag mit der ID ${driverId} gefunden.`);
            else {
                snapshot.forEach((child) => {
                    newTempList.push(child.val());
                });
                setTempList(newTempList.reverse());
            }
        });
    };
    
    const removeTemp = (driverId, tempId) => {
        const db = getDatabase();
        let reference = ref(db, `drivers/${driverId}/temps/${tempId}`);
        remove(reference);
        readLatestTemps(currentUser, !showAll);
    };


    const addEntry = (entry) => {
        const _id = uuidv4();
        entry.date = (new Date().getTime())/1000;

        const newEntry = { _id, ...entry };
        writeTemp(currentUser, newEntry);
        readLatestTemps(currentUser, !showAll);
    }

    const toggleAdd = () => {
        setShowAdd(!showAdd);
    }

    const toggleAll = () => {
        setHeaderCount(headerCount + 1);
        readLatestTemps(currentUser, showAll);
        setShowAll(!showAll);
    }

    const checkEntryToday = (entry) => {
        if(new Date(entry.date*1000).getDate() === new Date().getDate() && 
           new Date(entry.date*1000).getMonth() === new Date().getMonth() &&
           new Date(entry.date*1000).getFullYear() === new Date().getFullYear()) {
            return true;
        }
        else {
            return false;
        }
    }

    const updatedToday = () => {
        if(tempList.length < 1)
            return false;
        else if(checkEntryToday(tempList[0])) {
            return true;
        }
        else {
            return false;
        }
    }

    const deleteToday = () => {
        if(tempList.length < 1)
            return false;
        else if(checkEntryToday(tempList[0])) {
            removeTemp(currentUser, tempList[0]._id);
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <div className='content-box'>
            <div className='upper-class'>
                <Header title='Hitze Lokbuch' icon={<FiMenu />} />  
                <CurrentTemp openWeatherApiKey={apiKeys.openWeatherApiKey} />
            </div>
            <EntryHeader onToggleAdd={toggleAdd} entryHeader={entryHeader[headerCount%2]} />
            { showAdd && <AddEntry onAdd={addEntry} updatedToday={updatedToday} /> }
            <Entries entries={tempList} />
            <EntryFooter onDelete={deleteToday} onToggleAll={toggleAll} />
            <Error />
        </div>
    );
}

Content.defaultProps = {
    title: 'Default Content Title',
}

export default Content;