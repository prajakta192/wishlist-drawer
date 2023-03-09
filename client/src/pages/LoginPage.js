import React, { useState } from 'react';
import { Button, Container,Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const navigate =useNavigate();
    const[formcontrol, setFormControl] = useState({
        email:'',
        password:''
    })
    

    const formControlHandler = (e) => {
       console.log(e.target.value)
       setFormControl((prev) => {
         return{
            ...prev,

            [e.target.name] : e.target.value
         }
       })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/payment')
    }
    return(
        <Container style={{width:'50vw'}}>
       
        <h1 className="my-3">Sign In</h1>
       
    <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label htmlFor='email'>
            Email
            </Form.Label>
            <Form.Control id='email' type="email" placeholder='Enter your email' value={formcontrol.email} name='email' required onChange={formControlHandler}/>
        </Form.Group>
        <Form.Group className='mt-3'>
            <Form.Label htmlFor='password'>
            Password
            </Form.Label>
            <Form.Control id='password' type="password" placeholder='Enter your password' value={formcontrol.password} name='password' required onChange={formControlHandler}/>
        </Form.Group>
        <Button className='d-block mt-3' variant="warning" type="submit">
        Sign In
      </Button>
     
    </Form>
    </Container>
    )
}
export default LoginPage;