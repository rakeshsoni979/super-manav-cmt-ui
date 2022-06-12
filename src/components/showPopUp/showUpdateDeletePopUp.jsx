import * as React from 'react';
import _ from 'lodash';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MainCard from '../../components/MainCard';
import axios from "axios";
import { Button, Checkbox, Paper } from '@mui/material';

const constants = {
    url: "https://d0c9-2401-4900-5d12-1252-500c-a65e-75bc-54e3.in.ngrok.io/api/auth/request-access",
    header: { "Content-Type": "application/json", 'idtoken': 'eyJraWQiOiJQZXFiaElzaEQxZXNKWGZqZ21GREJWY0RyUFhtS2VmWjh5Q004OWhpam9NPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiZjY4NjdkMy0xN2VlLTQ3OGItYWFkYi1lMmE1MDE1OTUwODEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX2h6cHNPYzRzeiIsImNsaWVudF9pZCI6IjVuOGExZ2YwbDlxaTFmY2M5cmdjcDR0ZmU0Iiwib3JpZ2luX2p0aSI6ImQxODMxNTVkLTc3NmYtNDgxMi1iM2FkLWViZjQ2M2IwNGVlMyIsImV2ZW50X2lkIjoiY2IxNDM4MWEtMWVmNi00ZDdlLWE0MzMtOGVlZWMxN2YwZGQyIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1NDk2MzAxNiwiZXhwIjoxNjU0OTY2NjE2LCJpYXQiOjE2NTQ5NjMwMTYsImp0aSI6IjgxZTgwODE1LTU3MDktNDlmMi1iOGMzLThkMGNlMmU5ODllNSIsInVzZXJuYW1lIjoiYmY2ODY3ZDMtMTdlZS00NzhiLWFhZGItZTJhNTAxNTk1MDgxIn0.kqC0M2KkFjIFGRuns4VioOKDCV6DUJVOolauBFRvsTtngUN_Wokbu7wl1pU-LTzxFIjf0-Gl-YCXm9q2AWQAvB5lfqfgEsP7KU2xr_OjGyHCeKmVJo9J9ZgZfuuKVAcXBVqoCPEastuvjzXmM9tsIezm8vg3jfjEFLUxoGEPvFdtWe8CaKdExYS0ZJeM_boivMd4rTeZs8AwM6F3X75fPWlp8MTlrkFP7GOVnbGhZjreCGBoisaAfMQq59XBOT6JL9aUlr5y4V86YK3Ql7aOr6Dyk410aREp_zYwEBJ-MFSpdEsLVBBpRdbeu9vXtRP3DfdZ862nWqTPVMQnAwo7sg' },
}

const ShowUpdateDeletePopUp = () => {
    const operation = [];
    const [data, setData] = React.useState({ username: "kavi bartwal", email: "kavibartwal@gmail.com", });
    const [operations, setOperations] = React.useState({ update: false, delete: false, });
    const handleToggle = ({ target }) => setOperations((s) => ({ ...s, [target.name]: !s[target.name] }));
    const handleChange = (e) => { setData({ ...data, [e.target.username]: e.target.value }); };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const update = operations.update ? [...operation, "UPDATE"] : operation;
        const  del= operations.delete ? [...operation, "DELETE"] : operation;
        const combinedData = { accessList: [...update,...del], userId: "abc" }; axios.post(constants.url, combinedData,
            { headers: constants.header, }).
            then(response => { console.log("success", response); }).catch((error) => { console.log("failure", error); });
    };


    return (<Paper style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        verticalAlign: "middle",
        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "25px",
    }}>
        <MainCard title="Sample title">

            <Stack spacing={2} sx={{ width: 300 }}>
                <FormControl>
                    <TextField
                        required
                        id="outlined-basic"
                        label="UserName"
                        variant="outlined"
                        margin="normal"
                        value={data.username} onChange={handleChange}
                    />
                    <TextField
                        required
                        id="outlined-basic"
                        label="Email Id"
                        variant="outlined"
                        margin="normal"
                        value={data.email} onChange={handleChange}
                    />

                </FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="Update"  onClick={handleToggle} control={<Checkbox />} label="Update" />
                    <FormControlLabel value="Delete" onClick={handleToggle} control={<Checkbox />} label="Delete" />
                </RadioGroup>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Send
                </Button>
            </Stack>
        </MainCard>
    </Paper>
    );
};

export default ShowUpdateDeletePopUp;
