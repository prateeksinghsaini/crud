import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { delUser, loadUsers } from '../redux/actions';
import { useNavigate } from 'react-router-dom'

// mUI
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function Home() {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const { users } = useSelector((state) => state.data)

  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("This will delete the user, are you sure?")) {
      dispatch(delUser(id))
    }
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>CRUD Ops</h1>
      <Button onClick={() => navigate("/addUser")} variant='contained' color="primary" style={{ margin: "10px" }}>Add User</Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Contact</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="center" style={{ color: "blue" }}>{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.contact}</StyledTableCell>
                <StyledTableCell align="center">{user.address}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button
                      color="secondary"
                      onClick={() => handleDelete(user.id)}
                    >DEL</Button>
                    <Button
                      onClick={() => navigate(`/EditUser/${user.id}`)}
                    >EDIT</Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
