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
import { CONFIG_TYPES, formStyle } from './SamplePageConstants';

const SamplePage = () => {
  const [configuration, setConfiguration] = React.useState([]);
  const [appName, setAppName] = React.useState('');
  const [environment, setEnvironment] = React.useState('');
  const [configType, setConfigType] = React.useState();
  const [configKey, setConfigKey] = React.useState('');
  const [configVal, setConfigVal] = React.useState('');

  React.useEffect(() => {}, [configType]);

  const handleAppName = (event) => {
    const selectedAppName = event.target.value;
    setAppName(selectedAppName);
  };

  const handleEnvChange = (event) => {
    const selectedEnvChange = event.target.value;
    setEnvironment(selectedEnvChange);
  };

  const handleConfigTypeChange = (event) => {
    const selectedType = event.target.value;
    setConfigType(selectedType);
  };

  const handleAddConfig = () => {
    if (configKey && configVal) {
      setConfiguration([...configuration, { key: configKey, value: configVal }]);
      setConfigKey('');
      setConfigVal('');
    }
  };

  const handleDeleteConfig = ({ key }) => {
    const cloneConf = [...configuration];
    _.remove(cloneConf, (config) => {
      return config.key === key;
    });
    setConfiguration(cloneConf);
  };

  const handleSendConfiguration = () => {
    const response = {
      applicationName: appName,
      env: environment,
      createdBy: 'asingh',
      historyConfig: [],
      currentConfig: {
        0: parseConfiguration(),
      },
    };
    console.log('response', response);
  };

  const parseConfiguration = () => {
    return _.mapValues(_.keyBy(configuration, 'key'), 'value');
  };

  const handleKeyChange = (event) => {
    setConfigKey(event.target.value);
  };
  const handleValChange = (event) => {
    setConfigVal(event.target.value);
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
              isFullWidth
              onClick={handleAddConfig}
              disabled={!configKey.trim() || !configVal.trim()}
            >
              Add Property
            </Button>
          </div>
        );
      case CONFIG_TYPES.STRING:
        return (
          <Card>
            <CardHeader>
              <Button variant="contained" onClick={handleAddConfig} disabled={false}>
                Add Property
              </Button>
            </CardHeader>
            <CardContent>
              <TextAreaField label="String (Key:Value  & Comma Seperated)" margin="normal" />
            </CardContent>
          </Card>
        );
      default:
        break;
    }
  };

  const renderGeneratedConfig = () => {
    return (
      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 2, mb: 2 }} variant="h5">
              Generated Configuration(s)
            </Typography>
            {generateConfigItem()}
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              endIcon={<SendIcon />}
              disabled={!configuration.length}
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
          <TableHead style={{ background: '#1890ff' }}>
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
            {!!(configuration && configuration.length) ? (
              configuration.map((config) => (
                <TableRow
                  key={config.key}
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
              ))
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

  return (
    <MainCard title="Configuration System">
      <Stack spacing={2} sx={{ width: 300 }}>
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
            onChange={handleEnvChange}
          >
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
    </MainCard>
  );
};

export default SamplePage;
