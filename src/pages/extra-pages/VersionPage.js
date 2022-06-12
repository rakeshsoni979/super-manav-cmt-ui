import * as React from 'react';
import _ from 'lodash';
import { CardHeader, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MainCard from '../../components/MainCard';
import { TextAreaField } from '@aws-amplify/ui-react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Auth } from 'aws-amplify';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PreviewIcon from '@mui/icons-material/Preview';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { getConfigVersion, updateConfig } from './api';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const VersionPage = () => {
  const [appId, setAppId] = React.useState('62a4f72977979a833c3dfe87');
  const [data, setData] = React.useState();
  const [versionData, setVersionData] = React.useState();
  const [selectedVersion, setSelectedVersion] = React.useState();

  // ===== ALERT STATES =======

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // ===== ALERT STATES =======

  const handleFetch = async () => {
    const response = await getConfigVersion(appId);
    console.log('response', response.data);
    setData(response.data);
  };

  const handleVersionApply = async (versionIndex) => {
    const userInfo = await Auth.currentAuthenticatedUser();
    const idToken = userInfo.signInUserSession.idToken.jwtToken;
    const { _id } = data;

    const versionResponse = {
      _id,
      lastUpdatedBy: userInfo.username,
      applicationName: data.applicationName,
      env: data.env,
      region: data.region,
      currentConfig: data.historyConfig[versionIndex],
    };

    const resp = await updateConfig(versionResponse, idToken);
    console.log('version resp', resp);
    if (resp.status === 200) {
      setOpen(true);
    }
  };

  return (
    <MainCard title="Rollback Configuration">
      <Stack spacing={2}>
        <FormControl>
          <TextField
            label="App Id"
            value={appId}
            onChange={(event) => setAppId(event.target.value)}
          />
        </FormControl>
        <Button variant="contained" onClick={handleFetch} disabled={!appId}>
          Fetch Config
        </Button>
      </Stack>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          {data && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead style={{ background: '#f0f0f0' }}>
                  <TableRow
                    sx={{
                      '& td, & th': { padding: '8px 16px' },
                    }}
                  >
                    <TableCell>Application Name</TableCell>
                    <TableCell>Environment</TableCell>
                    <TableCell>Region</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell>Version(s)</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!(data && data.historyConfig.length) ? (
                    data.historyConfig.map((hc, ind) => {
                      return (
                        <TableRow
                          key={`${hc.key}${ind}`}
                          sx={{
                            '& td, & th': { padding: '0 16px' },
                            '&:last-child td, &:last-child th': 0,
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {data.applicationName}
                          </TableCell>
                          <TableCell>{data.env}</TableCell>
                          <TableCell>{data.region}</TableCell>
                          <TableCell>{data.createdBy}</TableCell>
                          <TableCell>{`Version ${ind}`}</TableCell>
                          <TableCell align="center">
                            <IconButton aria-label="edit" onClick={() => setVersionData(hc)}>
                              <PreviewIcon color="success" />
                            </IconButton>
                            <Button
                              variant="contained"
                              aria-label="edit"
                              size="small"
                              onClick={() => handleVersionApply(ind)}
                            >
                              Apply
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        Nothing to show :)
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
        {versionData && (
          <Grid item xs={12} sx={{ mb: -1.25 }}>
            <pre style={{ background: '#f0f0f0' }}>{JSON.stringify(versionData, null, 2)}</pre>
          </Grid>
        )}
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Configuration version has been applied successfully!!!
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

export default VersionPage;
