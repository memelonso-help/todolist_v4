// import { StyleSheet, Text, View } from 'react-native'
import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function User({ userid }) {
    // submitted files in json format
    // only post here, send response to <tasklist />

    const [loggedInUser, setLoggedInUser] = useState(userid);

    if (userid !== loggedInUser) {
        setLoggedInUser(userid);
    }

    console.log(loggedInUser);

    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value,
        };
    };

    const [formData, setFormData] = useReducer(formReducer, {});

    const handleChange = (event) => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
        console.log(formData);
    };

    async function postToBackend() {
        return axios({
            method: 'post',
            url: '/todotasks',
            data: {
                user: loggedInUser,
                task: formData.task,
                priority: formData.priority ? formData.priority : 1,
                details: formData.details,
                due_date: formData.due_date ? formData.due_date : null,
                completion_date: formData.completion_date ? formData.completion_date : null,
                completion: 'False',
            },
        });
    }

    // submit to Todotasks put request
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(loggedInUser);
        console.log(formData);

        try {
            const formPostResponse = await postToBackend();
            console.log('response here');
            console.log(formPostResponse);
            // add code to send new info to todotasklist later, it's too much man honestly
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="user-wrapper">
            <p>User</p>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <p>Task</p>
                    <input type="text" name="task" onChange={handleChange} value={formData.task || ''} required />
                    <p>Task Details</p>
                    <textarea name="details" onChange={handleChange} value={formData.details || ''} rows="5" cols="40" required />
                    <p>Due date</p>
                    <input type="date" name="due_date" onChange={handleChange} value={formData.due_date || ''} />
                    <p>Priority</p>
                    <select name="priority" onChange={handleChange} value={formData.priority || ''} required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </fieldset>
                <button type="submit">Submit form</button>
            </form>
        </div>
    );
}

// const styles = StyleSheet.create({})
User.propTypes = {
    userid: PropTypes.string.isRequired,
};
