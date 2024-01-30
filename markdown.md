# mark down file.

# JSON FILE.
```Json
{
  "student": [
    {
      "id": "d3a8",
      "name": "John Doe",
      "email": "john.doe@gmail.com",
      "role": "user",
      "gender": "M"
    },
    {
      "id": "e9c2",
      "name": "Alice Johnson",
      "email": "alice.j@gmail.com",
      "role": "admin",
      "gender": "F"
    },
    {
      "id": "a7f9",
      "name": "Bob Smith",
      "email": "bob.smith@gmail.com",
      "role": "user",
      "gender": "M"
    },
    {
      "id": "c2b4",
      "name": "Eva Brown",
      "email": "eva.brown@gmail.com",
      "role": "guest",
      "gender": "F"
    },
    {
      "id": "f4d6",
      "name": "Michael Johnson",
      "email": "michael.j@gmail.com",
      "role": "admin",
      "gender": "M"
    },
    {
      "id": "76a2",
      "name": "hello",
      "email": "hello@gmail.com",
      "role": "guest",
      "gender": "M"
    },
    {
      "id": "af98",
      "name": "raj Kumar",
      "email": "raj@gmail.com",
      "role": "user",
      "gender": "M"
    },
    {
      "id": "b2fb",
      "name": "asj",
      "email": "as@gmail.com",
      "role": "admin",
      "gender": "M"
    },
    {
      "id": "f751",
      "name": "hello world",
      "email": "hello.world@gmail.com",
      "role": "admin",
      "gender": "F"
    },
    {
      "id": "8c1e",
      "name": "Hello ",
      "email": "hello2@gmail.com",
      "role": "user",
      "gender": "M"
    },
    {
      "id": "fb75",
      "name": "anshuman pandey",
      "email": "asnshu@gmail.com",
      "role": "guest",
      "gender": "M"
    },
    {
      "id": "b0e0",
      "name": "divya",
      "email": "divya2@gmail.com",
      "role": "guest",
      "gender": "F"
    },
    {
      "id": "d3a9",
      "name": "Jane Doe",
      "email": "jane.doe@gmail.com",
      "role": "user",
      "gender": "F"
    },
    {
      "id": "e9c3",
      "name": "Bob Johnson",
      "email": "bob.j@gmail.com",
      "role": "admin",
      "gender": "M"
    },
    {
      "id": "a7f8",
      "name": "Alice Smith",
      "email": "alice.smith@gmail.com",
      "role": "user",
      "gender": "F"
    },
    {
      "id": "c2b5",
      "name": "John Brown",
      "email": "john.brown@gmail.com",
      "role": "guest",
      "gender": "M"
    },
    {
      "id": "f4d7",
      "name": "Eva Johnson",
      "email": "eva.j@gmail.com",
      "role": "admin",
      "gender": "F"
    },
    {
      "id": "76a3",
      "name": "world",
      "email": "world@gmail.com",
      "role": "guest",
      "gender": "M"
    },
    {
      "id": "af97",
      "name": "kumar raj",
      "email": "kumar@gmail.com",
      "role": "user",
      "gender": "M"
    },
    {
      "id": "d3b0",
      "name": "Jane Smith",
      "email": "jane.smith@gmail.com",
      "role": "user",
      "gender": "F"
    },
    {
      "id": "e9c4",
      "name": "Alice Brown",
      "email": "alice.brown@gmail.com",
      "role": "admin",
      "gender": "F"
    },
    {
      "id": "a7f7",
      "name": "Bob Doe",
      "email": "bob.doe@gmail.com",
      "role": "user",
      "gender": "M"
    },
    {
      "id": "c2b6",
      "name": "John Johnson",
      "email": "john.j@gmail.com",
      "role": "guest",
      "gender": "M"
    },
    {
      "id": "f4d8",
      "name": "Eva Smith",
      "email": "eva.smith@gmail.com",
      "role": "admin",
      "gender": "F"
    },
    {
      "id": "76a4",
      "name": "Hello World",
      "email": "hello.world2@gmail.com",
      "role": "guest",
      "gender": "M"
    },
    {
      "id": "af96",
      "name": "Rajesh Kumar",
      "email": "rajesh@gmail.com",
      "role": "user",
      "gender": "M"
    }
  ]
}

```


