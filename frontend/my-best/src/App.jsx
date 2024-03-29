import {
    BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import Popup from 'reactjs-popup';

import Login from './components/auth/login';
// import settings from './components/auth/settings';
import Signup from './components/auth/signup';
// import Loginmaster from './components/auth/loginmaster';

// import Completedtasks from './components/consumer/completedtasks';
import Tasklist from './components/consumer/tasklist';
import User from './components/consumer/user';
// import useToken from './components/consumer/useToken';
// import useUser from './components/consumer/useUser';

function App() {
    // get JWT token from flask
    // const [token, setToken] = useState(useToken());
    // const [user, setUser] = useState(useUser());

    const [token, setToken] = useState(() => {
        const targetToken = JSON.parse(localStorage.getItem('token'));
        return targetToken || '';
    });

    const [user, setUser] = useState(() => {
        const targetUser = JSON.parse(localStorage.getItem('username'));
        return targetUser || '';
    });

    const handleLogout = () => {
        // localStorage.clear();
        setToken('');
        setUser('');
        return (
            <Popup>
                <div className="Popup-Logout-Message">
                    You have logged out successfully.
                </div>
            </Popup>
        );
    };

    console.log(token, user);

    useEffect(() => {
        // if token is added, add to localstorage, same with user
        // if token is removed, remove user too
        // may want to allow token to refresh on backend side
        console.log('token', token, 'userid', user);
        console.log('localstorage bef:', localStorage?.getItem('token'), localStorage?.getItem('username'));
        try {
            console.log('localstorage bef:', localStorage?.getItem('token'), localStorage?.getItem('username'));

            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('username', JSON.stringify(user));

            console.log('localstorage aft:', localStorage?.getItem('token'), localStorage?.getItem('username'));
        } catch (error) {
            console.log(error);
        }
    }, [token, user]);

    if (!token) {
        return (
            <div className="App">
                {/* <Login setToken={setToken} setUser={setUser} /> */}
                <BrowserRouter>
                    <div className="Routes-NavBar">
                        <nav>
                            <ul>
                                <li className="Route-Block"><Link to="/login">Login</Link></li>
                                <li className="Route-Block"><Link to="/signup">Signup</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <Routes>
                        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
                        <Route path="/signup" element={<Signup setToken={setToken} setUser={setUser} />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }

    return (
        <div className="App">
            <BrowserRouter>
                <div className="Routes-NavBar">
                    <nav>
                        <ul>
                            <li className="Route-Block"><Link to="/">Submit task</Link></li>
                            <li className="Route-Block"><Link to="/tasklist">Tasklist</Link></li>
                            <li className="Route-Block"><Link to="/login">Login</Link></li>
                            <li className="Route-Block">
                                <button type="button" onClick={handleLogout} className="Logout-Button">
                                    Logout
                                </button>
                            </li>
                            {/* <li><Link to="/completedtasks">Completed tasks</Link></li> */}
                        </ul>
                    </nav>
                </div>
                <Routes>
                    <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
                    <Route path="/signup" element={<Signup setToken={setToken} setUser={setUser} />} />
                    <Route path="/" element={<User userid={user} />} />
                    <Route path="/user" element={<User userid={user} />} />
                    <Route path="/tasklist" element={<Tasklist userid={user} />} />
                    {/* <Route path="/completedtasks" element={<Completedtasks />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
