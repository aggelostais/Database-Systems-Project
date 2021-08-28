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
import Container from '@material-ui/core/Container';
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


export default function CovidMatches() {
    const classes = useStyles();

    const [matches, setMatches] = useState([]);
    const [idNumber, setIdNumber] = useState(undefined);
    const [nfcId, setNfcId] = useState(undefined);
    
    const fetchMatches = async () => {
        let route = `http://localhost:4000/checkCovid?`;
        if(idNumber) route += `id_number=${idNumber}&`;
        if(nfcId) route += `nfc_id=${nfcId}&`;

        const res = await axios.get(route);
    
        setMatches(res.data);
    }

    function resetFields(){ // Clears all fields
        setIdNumber(undefined);
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
                  Covid Matches
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
                      fetchMatches();
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

            {
              <Typography>
                {matches.length} matches found
              </Typography>
            }
        </div>
        <div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nfc id 1</TableCell>
                      <TableCell align="center">Area id 1</TableCell>
                      <TableCell align="center">Entered 1</TableCell>
                      <TableCell align="center">Exited 1</TableCell>
                      <TableCell align="center">Nfc id 2</TableCell>
                      {matches.length > 0 && matches[0].id_number &&
                        <>
                          <TableCell align="center">ID Number</TableCell>
                        </>
                      }
                      <TableCell align="center">Area id 2</TableCell>
                      <TableCell align="center">Entered 2</TableCell>
                      <TableCell align="center">Exited 2</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {matches.map((match) => (
                      <TableRow key={match.nfc_id_1 + " " + match.area_id_1 + " " + match.from_1}>
                        <TableCell component="th" scope="row">
                          {match.nfc_id_1}
                        </TableCell>
                        <TableCell align="center">{match.area_id_1}</TableCell>
                        <TableCell align="center">{match.from_1}</TableCell>
                        <TableCell align="center">{match.to_1}</TableCell>
                        <TableCell align="center">{match.nfc_id_2}</TableCell>
                        {matches.length > 0 && matches[0].id_number &&
                            <>
                            <TableCell align="center">{match.id_number}</TableCell>
                            </>
                        }
                        <TableCell align="center">{match.area_id_2}</TableCell>
                        <TableCell align="center">{match.from_2}</TableCell>
                        <TableCell align="center">{match.to_2}</TableCell>
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
    ) ;
}