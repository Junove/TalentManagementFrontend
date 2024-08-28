import React, { useState } from 'react';

import { Pagination } from './Pagination';
import Tooltip from '@mui/material/Tooltip';
import { Alert } from '@mui/material';

export function GenericListComponent(parameters) {
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

    if (parameters.data.length === 0) {
        return <Alert severity="error">No Items to Display</Alert>;
    }

    const itemFields = Object.keys(parameters.data[0]);

    const currentItems = parameters.data.slice(startIndex, startIndex + itemsPerPage);


    // function to check if field is a user object, if so, return the username
    function isUserObject(field) {
        if (field && typeof field === "object" && "username" in field) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div>
            <table className="item-table">            
                <thead>
                    <tr>
                        {itemFields.map((field) => (
                            <th key={field}>{field.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toUpperCase()).join(" ")}</th>
                        ))}
                    </tr>
                </thead>
                
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr 
                            key={index} onClick={() => parameters.handleListClick(item)}
                            className="item-row"
                        >
                            {itemFields.map((field) => (
                                <td key={field}>
                                    {isUserObject(item[field]) ? (
                                        <Tooltip
                                            placement="right"
                                            title={
                                                <div 
                                                    style={{ 
                                                        display: 'block',
                                                        lineHeight: '1.3',
                                                        borderRadius: '3px',
                                                        fontSize: '13px',
                                                        fontWeight: '400',
                                                        padding: '12px 21px',
                                                        textAlign: 'left'
                                                    }}>
                                                    <h6><strong>User Details</strong></h6>
                                                    {Object.keys(item[field]).map((key) => (
                                                        <div key={key}><strong>{key.toUpperCase()}:</strong> {item[field][key]}</div>
                                                    ))}
                                                </div>
                                            }
                                            arrow
                                        >
                                            <span>{item[field].username}</span>
                                        </Tooltip>
                                    ) : (
                                        item[field]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <Pagination
                totalItems={parameters.data.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={onItemsPerPageChange}
            />
        </div>
    );
}