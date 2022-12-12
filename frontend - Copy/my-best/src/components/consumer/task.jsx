import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiTickOutline } from 'react-icons/ti';

export default function Task({
    id, task, details, completion, dueDate, removeTodo, completeTodo,
}) {
    // write up a custom component to display your data
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="dropdown">
            <button type="button" key={id} onClick={() => { handleOpen(); }}>
                {task}
            </button>
            <input type="checkbox" name={id} value={completion} />
            <TiTickOutline className="completion-icon" onClick={() => { completeTodo(id); }} />
            <RiCloseCircleLine className="delete-icon" onClick={() => { removeTodo(id); }} />
            {open ? (
                <div className="task-elaborate">
                    <p>
                        Details:
                        {details}
                    </p>
                    <p>
                        Due_date:
                        {dueDate}
                    </p>
                </div>
                ) : null}
        </div>
    );
}

Task.propTypes = {
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    completion: PropTypes.bool.isRequired,
    dueDate: PropTypes.string.isRequired,
    removeTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
};
