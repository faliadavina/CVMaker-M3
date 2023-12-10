import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SidebarAdmin from "../pages/SidebarAdmin";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id_akun: '',
    username: '',
    email: '',
    password: '',
    role: 2,
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('https://api-cvmaster.agilearn.id/akun');
      setUsers(response.data.allAkun);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      await axios.post('https://api-cvmaster.agilearn.id/akun', formData);
      getUsers();
      setFormData({ username: '', email: '', password: '', role: 2 });
      setShowModal(false);
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  };

  const handleEditUser = async () => {
    try {
      await axios.patch(`https://api-cvmaster.agilearn.id/akun/${editingUserId}`, formData);
      getUsers();
      setFormData({ id_akun: '', username: '', email: '', password: '', role: 2 });
      setShowModal(false);
      setEditingUserId(null);
    } catch (error) {
      console.error('Error updating user: ', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://api-cvmaster.agilearn.id/akun/${id}`);
      getUsers();
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  const handleEditClick = (user) => {
    setFormData({
      id_akun: user.id_akun,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    setEditingUserId(user.id_akun);
    setShowModal(true);
  };

  return (
    <body>
    <SidebarAdmin />
    <main id="main">

    <div className="container mt-5 ">
      <h2>User Account Management</h2>
      <div className="container d-flex justify-content-between align-items-center">
        <p>   </p>
        {/* Add User Button */}
        <Button variant="primary" onClick={() => setShowModal(true)}>
        <i class="material-icons">&#xE147;</i> <span>Add User Account</span>
        </Button>
      </div>

      {/* User Table */}
      <table className="table mt-3 ml-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id_akun}>
              <td>{user.id_akun}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="info" onClick={() => handleEditClick(user)}>
                  <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i> <span>Edit</span>
                </Button>
                <Button variant="danger" className="ml-2" onClick={() => handleDeleteUser(user.id_akun)}>
                  <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i> <span>Delete</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing User */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUserId ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            {editingUserId ? (
              <Button variant="primary" onClick={handleEditUser}>
                Update User
              </Button>
            ) : (
              <Button variant="primary" onClick={handleAddUser}>
                Add User
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>


    </main>

    </body>

  );
};

export default ManageUser;
