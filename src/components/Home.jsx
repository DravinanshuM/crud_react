import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams,} from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

// import database imoji.
import dataBaseImage from '../assets/database_2232241.png';

const Home = () => {
    //1. make state as an array for hold form data.
    const [data, setData] = useState([]);

    const [formData, setFormData] = useState({
        name:'',
        email: '',
        role:'',
        gender:'',
        language: {
            hindi: false,
            english: false,
          }
    });
    const {id} = useParams();

     // 8.for status.
     const [status, setStatus] = useState(false);

     //9. make states for use pagination.
     const [start, setStart] = useState(0);
     const [end, setEnd] = useState(5);

    // for get lenght find and currentPage find.
     const [getLength, setGetLength] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);

    // round figure.
    const total = Math.ceil(getLength/5);
    // console.log(total);

    // 10. for set limit.
     const limit = 5;

    //  12. for navigation.
    const navigate = useNavigate(); 
    // const history = useHistory();

    // 2. useEffcet, for show the data when home page render.
    useEffect(()=>{
      const getData = async () => {
            try {
                const studentNew = await axios.get("http://localhost:8000/student");
                // const studentNew = await axios.get(`http://localhost:8000/student/?_limit=${limit}`);
                // console.log(student);
                setData(studentNew.data.slice(0,5)); 
                //    console.log(data)
                setGetLength(studentNew.data.length);
                
            } catch (error) {
                // console.log(error);
                if(error.code === "ERR_BAD_REQUEST") {
                    console.log("Error :: ", error.message)
                }
            }
        }
        getData();
    },[id]);
    

console.log(data);

    // 3. create a function for get input field value.
    const handleChange = (e)=> {
        const {name, value, type, checked} = e.target;
        // const newValue = type === 'checkbox'? checked : value;

        if(type === 'checkbox') {
            setFormData((prevData)=>({
                ...prevData,
                language: {
                    ...prevData.language,
                    [name]: checked
                }
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }


    

    // 4. submitHandler, for submit the data.
    const submitHandler = async (e) => {
        e.preventDefault();
        const languagesToSend = Object.keys(formData.language).filter(lang => formData.language[lang]);
        const formDataToSend = { ...formData, language: languagesToSend };
        console.log("Form data:: ", formDataToSend);

        await axios.post("http://localhost:8000/student", formDataToSend);
        setStatus(true);
        navigate('/');
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
            setCurrentPage(currentPage+1);
        } else if (action === 'previous' && start > 0) {
            newStart -= limit;
            newEnd -= limit;
            setCurrentPage(currentPage-1);
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

                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='language' className='fw-bold' >Language:</Form.Label>
                            <div>
                                <Form.Check inline type='checkbox' id="hindi" name='hindi' label='Hindi' className='custom-checkbox' checked={formData.language.hindi} onChange={handleChange} />
                                <Form.Check inline type='checkbox' id="english" name='english' label='English' className='custom-checkbox' checked={formData.language.english} onChange={handleChange} />
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
                                <th>Role</th>
                                <th>Gender</th>
                                <th>Language:</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.length > 0 ? data.map((item, index) => {
                                    const tableIndex = start + index + 1;
                                    return (
                                        <tr key={index}>
                                            <td>{tableIndex}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td>{item.gender}</td>
                                            <td>
                                            <td>
                                                {Array.isArray(item.language) ? item.language.join(', ') : ''}
                                            </td>
                                            </td>
                                            <td>
                                                <Button variant="success" type='button' className='btn-sm' onClick={(e)=> navigate(`/view/${item.id}`)}>View</Button>{' '}
                                                
                                                <Button variant="primary" type='button' className='btn-sm' disabled={item.role === 'admin'} onClick={(e)=> navigate(`/edit/${item.id}`)}>Edit</Button>{' '}

                                                <Button variant="danger" type='button' className='btn-sm' onClick={()=>handleDelete(item.id)} disabled={item.role === "admin"}>Delete</Button>{' '}
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
                            <Pagination.Item className='shadow-none' name="previous" id="previous" type="button" onClick={() => handlePageChange('previous')} disabled={start === 0}>
                                Previous
                            </Pagination.Item>

                            <h6 className='mx-3'>
                                <span id="current_page">{currentPage}</span> of <span id="total_page">{total}</span>
                            </h6>

                            <Pagination.Item className='shadow-none' name="next" id="next" type="button" onClick={() => handlePageChange('next')} disabled={getLength <= end}>
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