import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaEdit } from "react-icons/fa";
import { Card, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const OrganisasiList = () => {
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
  }, [isError, navigate]);

  const [organisasi, setOrganisasi] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const id = user && user.user && user.user.id_akun;

  useEffect(() => {
    getOrganisasi();
  }, [id]);

  const getOrganisasi = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/organisasi/akun/${id}`
      );
      setOrganisasi(response.data.organisasi);
      setErrorMessage('');
    } catch (error) {
      setOrganisasi(null);
      console.error('Error fetching:', error);
      setOrganisasi(null);
    }
  };

  const handleEditClick = (id_org) => {
    navigate(`/edit_organisasi/${id_org}`);
  };

  const deleteOrganisasi = async (id_org) => {
    try {
      await axios.delete(`http://localhost:5000/organisasi/${id_org}`);
      getOrganisasi();
      setSuccessMessage('Organization deleted successfully!');
      setErrorMessage('');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      console.error('Error deleting:', error);
      setErrorMessage('Error deleting.');
      setSuccessMessage('');
    }
  };

  const toggleSelect = (id_org) => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      if (selectedItems.includes(id_org)) {
        setSelectedItems(selectedItems.filter((item) => item !== id_org));
      } else {
        setSelectedItems([...selectedItems, id_org]);
      }
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allIds = organisasi.map((item) => item.id_org);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  const deleteSelectedOrganisasi = async () => {
    try {
      for (const id_org of selectedItems) {
        await axios.delete(`http://localhost:5000/organisasi/${id_org}`);
      }
      getOrganisasi();
      setSelectedItems([]);
      setSuccessMessage('Selected organizations deleted successfully!');
      setErrorMessage('');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      console.error('Error deleting selected organizations:', error);
      setErrorMessage('Error deleting selected organizations.');
      setSuccessMessage('');
      setTimeout(() => setErrorMessage(''), 2000);
    }
  };

  const OrganisasiDetail = organisasi
  ? organisasi.map((organisasi, index) => (
    <Col
      key={organisasi.id_org}
      xs={12}
      md={6}
      lg={6}
      xl={6}
      className="mb-3"
    >
      <Card
        className={`custom-card ${selectedItems.includes(organisasi.id_org) ? 'selected' : ''
          }`}
      >
        <Card.Body>
          <Row>
            <Col xs="auto" className="d-flex align-items-start">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(organisasi.id_org)}
                  onChange={() => toggleSelect(organisasi.id_org)}
                />
              </div>
            </Col>
            <Col>
              <div className="organisasi-details">
                <Card.Title>{organisasi.nama_organisasi.toUpperCase()}</Card.Title>
                <Card.Subtitle>{`${organisasi.periode_awal} - ${organisasi.periode_akhir}`}</Card.Subtitle>
                <Card.Text>
                  {organisasi.jabatan}
                  <br />
                  <span style={{ color: 'gray' }}>
                    {organisasi.deskripsi_jabatan}
                  </span>
                </Card.Text>
              </div>
            </Col>
          </Row>
          <div className="card-action">
            
            <Button
                  onClick={() => handleEditClick(organisasi.id_org)}
                  className="btn btn-sm edit-button"
                >
                  <FaEdit />
                </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))
  : null;

  return (
    <div>
      <section id="organisasi" className="organisasi">
        {organisasi !== null ? (
          <div className="container">
            <div
              className="section-title"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <div className="title-container">
                <h2>Organisasi</h2>
                <div className="checkbox-container">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    <span className="ml-2">Select All</span>
                  </label>
                </div>
              </div>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              <div className="btn-container" style={{ marginLeft: 'auto' }}>
                <NavLink to="/add_organisasi">
                  <Button
                    variant="dark"
                    style={{
                      borderRadius: '50px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    <FaPlus style={{ marginRight: '10px' }} /> Add Data
                  </Button>
                </NavLink>
                {selectedItems.length > 0 && (
                  <Button
                    variant="danger"
                    onClick={deleteSelectedOrganisasi}
                    style={{
                      borderRadius: '50px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      marginLeft: '10px',
                    }}
                  >
                    Delete Selected
                  </Button>
                )}
              </div>
            </div>
            <Row>{OrganisasiDetail}</Row>
          </div>
        ) : (
          <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div
              className="text-center"
              style={{
                marginBottom: '20px',
                color: 'grey',
                fontSize: '14px',
              }}
            >
              Organisasi Hasn't Been Added
            </div>
            <NavLink to="/add_organisasi">
              <Button
                variant="dark"
                style={{
                  borderRadius: '50px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                <FaPlus style={{ marginRight: '10px' }} /> Add Data
              </Button>
            </NavLink>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrganisasiList;
