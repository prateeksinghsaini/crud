import React, { useState } from 'react'


//mUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions';

export default function AddUser() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [state, setstate] = useState({
        name: "",
        email: "",
        contact: "",
        address: ""
    });
    const { name, email, contact, address } = state

    const handleChangeInput = (e) => {
        let { name, value } = e.target
        setstate({ ...state, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(addUser(state))
        navigate('/')
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <Button onClick={() => navigate('/')} variant='contained' color="secondary" style={{ marginBottom: "30px" }}>Go Back</Button>
            <h1>New User</h1>
            <form onSubmit={handleSubmit}>
                <Box  
                    sx={{
                        '& > :not(style)': { m: 1, width: '45ch' },
                    }}
                >
                    <TextField name="name" required onChange={handleChangeInput} id="standard-basic" label="Name" value={name} type='text' variant="standard" />
                    <TextField name="email" required onChange={handleChangeInput} id="standard-basic" label="Email" value={email} type='email' variant="standard" />
                    <TextField name="contact" required onChange={handleChangeInput} id="standard-basic" label="contact" value={contact} type='number' variant="standard" />
                    <TextField name="address" required onChange={handleChangeInput} id="standard-basic" label="address" value={address} type='text' variant="standard" />
                </Box>
                <Button type='submit' variant='contained' color="primary" style={{ margin: "10px" }}>Submit</Button>
            </form>
        </div>
    )
}
