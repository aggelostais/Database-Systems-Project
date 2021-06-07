import React, { useState } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    textField: {
        marginTop: 7,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
      table: {
        minWidth: 650,
      },
  }));

const Trace = () => {
    const classes = useStyles();

    const [trace, setTrace] = useState([]);
    const [idNumber, setIdNumber] = useState(undefined);
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [nfcId, setNfcId] = useState(undefined);
    
    const fetchTrace = async () => {
        let route = `http://localhost:4000/trace?`;
        if(idNumber) route += `id_number=${idNumber}&`;
        if(firstName) route += `first_name=${firstName}&`;
        if(lastName) route += `last_name=${lastName}&`;
        if(nfcId) route += `nfc_id=${nfcId}&`;

        const res = await axios.get(route);
    
        setTrace(res.data);
    }

    function resetFields(){ // Clears all fields
        setIdNumber(undefined);
        setFirstName(undefined);
        setLastName(undefined);
        setNfcId(undefined);
    }

    return (
        <>
        <div>
          <h3
            type="text"
            className="text-body"
            style={{ 
                fontFamily: "Roboto",
                }}>
              Get customer's trace:
          </h3>
          <FormControl 
            className={classes.formControl}
            style={{ 
              marginTop: "10px",
              marginLeft: "30px",
              marginRight: "30px",
              width:"450px" }}>

            <TextField
                id="id_number"
                label="ID Number"
                placeholder="(ex 12345678 9012)"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => {
                    // console.log(e.target.value);
                    setIdNumber(e.target.value);
                }}
            />

            <TextField
                id="first_name"
                label="First Name"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => {
                    // console.log(e.target.value);
                    setFirstName(e.target.value);
                }}
            />
            <TextField
                id="last_name"
                label="Last Name"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => {
                    // console.log(e.target.value);
                    setLastName(e.target.value);
                }}
            />

            <TextField
                id="nfc_id"
                label="Nfc id"
                placeholder="(ex 6)"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => {
                    // console.log(e.target.value);
                    setNfcId(e.target.value);
                }}
            />
          </FormControl>

          {/* Submit Button */}
          <Button
              variant="contained" 
              color="primary" 
              style={{ 
                marginTop: "10px", 
                marginBottom: "10px" , 
                marginLeft: "30px",
                marginRight: "10px",
                fontWeight: "bold",
                textTransform: 'none' 
              }}
              onClick={(e) => {
                e.preventDefault();
                fetchTrace();
              }}
            >
              Submit
            </Button>

            {/* Reset Button */}
            <Button
              type="reset"
              variant="contained" 
              color="secondary" 
              style={{ 
                marginTop: "10px", 
                marginBottom: "10px" , 
                marginRight: "10px",
                fontWeight: "bold",
                textTransform: 'none' }}
              onClick={(e) => {
                resetFields() // If cancel pressed, clear fields
              }}
            >
              Reset
            </Button>

            {
              <Typography>
                {trace.length} events found
              </Typography>
            }
        </div>
        <div
            style={{
                    maxHeight: "30vh",
                    overflowX: "hidden",
                    overflowY: "scroll",
                }}
            >
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nfc id</TableCell>
                      <TableCell align="center">First Name</TableCell>
                      <TableCell align="center">Last Name</TableCell>
                      <TableCell align="center">ID Number</TableCell>
                      <TableCell align="center">Area id</TableCell>
                      <TableCell align="center">Area name</TableCell>
                      <TableCell align="center">Entered</TableCell>
                      <TableCell align="center">Exited</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trace.map((trace_event) => (
                      <TableRow key={trace_event.nfc_id + " " + trace_event.area_name + " " + trace_event._from}>
                        <TableCell component="th" scope="row">
                          {trace_event.nfc_id}
                        </TableCell>
                        <TableCell align="center">{trace_event.first_name}</TableCell>
                        <TableCell align="center">{trace_event.last_name}</TableCell>
                        <TableCell align="center">{trace_event.id_number}</TableCell>
                        <TableCell align="center">{trace_event.area_id}</TableCell>
                        <TableCell align="center">{trace_event.area_name}</TableCell>
                        <TableCell align="center">{trace_event._from}</TableCell>
                        <TableCell align="center">{trace_event._to}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
        </div>
        </>
    ) ;
}

export default Trace;