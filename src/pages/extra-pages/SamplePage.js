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

import { CONFIG_TYPES, formStyle, AWS_REGIONS } from './SamplePageConstants';
import TabPanel from './tabPanel';
import { saveConfig } from './api';
import Modal from 'react-modal';
import ShowUpdateDeletePopUp from '../../components/showPopUp/showUpdateDeletePopUp';
import { useSelector } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
  },
};

const SamplePage = () => {
  const [appName, setAppName] = React.useState('');
  const [environment, setEnvironment] = React.useState('');
  const [region, setRegion] = React.useState('ap-south-1');
  const [configType, setConfigType] = React.useState();
  const [configKey, setConfigKey] = React.useState('id');
  const [configVal, setConfigVal] = React.useState('1');
  const [configString, setConfigString] = React.useState('');
  const [userDetails, setUserDetails] = React.useState('');

  const [configurations, setConfigurations] = React.useState([]);
  const [configTabs, setConfigTabs] = React.useState([{ name: 'Config 1' }]);

  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const auth = useSelector((state) => state.auth);
  const { user: authUserDetails } = auth;

  React.useEffect(async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    setUserDetails(userInfo);
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  // ===== ALERT STATES =======

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // ===== ALERT STATES =======

  const handleTabChange = (event, newValue) => {
    setActiveTabIndex(newValue);
  };

  const handleChangeIndex = (index) => {
    setActiveTabIndex(index);
  };

  const handleAppName = (event) => {
    setAppName(event.target.value);
  };

  const handleEnvironmentChange = (event) => {
    setEnvironment(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleConfigTypeChange = (event) => {
    setConfigType(event.target.value);
  };

  const handleConfigString = (event) => {
    setConfigString(event.target.value);
  };

  const handleAddProperty = () => {
    if (configKey && configVal) {
      const newConfigs = [...configurations];
      newConfigs[activeTabIndex] = newConfigs[activeTabIndex]
        ? [...newConfigs[activeTabIndex], { key: configKey, value: configVal }]
        : [{ key: configKey, value: configVal }];

      console.log('Key-Value', newConfigs);

      setConfigurations(newConfigs);
      setConfigKey('');
      setConfigVal('');
    }
  };

  const handleAddConfigString = () => {
    if (configString) {
      const parsedConfig = configString.split(',').map((pro) => {
        const temp = pro.split(':');
        return { key: temp[0], value: temp[1] };
      });

      const newConfigs = [...configurations];
      newConfigs[activeTabIndex] = newConfigs[activeTabIndex]
        ? [...newConfigs[activeTabIndex], ...parsedConfig]
        : [...parsedConfig];

      setConfigurations(newConfigs);
    }
  };

  const handleDeleteConfig = ({ key }) => {
    const cloneConf = [...configurations[activeTabIndex]];
    _.remove(cloneConf, (config) => {
      return config.key === key;
    });
    const deepClone = [...configurations];
    deepClone[activeTabIndex] = cloneConf;
    setConfigurations(deepClone);
  };

  const handleAddMore = () => {
    setConfigTabs([...configTabs, { name: `Config ${configTabs.length + 1}` }]);
    setActiveTabIndex(configTabs.length);
  };

  const handleSendConfiguration = async () => {
    console.log('configurations', configurations);

    console.log('configTabs', configTabs);

    const response = {
      applicationName: appName,
      env: environment,
      region: environment === '*' ? '*' : region,
      createdBy: userDetails.username,
      // historyConfig: [], // Don't send for create.
      currentConfig: parseConfiguration(),
    };
    const resp = await saveConfig(response);
    if (resp.status === 200) {
      setOpen(true);
    }
  };

  const parseConfiguration = () => {
    const finalConfigs = {};
    configurations.forEach((conf, seq) => {
      finalConfigs[seq] = _.mapValues(_.keyBy(conf, 'key'), 'value');
    });

    return finalConfigs;
  };

  const handleKeyChange = (event) => {
    setConfigKey(event.target.value);
  };
  const handleValChange = (event) => {
    setConfigVal(event.target.value);
  };

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  };

  const renderConfigForm = () => {
    switch (configType) {
      case CONFIG_TYPES.KEY_VALUE:
        return (
          <div style={formStyle}>
            <TextField
              autoComplete="off"
              label="Key"
              margin="dense"
              value={configKey}
              onChange={handleKeyChange}
              required
            />
            <TextField
              label="Value"
              margin="dense"
              value={configVal}
              onChange={handleValChange}
              required
            />
            <Button
              variant="contained"
              onClick={handleAddProperty}
              disabled={!configKey.trim() || !configVal.trim()}
            >
              Add Property
            </Button>
          </div>
        );
      case CONFIG_TYPES.STRING:
        return (
          <Card>
            <CardContent>
              <TextAreaField
                value={configString}
                onChange={handleConfigString}
                label="String (Key:Value  & Comma Seperated)"
                margin="normal"
              />
            </CardContent>
            <Button
              sx={{ ml: 2, mb: 2 }}
              variant="contained"
              onClick={handleAddConfigString}
              disabled={!configString.trim()}
            >
              Add Configuration
            </Button>
          </Card>
        );
      default:
        break;
    }
  };

  const renderGeneratedConfig = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '8px 0',
              }}
            >
              <Typography sx={{ mt: 2, mb: 2 }} variant="h5">
                Generated Configuration(s)
              </Typography>
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                endIcon={<AddCircleIcon />}
                onClick={handleAddMore}
              >
                Add More Configurations
              </Button>
            </div>
            {renderConfigTabs()}
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              endIcon={<SendIcon />}
              disabled={!configurations.length}
              onClick={handleSendConfiguration}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const generateConfigItem = () => {
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead style={{ background: '#f0f0f0' }}>
            <TableRow
              sx={{
                '& td, & th': { padding: '8px 16px' },
              }}
            >
              <TableCell>Key</TableCell>
              <TableCell align="left">Value</TableCell>
              <TableCell align="center" colSpan={2}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!(configurations[activeTabIndex] && configurations[activeTabIndex].length) ? (
              configurations[activeTabIndex].map((config, ind) => {
                return (
                  <TableRow
                    key={`${config.key}${ind}`}
                    sx={{
                      '& td, & th': { padding: '0 16px' },
                      '&:last-child td, &:last-child th': 0,
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {config.key}
                    </TableCell>
                    <TableCell align="left">{config.value}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="edit" disabled>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">
                      <IconButton aria-label="delete" onClick={() => handleDeleteConfig(config)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  Please add some configurations.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderConfigTabs = () => {
    return (
      <div>
        <AppBar position="static">
          <Tabs
            value={activeTabIndex}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {configTabs.map((ct, ci) => {
              return <Tab key={ct.name} label={`${ct.name}`} {...a11yProps(ci)} />;
            })}
          </Tabs>
        </AppBar>
        <SwipeableViews axis={'x'} index={activeTabIndex} onChangeIndex={handleChangeIndex}>
          {configTabs.map((ct, ci) => {
            return (
              <TabPanel key={ct.name} value={activeTabIndex} index={ci}>
                {generateConfigItem()}
              </TabPanel>
            );
          })}
        </SwipeableViews>
      </div>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ShowUpdateDeletePopUp
          region={region}
          closeModalPopUp={closeModal}
          userDetails={userDetails}
        ></ShowUpdateDeletePopUp>
      </Modal>
    );
  };

  const renderAccessButton = () => {
    return (
      <FormControl sx={{ width: '250px' }}>
        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={openModal}>
          Request Access
        </Button>
      </FormControl>
    );
  };

  return (
    <MainCard title="Configuration System">
      <div
        style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: '10px' }}
      >
        <FormControl sx={{ width: '300px' }}>
          <InputLabel id="demo-simple-select-label">Region</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            required
            value={region}
            label="Region"
            onChange={handleRegionChange}
          >
            {AWS_REGIONS.map((r) => {
              return (
                <MenuItem key={r.value} value={r.value}>
                  {r.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {renderAccessButton()}
        {renderModal()}
      </div>
      <hr />
      <Stack spacing={2}>
        <FormControl>
          <TextField
            required
            id="outlined-basic"
            label="Application Name"
            variant="outlined"
            margin="normal"
            value={appName}
            onChange={handleAppName}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Environment</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            required
            value={environment}
            label="Environment"
            onChange={handleEnvironmentChange}
          >
            <MenuItem value={'*'}>Common</MenuItem>
            <MenuItem value={'ftr'}>Feature</MenuItem>
            <MenuItem value={'qat'}>Testing</MenuItem>
            <MenuItem value={'prod'}>Production</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Configuration Type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={configType}
            onChange={handleConfigTypeChange}
          >
            <FormControlLabel
              value={CONFIG_TYPES.KEY_VALUE}
              control={<Radio />}
              label="Key-Value"
            />
            <FormControlLabel value={CONFIG_TYPES.STRING} control={<Radio />} label="String" />
            <FormControlLabel value={CONFIG_TYPES.JSON} disabled control={<Radio />} label="JSON" />
          </RadioGroup>
        </FormControl>
      </Stack>
      {configType && renderConfigForm()}
      {configType && renderGeneratedConfig()}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Configuration has been Added successfully!!!
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

export default SamplePage;
