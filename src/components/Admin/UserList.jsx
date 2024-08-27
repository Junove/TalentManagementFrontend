import React, { useState } from 'react';

import { Pagination } from './Pagination';

export function UserList(parameters) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const onItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = parameters.users.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <table className="user-table">            
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role Type</th>
                    </tr>
                </thead>
                
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr 
                            key={index} onClick={() => parameters.handleListClick(user)}
                            className="user-row"
                        >
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <Pagination
                totalItems={parameters.users.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={onItemsPerPageChange}
            />
        </div>
    );
}