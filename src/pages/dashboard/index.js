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
import { DASH_BOARD_URL } from '../extra-pages/api';
import axios from 'axios';
import EditConfig from '../extra-pages/editConfig';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = ({ signOut, user }) => {
  const [data, setData] = React.useState([]);
  const [editingData, setEditingData] = React.useState(null);

  React.useEffect(async () => {
    const response = await axios.get(`${DASH_BOARD_URL}?region=ap-south-1`);
    setData(response.data);
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Configuration List
        </Typography>
        <TableContainer component={Paper}>
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
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!(data && data.length) ? (
                data.map((cd, ind) => {
                  return (
                    <TableRow
                      key={`${cd.key}${ind}`}
                      sx={{
                        '& td, & th': { padding: '0 16px' },
                        '&:last-child td, &:last-child th': 0,
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {cd.applicationName}
                      </TableCell>
                      <TableCell>{cd.env}</TableCell>
                      <TableCell>{cd.region}</TableCell>
                      <TableCell>{cd.createdBy}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="edit" onClick={() => setEditingData(cd)}>
                          <EditIcon />
                        </IconButton>
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
      </Grid>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        {editingData && <EditConfig editConfigData={editingData} />}
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
