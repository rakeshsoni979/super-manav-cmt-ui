import * as React from "react";
import _ from "lodash";
import { Alert, Snackbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeAuthApi } from "../extra-pages/api";

export default function PendingRequest() {
  const [data, setData] = React.useState([]);
  const [alert, setAlert] = React.useState();
  const [actionLoading, setActionLoading] = React.useState();

  React.useEffect(() => {
    loadPendingRequest();
  }, []);

  const loadPendingRequest = async () => {
    const response = await makeAuthApi({
      api: "admin/pending-access-request"
    });
    console.log("response", response.data);
    setData(response.data);
  };

  const approveRequest = (req) => {
    setActionLoading(req._id);
    makeAuthApi({
      api: "admin/approve-access-request",
      data: {
        requestId: req._id
      },
      method: "POST"
    })
      .then(() => {
        setAlert({
          severity: "success",
          message: "Request approved successfully!!!"
        });
        loadPendingRequest();
      })
      .catch(() => {
        setAlert({ severity: "error", message: "error in aprove request" });
      })
      .then(() => {
        setActionLoading(false);
      });
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <h4>Pending access request (visible to admin only)</h4>
        {alert && (
          <Snackbar
            open={!!alert}
            autoHideDuration={3000}
            onClose={() => setAlert()}
          >
            <Alert
              onClose={() => setAlert()}
              severity={alert.severity}
              sx={{ width: "100%" }}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        )}

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead style={{ background: "#f0f0f0" }}>
              <TableRow
                sx={{
                  "& td, & th": { padding: "8px 16px" }
                }}
              >
                <TableCell>UserId</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Env</TableCell>
                <TableCell>AppId</TableCell>
                <TableCell>Access</TableCell>
                <TableCell>Created on</TableCell>
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
                        "& td, & th": { padding: "0 16px" },
                        "&:last-child td, &:last-child th": 0
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {cd.userId}
                      </TableCell>
                      <TableCell>{cd.forRegion}</TableCell>
                      <TableCell>{cd.forEnv}</TableCell>
                      <TableCell>{cd.forAppId}</TableCell>
                      <TableCell>{(cd.accessList || []).join(",")}</TableCell>
                      <TableCell>
                        {new Date(cd.createdAt).toLocaleDateString() +
                          " - " +
                          new Date(cd.createdAt).toLocaleTimeString()}
                      </TableCell>
                      <TableCell align="center">
                        {actionLoading === cd._id ? (
                          <span>working</span>
                        ) : (
                          <IconButton
                            aria-label="edit"
                            onClick={() => approveRequest(cd)}
                          >
                            Approve
                          </IconButton>
                        )}
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
    </Grid>
  );
}
