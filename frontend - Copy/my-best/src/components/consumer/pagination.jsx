import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

export default function Pagination({
    setCurrentPage,
    totalTodos,
    todosPerPage,
}) {
    const todosPageAmount = [];

    for (
        let i = 1;
        i <= Math.ceil(totalTodos / todosPerPage);
        i += 1
    ) {
        todosPageAmount.push(i);
    }

    return (
        <div className="Page-Navbarblock">
            {/* <div className="PostsPerPage-setter">
                <select name="Number-of-posts" onClick={handleClick} defaultValue="10">
                    <option value="10">10</option>
                    <option value="5">5</option>
                </select>
            </div> */}
            <nav>
                <ul className="Page-list">
                    {todosPageAmount.map(
                        (pageNumber) => {
                            return (
                                <li
                                  className="Page-block"
                                  key={pageNumber}
                                >
                                    <button
                                      type="button"
                                      to="#"
                                      className="Page-link"
                                      onClick={() => { setCurrentPage(pageNumber); }}
                                    >
                                        {pageNumber}
                                    </button>
                                </li>
                            );
                        },
                    )}
                </ul>
            </nav>
        </div>
    );
}

Pagination.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    totalTodos: PropTypes.number.isRequired,
    todosPerPage: PropTypes.number.isRequired,
};
