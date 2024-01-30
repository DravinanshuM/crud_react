import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const View = () => {
  const { id } = useParams();
  const [datas, setDatas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const studentData = async () => {
      try {
        const myData = await axios.get(`http://localhost:8000/student/${id}`);
        setDatas(myData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    studentData();
  }, [id]);


  return (
    <>
      <Container className='m-5'>
        <Row>
          <Col md={10}>
            <h2 className='text-center bg-info rounded-2 p-3 text-warning-emphasis'>
                VIEW DATA THROUGH ID NO :: {datas.role === 'admin' ? 'Not Show' : id}
            </h2>
            {loading ? (
              <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            ) : error ? (
              <p className='text-danger'>{error}</p>
            ) : datas.role === 'admin' ? (
              <h5 className='text-center bg-white shadow p-4'>Your are not eligible to show Admin Details</h5>
            ) : (
              <Table striped hover className='text-center'>
              <thead className='table-primary'>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role:</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{datas.id}</td>
                  <td>{datas.name}</td>
                  <td>{datas.email}</td>
                  <td>{datas.role}</td>
                  <td>{datas.gender}</td>
                </tr>
              </tbody>
              </Table>
            )
            }
            <Button variant='secondary' type='button' onClick={() => nav(`/`)}>
               Go To Home
            </Button>
            <Button className='mx-3' variant='primary' type='button' onClick={() => window.history.back()}>
               Go To Back
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default View;
