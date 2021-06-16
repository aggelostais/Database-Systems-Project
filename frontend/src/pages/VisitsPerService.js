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

const VisitsPerService = () => {
    const classes = useStyles();

    const [stats, setStats] = useState([]);
    const [ageLow, setAgeLow] = useState(undefined);
    const [ageHigh, setAgeHigh] = useState(undefined);
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    
    const fetchStats = async () => {
        let route = `http://localhost:4000/serviceStats?`;
        if(ageLow) route += `age_low=${ageLow}&`;
        if(ageHigh) route += `age_high=${ageHigh}&`;
        if(startDate) route += `start_date=${startDate}&`;
        if(endDate) route += `end_date=${endDate}&`;

        const res = await axios.get(route);
    
        setStats(res.data);
    }

    function resetFields(){ // Clears all fields
        setAgeLow(undefined);
        setAgeHigh(undefined);
        setStartDate(undefined);
        setEndDate(undefined);
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
                Visits per Area
            </h2>

            <FormControl 
                className={classes.formControl}
                style={{ 
                  marginTop: "10px",
                  marginLeft: "30px",
                  marginRight: "30px",
                  width:"200px" }}>
              

            <TextField
                id="age_low"
                label="Minimum age"
                placeholder="(ex 20)"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => {
                    // console.log(e.target.value);
                    setAgeLow(e.target.value);
                }}
            />

            <TextField
                id="age_high"
                label="Maximum age"
                placeholder="(ex 60)"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => {
                    // console.log(e.target.value);
                    setAgeHigh(e.target.value);
                }}
            />
            <TextField
                id="start_date"
                label="From"
                type="date"
                placeholder="yyyy-mm-dd"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => {
                    // console.log(e.target.value);
                    setStartDate(e.target.value);
                }}
            />
            <TextField
                id="end_date"
                label="To"
                type="date"
                placeholder="yyyy-mm-dd"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => {
                    // console.log(e.target.value);
                    setEndDate(e.target.value);
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
                      fetchStats();
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
                {stats.length} stats found
              </Typography>
            }
        </div>
        <div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Number of visits</TableCell>
                      <TableCell align="center">Service Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats.map((stat) => (
                      <TableRow key={stat.number_of_visits + " " + stat.description}>
                        <TableCell component="th" scope="row">
                          {stat.number_of_visits}
                        </TableCell>
                        <TableCell align="center">{stat.description}</TableCell>
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

export default VisitsPerService;