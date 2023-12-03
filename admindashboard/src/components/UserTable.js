
import React from 'react';
import EditableRow from './EditableRow';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/UserTable.css';

const UserTable = ({ users, selectedRows, onRowSelect, onDelete, onSave, editingUserId, setEditingUserId }) => {
    const handleEdit = (userId) => {
        // Check if any rows are selected before allowing the edit action
        if (selectedRows.length > 0) {
            setEditingUserId(userId);
        } 
    };

    const handleDelete = (userId) => {
        // Check if any rows are selected before allowing the delete action
        if (selectedRows.length > 0) {
            onDelete(userId);
        } else {
            alert('Please select a row to delete.');
        }
    };

    const handleCancelEdit = () => {
        setEditingUserId(null);
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={selectedRows.length === users.length}
                            onChange={() => onRowSelect('all')}
                        />
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <React.Fragment key={user.id}>
                        {editingUserId === user.id ? (
                            <EditableRow user={user} onSave={onSave} onCancel={handleCancelEdit} />
                        ) : (
                            <tr className={selectedRows.includes(user.id) ? 'selected' : ''}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(user.id)}
                                        onChange={() => onRowSelect(user.id)}
                                    />
                                </td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                    <td>
                                        <button className="edit" onClick={() => handleEdit(user.id)}>
                                            <FaEdit />
                                        </button>
                                        <button className="delete" onClick={() => handleDelete(user.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
