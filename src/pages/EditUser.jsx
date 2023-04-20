import React, { useEffect, useState } from 'react'

//mUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, updateUser } from '../redux/actions';

export default function EditUser() {
    let { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.data)
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
        dispatch(updateUser(state, id))
        navigate('/')
    }

    useEffect(() => {
        if(user) {
            setstate({ ...user })
        }
    }, [user])

    useEffect(() => {
        dispatch(getSingleUser(id))
    }, [dispatch, id])

    return (
        <div style={{ marginTop: "100px" }}>
            <Button onClick={() => navigate('/')} variant='contained' color="secondary" style={{ marginBottom: "30px" }}>Go Back</Button>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        '& > :not(style)': { m: 1, width: '45ch' },
                    }}
                >
                    <TextField name="name" required onChange={handleChangeInput} id="standard-basic" label="Name" value={name || ""} type='text' variant="standard" />
                    <TextField name="email" required onChange={handleChangeInput} id="standard-basic" label="Email" value={email || ""} type='email' variant="standard" />
                    <TextField name="contact" required onChange={handleChangeInput} id="standard-basic" label="contact" value={contact || ""} type='number' variant="standard" />
                    <TextField name="address" required onChange={handleChangeInput} id="standard-basic" label="address" value={address || ""} type='text' variant="standard" />
                </Box>
                <Button type='submit' variant='contained' color="primary" style={{ margin: "10px" }}>Update</Button>
            </form>
        </div>
    )
}
