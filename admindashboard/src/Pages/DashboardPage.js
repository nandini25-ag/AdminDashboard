
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import UserTable from '../components/UserTable';
import Pagination from '../components/Pagination';
import RowCount from '../components/RowCount';
import { FaTrash } from 'react-icons/fa';
import './DashboardPage.css';

const DashboardPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUserId, setEditingUserId] = useState(null);
    const pageSize = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredUsers = users.filter((user) =>
        Object.values(user).some((value) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowSelect = (id) => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.includes(id)
                ? prevSelectedRows.filter((rowId) => rowId !== id)
                : [...prevSelectedRows, id]
        );
    };

    const handleDeleteSelected = () => {
        setUsers((prevUsers) =>
            prevUsers.filter((user) => !selectedRows.includes(user.id))
        );
        setSelectedRows([]);
    };

    const handleSave = (editedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === editedUser.id ? editedUser : user
            )
        );
        setEditingUserId(null);
    };

    return (
        <div className="dashboard-container">
            <Header />
            <div className="search-delete-container">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter Value..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <FaTrash className="delete-icon" onClick={handleDeleteSelected} />
                </div>
            </div>
           
            <div className="table-container">
                <UserTable
                    users={paginatedUsers}
                    selectedRows={selectedRows}
                    onRowSelect={handleRowSelect}
                    onDelete={handleDeleteSelected}
                    onSave={handleSave}
                    editingUserId={editingUserId}
                    setEditingUserId={setEditingUserId}
                />
                <RowCount selectedCount={selectedRows.length} totalCount={users.length} />
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default DashboardPage;
