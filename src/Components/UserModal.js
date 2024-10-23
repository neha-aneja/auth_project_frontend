import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid, Paper, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserModal = (props) => {
  const [name, setName] = useState(props?.user?.name);
  const [email, setEmail] = useState(props?.user?.email);
  const [phoneNumber, setPhoneNumber] = useState(props?.user?.phoneNumber);
  const [role, setRole] = useState(props?.user?.role);

  const paperStyle = {
    padding: '2rem',
    margin: '100px auto',
    borderRadius: '1rem',
    boxShadow: '10px 10px 10px',
  };
  const heading = { fontSize: '2.5rem', fontWeight: '600' };
  const row = { display: 'flex', marginTop: '2rem' };
  const btnStyle = {
    marginTop: '2rem',
    fontSize: '1.2rem',
    fontWeight: '700',
    backgroundColor: 'blue',
    borderRadius: '0.5rem',
    display: 'flex',
  };

  const editUser = () => {
    axios
      .patch(`http://localhost:3001/user/${props.id}`, {
        name,
        email,
        phoneNumber,
        role,
      })
      .then((result) => {
        if (result.status === 201) {
          console.log('success');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal
        open={props?.showModal}
        onClose={props?.handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div>
            <Grid align='center' className='wrapper'>
              <Paper
                style={paperStyle}
                sx={{
                  width: {
                    xs: '80vw', // 0
                    sm: '50vw', // 600
                    md: '40vw', // 900
                    lg: '30vw', // 1200
                    xl: '20vw', // 1536
                  },
                  height: {
                    lg: '75vh', // 1200px and up
                  },
                }}
              >
                <Typography component='h1' variant='h5' style={heading}>
                  {' '}
                  Edit{' '}
                </Typography>
                <form>
                  <TextField
                    style={row}
                    sx={{ label: { fontWeight: '700', fontSize: '1.3rem' } }}
                    fullWidth
                    type='text'
                    label='Enter Name'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></TextField>
                  <TextField
                    style={row}
                    sx={{ label: { fontWeight: '700', fontSize: '1.3rem' } }}
                    fullWidth
                    label='Email'
                    variant='outlined'
                    type='email'
                    placeholder='Enter Email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    style={row}
                    sx={{ label: { fontWeight: '700', fontSize: '1.3rem' } }}
                    fullWidth
                    label='Phone Number'
                    variant='outlined'
                    type='text'
                    placeholder='Enter Phone Number'
                    name='phoneNumber'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <select
                    name='role'
                    style={{
                      width: '30vh',
                      height: '5vh',
                      fontSize: 'large',
                      marginTop: '2rem',
                    }}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value='Student'>Student</option>
                    <option value='Teacher'>Teacher</option>
                    <option value='Institute'>Institute</option>
                  </select>
                  <Button
                    style={btnStyle}
                    variant='contained'
                    type='submit'
                    onClick={editUser}
                  >
                    Save
                  </Button>
                  <Button
                    style={btnStyle}
                    variant='contained'
                    type='submit'
                    onClick={props?.handleClose}
                  >
                    Close
                  </Button>
                </form>
              </Paper>
            </Grid>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UserModal;
