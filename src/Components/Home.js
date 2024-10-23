import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Logout from './Logout';
import UserModal from './UserModal';
import Chat from './Chat';

function Home({ setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sessionUser, setSessionUser] = useState(location.state?.user);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(!user);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (!sessionUser) {
      axios
        .get('http://localhost:3001/user', { withCredentials: true })
        .then((response) => {
          if (response.data.user) {
            setUser(response.data.user);
          } else {
            navigate('/login');
          }
        })
        .catch(() => navigate('/login'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionUser, navigate]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:3001/users', {
      withCredentials: true,
    });
    setUsers(res.data);
  };

  const fetchUser = async (id) => {
    const res = await axios.get(`http://localhost:3001/user/${id}`, {
      withCredentials: true,
    });
    setUser(res.data);
  };

  const handleEdit = (id) => {
    setUserId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const deleteUser = async (id) => {
    const res = await axios.delete(`http://localhost:3001/user/${id}`, {
      withCredentials: true,
    });
    fetchUsers();
  };

  if (loading) {
    return (
      <center>
        <h1>Loading...</h1>
      </center>
    );
  }

  return (
    <center>
      <h1 style={{ color: 'white', fontSize: '5rem' }}>
        Welcome {sessionUser && sessionUser.name} !!!
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Phone Number</TableCell>
              <TableCell align='center'>Role</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='center'>{row.email}</TableCell>
                <TableCell align='center'>{row.phoneNumber}</TableCell>
                <TableCell align='center'>{row.role}</TableCell>
                <TableCell align='center'>
                  <EditIcon
                    onClick={() => fetchUser(row?._id) && handleEdit(row?._id)}
                  />
                </TableCell>
                <TableCell align='center'>
                  <DeleteIcon onClick={() => deleteUser(row?._id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Logout setIsLoggedIn={setIsLoggedIn} />
      {showModal ? (
        <UserModal
          showModal={showModal}
          handleClose={handleClose}
          user={user}
          id={userId}
        />
      ) : (
        ''
      )}
      {/* <Chat /> */}
    </center>
  );
}

export default Home;
