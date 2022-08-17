import React, { useEffect } from 'react';
import Header from './Header';
import CurrentTemp from './CurrentTemp';
import Entries from './Entries';
import EntryHeader from './EntryHeader';
import EntryFooter from './EntryFooter';
import Error from './Error';
import AddEntry from './AddEntry';
import Login from './Login';
import Register from './Register';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, query, limitToLast, orderByChild, set, remove, equalTo, endBefore } from "firebase/database"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const Content = ({ apiKeys }) => {

    const [entryHeader] = useState(["Letzte Einträge", `Alle Einträge ${new Date().getFullYear()}`])
    const [headerCount, setHeaderCount] = useState(0);
    const [currentUser, setCurrentUser] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [tempList, setTempList] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [showTestDisclaimer, setShowTestDisclaimer] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [testUser] = useState('3bbcad25-c0e0-4a4d-979c-eab6ffaa7d32');
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        fetchData();

        function fetchData() {
            if((currentUser === testUser && tempList.length < 1) ||
                (currentUser && currentUser.length > 0 && currentUser !== testUser)) {
                    readLatestTemps(currentUser, !showAll);
                }

        }
    }, [currentUser]);


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

        return id;
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
    
    const readDriver = (email, password) => {
        const db = getDatabase();
        const reference = query(ref(db, `drivers`), orderByChild('email'), equalTo(email));
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            let userList = [];
            if(data === null)
                setLoginFailed(true);
            else {
                snapshot.forEach((child) => {
                    userList.push(child.val());
                });
                if(userList.length > 1)
                    console.log('UserID nicht eindeutig!');
                else {
                    bcrypt.compare(password, userList[0].hash, function(err, result) {
                        if (result)
                            setCurrentUser(userList[0]._id);
                        else 
                            setLoginFailed(true);
                    });
                }
            }
        });
    };

    const checkUserExists = async (email) => {
        const userPromise = new Promise((resolve, reject) => {
            const db = getDatabase();
            const reference = query(ref(db, `drivers`), orderByChild('email'), equalTo(email));
            onValue(reference, (snapshot) => {
                const data = snapshot.val();
                let userList = [];
                snapshot.forEach((child) => {
                    userList.push(child.val());
                });
                if(userList.length < 1) 
                    resolve(false);
                else
                    resolve(true);

            });

        });

        const returnValue = userPromise
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.log(err);
            });
        return returnValue;
    };
    
    const readLatestTemps = (driverId, withLimit = true) => {
        const db = getDatabase();
        let reference = query(ref(db, `drivers/${driverId}/temps`), orderByChild('date'));
        if(withLimit)
        {
            console.log(`withLimit | currentUser = ${currentUser} | testUser = ${testUser}`);
            reference = query(ref(db, `drivers/${driverId}/temps`), orderByChild('date'), limitToLast(3));
        }
        if(driverId === testUser)
        {
            console.log(`driverId === testUser | currentUser = ${currentUser} | testUser = ${testUser}`);
            reference = query(ref(db, `drivers/${driverId}/temps`), orderByChild('date'), endBefore(((new Date()).getTime() / 1000)-86400));
        }

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
        entry.date = (new Date().getTime()/1000);

        const newEntry = { _id, ...entry };
        if(currentUser !== testUser) {
            writeTemp(currentUser, newEntry);
            readLatestTemps(currentUser, !showAll);
        }
        else {
            setTempList([newEntry, ...tempList]);
        }
    }

    const toggleAdd = () => {
        setShowAdd(!showAdd);
    }

    const toggleAll = () => {
        setHeaderCount(headerCount + 1);
        if(currentUser !== testUser)
            readLatestTemps(currentUser, showAll);
        setShowAll(!showAll);
    }

    const toggleTestDisclaimer = () => {
        setShowTestDisclaimer(!showTestDisclaimer);
    };

    const toggleRegister = () => {
        setLoginFailed(false);
        setShowRegister(!showRegister);
    };

    const toggleStats = (showBool) => {
        setShowStats(showBool);
    };

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
            if(currentUser !== testUser)
            {
                setTempList(tempList.slice(1));
                removeTemp(currentUser, tempList[0]._id);
            }
            else
                setTempList(tempList.slice(1));
            return true;
        }
        else {
            return false;
        }
    }

    const login = (email, password) => {
        readDriver(email, password);
    };

    const logout = () => {
        setCurrentUser('');
        if(headerCount % 2 === 1)
            toggleAll();
        setShowAdd(false);
        setShowStats(false);
    }

    const getTestUser = () => {
        setCurrentUser(testUser);
    };

    const register = (email, password) => {
        console.log(email);
        const userID = writeDriver(email, bcrypt.hashSync(password, bcrypt.genSaltSync()));

        setTimeout(function () {
            setCurrentUser(userID);
        }, 1000);
    };

    return (
        currentUser ?
            <div className='content-box'>
                {
                    !showStats ? 
                        <div>
                            <div className='upper-class'>
                                <Header icon={<FiMenu />} currentPage={'home'} onLogout={logout} showStats={toggleStats} />  
                                <CurrentTemp openWeatherApiKey={apiKeys.openWeatherApiKey} />
                            </div>
                            <EntryHeader onToggleAdd={toggleAdd} entryHeader={entryHeader[headerCount%2]} />
                            { showAdd && <AddEntry onAdd={addEntry} updatedToday={updatedToday} /> }
                            <Entries entries={currentUser !== testUser ? tempList : showAll ? tempList : tempList.slice(0, 3)} />
                            <EntryFooter onDelete={deleteToday} onToggleAll={toggleAll} />
                            {
                            currentUser === testUser && showTestDisclaimer ?
                                <p className='test-disclaimer'><MdClose className='close-btn' onClick={toggleTestDisclaimer}/>Sie befinden sich in der Testversion der Anwendung. Ihnen werden zufallsgenerierte Testdaten angezeigt. 
                                    Änderungen daran werden nicht gespeichert und verschwinden beim Aktualisieren.</p>
                            :
                                <div></div>
                            }
                            <Error />
                        </div>
                    :
                        <div>
                            <div className='upper-class'>
                                <Header icon={<FiMenu />} currentPage={'stats'} onLogout={logout} showStats={toggleStats} />  
                                {/* <CurrentTemp openWeatherApiKey={apiKeys.openWeatherApiKey} /> */}
                            </div>
                        </div>
                }
            </div>
        :
            <div className='content-box'>
                <div style={{paddingBottom: '0.5em'}} className='upper-class'>
                    <Header currentPage={'login'} />
                </div>
                {
                !showRegister ? 
                    <Login onLogin={login} onTest={getTestUser} onRegister={toggleRegister} loginFailed={loginFailed} />
                :
                    <Register onLogin={toggleRegister} onRegister={register} onTest={getTestUser} userExists={checkUserExists} />
                }
                <Error />
            </div>
    );
}

Content.defaultProps = {
    title: 'Default Content Title',
}

export default Content;