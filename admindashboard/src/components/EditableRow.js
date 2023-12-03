

import React, { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

const EditableRow = ({ user, onSave, onCancel }) => {
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleChange = (e, field) => {
        setEditedUser({ ...editedUser, [field]: e.target.value });
    };

    return (
        <tr>
            <td>
                <input type="text" value={editedUser.id} readOnly />
            </td>
            <td>
                <input type="text" value={editedUser.name} onChange={(e) => handleChange(e, 'name')} />
            </td>
            <td>
                <input type="text" value={editedUser.email} onChange={(e) => handleChange(e, 'email')} />
            </td>
            <td>
                <input type="text" value={editedUser.role} onChange={(e) => handleChange(e, 'role')} />
            </td>
            <td>
                <button className="save" onClick={() => onSave(editedUser)}><FaSave /> Save</button>
                <button className="cancel" onClick={onCancel}><FaTimes /> Cancel</button>
            </td>
        </tr>
    );
};

export default EditableRow;
