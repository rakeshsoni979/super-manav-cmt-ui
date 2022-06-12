import * as React from 'react';
import _ from 'lodash';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MainCard from '../../components/MainCard';
import axios from 'axios';
import { Button, Checkbox, Paper } from '@mui/material';
import { Auth } from 'aws-amplify';
import { ACCESS_BASE_URL } from '../../pages/extra-pages/SamplePageConstants';
import { ACCESS_URL } from '../../pages/extra-pages/api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ShowReadCreatepopUp = (props) => {
  const [updateAcces, setUpdateAccess] = React.useState(false);
  const [deleteAcces, setDeleteAccess] = React.useState(false);

  // ===== ALERT STATES =======

  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  // ===== ALERT STATES =======

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idToken = props.userDetails.signInUserSession.idToken.jwtToken;
    const accessList = [];

    if (updateAcces) {
      accessList.push('UPDATE');
    }

    if (deleteAcces) {
      accessList.push('DELETE');
    }

    const combinedData = {
      accessList,
      forRegion: props.region || 'ap-south-1',
    };

    axios
      .post(ACCESS_URL, combinedData, { headers: { idToken } })
      .then((response) => {
        setOpen(true);
      })
      .catch((error) => {
        console.log('failure', error);
        setOpenError(true);
      });
  };

  return (
    <Paper
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        verticalAlign: 'middle',
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '25px',
      }}
    >
      <MainCard title="Request Access">
        <Stack spacing={2} sx={{ width: 600 }}>
          <FormControl>
            <TextField
              required
              id="outlined-basic"
              label="Email Id"
              variant="outlined"
              margin="normal"
              value={props?.userDetails?.attributes?.email}
              disabled
            />
          </FormControl>
          <FormControlLabel
            label="Update"
            control={
              <Checkbox
                checked={updateAcces}
                onChange={() => setUpdateAccess(!updateAcces)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
          />
          <FormControlLabel
            label="Delete"
            control={
              <Checkbox
                checked={deleteAcces}
                onChange={() => setDeleteAccess(!deleteAcces)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!(updateAcces || deleteAcces)}
          >
            Send
          </Button>
        </Stack>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Your request sent for approval!!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleErrorClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
            The operation failed!!!
          </Alert>
        </Snackbar>
      </MainCard>
    </Paper>
  );
};

export default ShowReadCreatepopUp;
