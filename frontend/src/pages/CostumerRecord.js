import React, { useState } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
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
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    root: {
      flexGrow: 1,
        marginTop: 100,
        marginLeft: 300,
        marginRight: 300,
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
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }));

export default function CostumerRecord () {
    const classes = useStyles();

    const [records, setRecords] = useState([]);
    const [idNumber, setIdNumber] = useState(undefined);
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [nfcId, setNfcId] = useState(undefined);
    
    const fetchRecords = async () => {
        let route = `http://localhost:4000/customerRecord?`;
        if(idNumber) route += `id_number=${idNumber}&`;
        if(firstName) route += `first_name=${firstName}&`;
        if(lastName) route += `last_name=${lastName}&`;
        if(nfcId) route += `nfc_id=${nfcId}&`;

        const res = await axios.get(route);
    
        setRecords(res.data);
    }

    function resetFields(){ // Clears all fields
        setIdNumber(undefined);
        setFirstName(undefined);
        setLastName(undefined);
        setNfcId(undefined);
    }

    return (
      <Container maxWidth="sm" className={classes.root}> 
        <Grid container spacing={2}>
          <Paper className={classes.paper}>
            <Grid item xs>
              <div>

                <h2
                  type="text"
                  className="text-body">
                    Customer's Record
                </h2>

                <FormControl 
                  className={classes.formControl}
                  style={{ 
                    marginTop: "10px",
                    marginLeft: "30px",
                    marginRight: "30px",
                    width:"200px" }}>

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
                       marginBottom: "10px", 
                       marginLeft: "10px",
                       marginRight: "10px",
                      fontWeight: "bold",
                      textTransform: 'none' 
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      fetchRecords();
                    }}>
                    Submit
                  </Button>

                  {/* Reset Button */}
                  <Button
                    type="reset"
                    variant="contained" 
                    color="secondary" 
                    style={{ 
                       marginTop: "10px", 
                       marginBottom: "10px", 
                       marginRight: "10px",
                      fontWeight: "bold",
                      textTransform: 'none' }}
                    onClick={(e) => {
                      resetFields(); // If cancel pressed, clear fields
                    }}>
                    Reset
                </Button>
              </div>
      
              <div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nfc id</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Birth Date</TableCell>
                        <TableCell align="center">ID Number</TableCell>
                        <TableCell align="center">ID Type</TableCell>
                        <TableCell align="center">Email Address</TableCell>
                        <TableCell align="center">CheckIn Time</TableCell>
                        <TableCell align="center">Total Charge</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {records.map((record) => (
                        <TableRow key={record.nfc_id + " " + record.id_number}>
                          <TableCell component="th" scope="row">
                            {record.nfc_id}
                          </TableCell>
                          <TableCell align="center">{record.first_name}</TableCell>
                          <TableCell align="center">{record.last_name}</TableCell>
                          <TableCell align="center">{record.birth_date}</TableCell>
                          <TableCell align="center">{record.id_number}</TableCell>
                          <TableCell align="center">{record.id_type}</TableCell>
                          <TableCell align="center">{record.email_address}</TableCell>
                          <TableCell align="center">{record.checkin_time}</TableCell>
                          <TableCell align="center">{record.total_charge}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
          </Grid>  
        </Paper>
      </Grid>
    </Container>
);
}