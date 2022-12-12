// import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Task from './task';
import Pagination from './pagination';

export default function Tasklist({ userid }) {
    // submitted files in json array format
    const [loggedInUser, setLoggedInUser] = useState(userid);
    const [downloadedTaskList, setDownloadedTaskList] = useState([]);

    // set up state for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 10;
    const currentTodosDisplayed = downloadedTaskList.slice(
        (currentPage * todosPerPage) - todosPerPage,
        currentPage * todosPerPage,
    );

    if (userid !== loggedInUser) {
        setLoggedInUser(userid);
    }

    const removeTodoBackend = async (id) => {
        return axios.delete(
            `/todotasks?userid=${loggedInUser}&taskid=${id}`,
        );
    };

    const removeTodo = (id) => {
        // remove inputs where the id don't match the inputs whose delete icons have been clicked
        const removeArr = downloadedTaskList.filter((task) => {
            return task._id !== id;
        });

        removeTodoBackend(id).then((response) => {
            console.log('removeTodo', response);
        }).then(
            setDownloadedTaskList(removeArr),
        );

        // setDownloadedTaskList(removeArr);
      };

    const completeTodo = (id) => {
        const updatedTodos = downloadedTaskList.map((task) => {
            if (task._id === id) {
            console.log('this task has been completed', task);
            task.completion = !task.completion;
            }

            return task;
        });

        removeTodoBackend.then((response) => {
            console.log('completeTodo', response);
        }).then(
            setDownloadedTaskList(updatedTodos),
        );
    };

    async function getAllTasks() {
        const { data: { message } } = await axios({
            method: 'get',
            url: `/todotasks?userid=${loggedInUser}`,
        });

        setDownloadedTaskList(message);
    }

    useEffect(() => { getAllTasks(); }, []);

    const showDownloadedTaskList = () => {
        console.log(downloadedTaskList);
    };

    return (
        <div className="tasklist-wrapper">
            <p>Hey bitches this yo tasklist</p>
            <button type="button" onClick={() => { showDownloadedTaskList(); }}>
                Click to show downloaded tasklist.
            </button>
            <ol>
                {currentTodosDisplayed.map((task) => {
                    return (
                        <Task
                          key={task._id}
                          id={task._id}
                          task={task.task}
                          details={task.details}
                          completion={task.completion}
                          dueDate={task.dueDate ? task.dueDate : 'None'}
                          removeTodo={removeTodo}
                          completeTodo={completeTodo}
                        />
                    );
                    })}
            </ol>
            <Pagination
              setCurrentPage={setCurrentPage}
              totalTodos={downloadedTaskList.length}
              todosPerPage={todosPerPage}
            />
        </div>
    );
}

Tasklist.propTypes = {
    userid: PropTypes.string.isRequired,
};
