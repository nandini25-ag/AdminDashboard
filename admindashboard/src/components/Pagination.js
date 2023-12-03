// src/components/Pagination.js
import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <div className="pagination">
            <button onClick={() => onPageChange(currentPage - 1)} className="arrow" disabled={currentPage === 1}>
                &lt;&lt; {/* Double left arrow */}
            </button>
            <button onClick={() => onPageChange(currentPage - 1)} className="arrow" disabled={currentPage === 1}>
                &lt; {/* Left arrow */}
            </button>
            <span className="current-page">{`Page ${currentPage} of ${totalPages}`}</span>
            <button onClick={() => onPageChange(currentPage + 1)} className="arrow" disabled={currentPage === totalPages}>
                &gt; {/* Right arrow */}
            </button>
            <button onClick={() => onPageChange(totalPages)} className="arrow" disabled={currentPage === totalPages}>
                &gt;&gt; {/* Double right arrow */}
            </button>
        </div>
    );
};

export default Pagination;
