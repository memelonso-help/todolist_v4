import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from './login';
import Signup from './signup';

export default function Loginmaster({ setToken, setUser }) {
    return (
        <div className="loginmaster-wrapper">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
                    <Route path="/signup" element={<Signup setToken={setToken} setUser={setUser} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
Loginmaster.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
};
