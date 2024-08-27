import React, { useState } from 'react';

import { Pagination } from './Pagination';

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
        return <p>No data available</p>;
    }

    const itemFields = Object.keys(parameters.data[0]);

    const currentItems = parameters.data.slice(startIndex, startIndex + itemsPerPage);

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
                                <td key={field}>{item[field]}</td>
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