```Javascript
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import database imoji.
import dataBaseImage from '../assets/database_2232241.png';

const Home = () => {

    //1. make state as an array for hold form data.
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        role:'',
        gender:''
    });
     // 8.for status.
     const [status, setStatus] = useState();

     //9. make two states.
     const [start, setStart] = useState(0);
     const [end, setEnd] = useState(5);

    // 10. for set limit.
     const limit = 5;

    //  12. for navigation.
    const navigate = useNavigate(); 

    // 2. useEffcet, for show the data when home page render.
    useEffect(()=>{
      const getData = async () => {
            try {
            // const student = await axios.get("http://localhost:8000/student");
            const studentNew = await axios.get(`http://localhost:8000/student/?_limit=${limit}`);
              // console.log(student);
               setData(studentNew.data);
            //    console.log(data)
            } catch (error) {
                // console.log(error);
                if(error.code === "ERR_BAD_REQUEST") {
                    console.log("Error :: ", error.message)
                }
            }
        }
        getData();
    },[]);

    // 3. create a function for get input field value.
    const handleChange = (e)=> {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // 4. submitHandler, for submit the data.
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Form data:: ", formData);
         await axios.post("http://localhost:8000/student", formData);
        setStatus(true);
    }

    // 5. for rendener again.
    if(status) {
        return <Home/>
    }

    //6. for delete particular row. field.
    const handleDelete = async (id) => {
        // console.log(id);
        if (window.confirm('Are you sure to delete?')) {
            try {
              const response = await axios.delete(`http://localhost:8000/student/${id}`);
              // console.log(response);
              if (response.status === 200) {
                console.log(`Student with id ${id} deleted successfully.`);
                setStatus(true);
              } else {
                console.log(`Unexpected status: ${response.status}`);
              }
            } catch (error) {
              console.log("Error:", error);
            }
        }
          
    }

    // 7. for next button.
    const handlePageChange = async (action) => {
        let newStart = start;
        let newEnd = end;
     
        if (action === 'next') {
            newStart += limit;
            newEnd += limit;
        } else if (action === 'previous' && start > 0) {
            newStart -= limit;
            newEnd -= limit;
        }
     
        try {
            const response = await axios.get(`http://localhost:8000/student/?_start=${newStart}&_end=${newEnd}`);
            const newData = response.data;
    
            setStart(newStart);
            setEnd(newEnd);
            setData(newData);
        } catch (error) {
            console.log("Error :: ", error);
        }
    };

  return (
      <Container className='mt-5 mb-5'>
        <h1 className='text-center bg-info rounded-2 p-3 text-warning-emphasis'>CRUD Project in Recat-JS with JSON SRVER</h1>
            <Row>
                <Col md={4} className='bg-light shadow mt-4'>
                    <h3 className='text-center pt-2'>USER FORM</h3>
                    <Form onSubmit={submitHandler} className='p-2'>
                        <Form.Group className="mb-3 fw-bold">
                            <Form.Label htmlFor='name'>Name:</Form.Label>
                            <Form.Control type="text" name='name' id='name' placeholder="user name" className='shadow-none' value={formData.name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3 fw-bold">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" name='email' id='email' placeholder="name@example.com" value={formData.email} className='shadow-none' onChange={handleChange} required/>
                        </Form.Group>
                        <Form.Group  className='mb-3 fw-bold'>
                            <Form.Label>Select Role:</Form.Label>
                            <Form.Select id='role' name='role' onChange={handleChange}>
                                <option>Select Role</option>
                                <option value="guest">Guest</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label className='fw-bold'>Select Gender:</Form.Label>
                           <div>
                                <Form.Check inline type="radio" label='Male' value='M'  name='gender' id='Male' onChange={handleChange} />
                                <Form.Check inline type="radio" label='Female' value='F' name='gender' id='Female' onChange={handleChange}/>
                           </div>
                        </Form.Group>

                        <Button variant="success" type='submit'>Submit</Button>{' '}
                    </Form>
                </Col>
                <Col md={8} className='p-4'>
                    <Table striped bordered hover className='text-center'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Role:</th>
                                <th>Gender</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.length > 0 ? data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td>{item.gender}</td>
                                            <td>
                                                <Button variant="success" type='button' className='btn-sm' onClick={(e)=> navigate(`/view/${item.id}`)}>View</Button>{' '}
                                                
                                                <Button variant="primary" type='button' className='btn-sm' disabled={item.role === 'admin'} onClick={(e)=> navigate(`/edit/${item.id}`)}>Edit</Button>{' '}

                                                <Button variant="danger" type='button' className='btn-sm' onClick={()=>handleDelete(item.id)}>Delete</Button>{' '}
                                            </td>
                                        </tr>
                                    );
                                }) : <tr><td colSpan="12" className='text-center'>
                                        <h2>No Data Found</h2>
                                       <img src={dataBaseImage} alt="error" height={100}/>
                                    </td></tr>
                            }
                        </tbody>
                    </Table>
                    {/* Pagination Code */}
                    <div className="justify-content-center align-items-center  bottom-0">
                        <Pagination className='justify-content-center align-items-center'>
                            <Pagination.Item className='shadow-none' name="previous" id="previous" type="button" onClick={() => handlePageChange('previous')} >
                                Previous
                            </Pagination.Item>

                            <h6 className='mx-3'>
                                <span id="current_page">1</span> of <span id="total_page">5</span>
                            </h6>

                            <Pagination.Item className='shadow-none' name="next" id="next" type="button" onClick={() => handlePageChange('next')}>
                                Next
                            </Pagination.Item>
                        </Pagination>
                    </div>
                </Col>
            </Row>
      </Container>
  )
}

export default Home;

```