import React, { useEffect, useState } from 'react';

export function Pagination(parameters) {
    const {
        totalItems,
        itemsPerPage,
        currentPage,
        onPageChange,
        onItemsPerPageChange
    } = parameters;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [inputPage, setInputPage] = useState(currentPage);

    useEffect(() => {
        setInputPage(currentPage);
    }, [currentPage]);

    const handlePageChange = (event) => {
        const page = Number(event.target.value);
        setInputPage(page);
    };

    const handleSelectChange = (event) => {
        const itemsPerPage = Number(event.target.value);
        onItemsPerPageChange(itemsPerPage);

        const newTotalPages = Math.ceil(totalItems / itemsPerPage);
        const newCurrentPage = Math.min(currentPage, newTotalPages);
        onPageChange(newCurrentPage);
    };

    const getShowingRange = () => {
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const endItem = currentPage === totalPages ? totalItems : currentPage * itemsPerPage;
        return `Showing ${startItem} to ${endItem} of ${totalItems} entries`;
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const page = Number(event.target.value);
            if (page < 1) {
                onPageChange(1);
                setInputPage(1);
            }

            if (page > totalPages) {
                onPageChange(totalPages);
                setInputPage(totalPages);
            }
            
            if (page >= 1 && page <= totalPages && page !== currentPage) {
                onPageChange(page);
            }
        }
    };

    return (
        <div>
            <div className="pagination">
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                >
                    ❮❮
                </button>

                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ❮
                </button>

                <input
                    type="number"
                    value={inputPage}
                    className="page-input"
                    onChange={handlePageChange}
                    onKeyDown={handleKeyDown}
                /> 
                <span>of {totalPages}</span>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    ❯
                </button>

                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    ❯❯
                </button>

                <span>Records Per Page</span>
                <select
                    className="select-items-per-page"
                    onChange={handleSelectChange}
                    value={itemsPerPage}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>

            <span className="count-range">
                {getShowingRange()}
            </span>
        </div>
    );
}