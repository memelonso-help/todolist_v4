import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export async function getUser(form, urllink) {
    return axios({
        method: 'post',
        url: `/${urllink}`,
        data: {
            user: form.user,
            password: form.password,
        },
    });
}

export async function getToken(username) {
    return axios({
        method: 'post',
        url: '/genJWT',
        data: {
            user: username,
        },
    });
}

export default function Login({ setToken, setUser }) {
    // console.log(typeof (setToken), typeof (setUser));
    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value,
        };
    };

    const [formData, setFormData] = useReducer(formReducer, {});

    // send data to API here
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const returnedUser = await getUser(formData, 'login');
            // console.log(returnedUser, typeof (returnedUser), returnedUser.data.username);
            if (returnedUser.data.username) {
                setUser(returnedUser.data.username);
                console.log('FKING LOGGED IN BITCH');

                try {
                    const returnedToken = await getToken(formData);
                    console.log(returnedToken.data.token);
                    if (returnedToken.data.token) {
                        setToken(returnedToken.data.token);
                        console.log('FKING GOT MI TOKEN MFKER');
                    } else {
                        console.log(returnedToken.data.message);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log(returnedUser.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    };

    return (
        <div className="login-wrapper">
            <h1>Login credentials</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <p>Username</p>
                    <input type="text" name="user" onChange={handleChange} value={formData.user || ''} />
                    <p>Password</p>
                    <input type="password" name="password" onChange={handleChange} value={formData.password || ''} />
                </fieldset>
                <button type="submit">Submit form</button>
            </form>
            <a href="/signup">Have not registered? Click here to signup</a>
        </div>
    );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
};
