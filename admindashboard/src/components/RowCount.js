
import React from 'react';

const RowCount = ({ selectedCount, totalCount }) => {
    return (
        <div>
            {`${selectedCount} of ${totalCount} rows selected`}
        </div>
    );
};

export default RowCount;
