import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Container, Row, Col, Form, Button, Spinner} from 'react-bootstrap';
import axios from 'axios';


const Edit = () => {

  //1. make states for get data and update th data from server the set here.
  const [getData, setGetData] = useState([]);
  // 2. for error handle.
  const [error, setError] = useState(null);
  // 3. for loading data handle.
  const [loading, setLoading] = useState(true);
  // 4. for navigation bar handle.
  const nav = useNavigate();
  // 5. for get the id.
  const { id } = useParams();
  // console.log(id);

  // 2. create useEffect Hook.
  useEffect(()=>{
      // create a function updateData name.
      const getData = async () => {
           try {
            const allData =  await axios.get(`http://localhost:8000/student/${id}`);
            // console.log(allData);
            console.log(allData.data);
            setGetData(allData.data);
           } catch (error) {
             setError(error.message);
             console.log('Error :: ', error);
           } finally {
              setLoading(false)
           }
      }
      getData();
  },[id]);
  

  // 3. get the every field value.
  const handleChange = (e) => {
    // console.log(e);
    const {name, value} = e.target;
    // console.log(name);
    // console.log(value);

    // Update the state for the corresponding field.
    setGetData((prevData)=>(
      {
        ...prevData,
        [name]: value
      }
    ))
  }


  // 4. submit the Data.
const submitHandler = async (e) => {
  e.preventDefault();
  try {
    console.log("Updating data:", getData);
    await axios.put(`http://localhost:8000/student/${id}`, getData);
    console.log("Update successful!");
    // Navigate to the homepage after a successful update.
    nav('/');
  } catch (error) {
    setError(error.message);
    console.error('Error updating data:', error);
  }
};


  return (
      <Container className='m-5'>
            <Row>
                <Col md={8}>
                    <h1 className='text-center bg-info rounded-2 p-3 text-warning-emphasis'>
                       UPDATE THE DATA ID NO :: {id}
                    </h1>
                    {
                      loading ? (
                        <Spinner animation='border' role='status'>
                          <span className='visually-hidden'>Loading...</span>
                        </Spinner>
                      ) : error ? (
                        <p className='text-danger'>{error}</p>
                      ) : (
                        <Form onSubmit={submitHandler}>
                          <Form.Group className="mb-3">
                                <Form.Label htmlFor='name'>Name:</Form.Label>
                                <Form.Control type="text" name='name' id='name' placeholder="user name" className='shadow-none' value={getData.name}  onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" name='email' id='email' placeholder="name@example.com" className='shadow-none' value={getData.email} onChange={handleChange} required/>
                            </Form.Group>

                            <Form.Group  className='mb-3 fw-bold'>
                            <Form.Label>Select Role:</Form.Label>
                            <Form.Select id='role' name='role' value={getData.role} onChange={handleChange}>
                                <option>Select Role</option>
                                <option value="guest">Guest</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label className='fw-bold'>Select Gender:</Form.Label>
                           <div>
                                <Form.Check inline type="radio" label='Male' value='m'  name='gender' id='Male' checked={getData.gender === 'm'} onChange={handleChange}/>
                                <Form.Check inline type="radio" label='Female' value='f' name='gender' id='Female' checked={getData.gender === 'f'} onChange={handleChange}/>
                           </div>
                        </Form.Group>

                            <Button variant="success" type='submit'>Update</Button>{' '}
                            <Button variant="secondary" type='button' onClick={()=>nav('/')}>Back To Home</Button>{' '}
                      </Form>
                      )
                    }
                </Col>
            </Row>
      </Container>
  )
}

export default Edit;