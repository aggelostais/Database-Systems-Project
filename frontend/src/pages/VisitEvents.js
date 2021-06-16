import React, { useState} from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'; 
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

export default function VisitEvents() {
    const classes = useStyles();

    const [visits, setVisits] = useState([]);
    const [service, setService] = useState(undefined);
    const [dateStart, setDateStart] = useState(undefined);
    const [dateEnd, setDateEnd] = useState(undefined);
    const [costLow, setCostLow] = useState(undefined);
    const [costHigh, setCostHigh] = useState(undefined);
    
    const fetchServices = async () => {
        let route = `http://localhost:4000/visits?`;
        if(service) route += `service_id=${service}&`;
        if(dateStart) route += `date_start=${dateStart}&`;
        if(dateEnd) route += `date_end=${dateEnd}&`;
        if(costLow) route += `cost_low=${costLow}&`;
        if(costHigh) route += `cost_high=${costHigh}&`;

        const res = await axios.get(route);
    
        setVisits(res.data);
    }

    function resetFields(){ // Clears all fields
        setService(undefined);
        setDateStart(undefined);
        setDateEnd(undefined);
        setCostLow(undefined);
        setCostHigh(undefined);
    }
    
    const renderedVisits = Object.values(visits).map(visit => {
        return (
            <Typography variant="body2" component="p" key={visit.nfc_id + " " + visit.area_name + " " + visit._from}>
                <ArrowForwardIosIcon style={{fontSize:'small'}}/> 
                {visit.area_name + " " + visit._from + " " + visit._to}
            </Typography>
        );
    });

    return (
        
    <Container maxWidth="sm" className={classes.root}> 
    <Grid container spacing={2}>
      <Paper className={classes.paper}>
        <Grid item xs>
          <div>

            <h2
              type="text"
              className="text-body">
                Visit Events
            </h2>

            <FormControl 
                  className={classes.formControl}
                  style={{ 
                    marginTop: "10px",
                    marginLeft: "30px",
                    marginRight: "30px",
                    width:"200px" }}>

            <InputLabel htmlFor="grouped-select">Service</InputLabel>

            <Select 
              defaultValue=''
              id="grouped-select"
               InputLabelProps={{
                shrink: true,
                }}
              className={classes.textField}
              style={{
                textAlign:"left"
              }}
              onChange={(e) => {setService(e.target.value)}}

            >
                <MenuItem value={1}>Room Booking</MenuItem>
                <MenuItem value={2}>Restaurant</MenuItem>
                <MenuItem value={3}>Bar</MenuItem>
                <MenuItem value={4}>Hair Salon</MenuItem>
                <MenuItem value={5}>Gym</MenuItem>
                <MenuItem value={6}>Sauna</MenuItem>
                <MenuItem value={7}>Conference Room</MenuItem>
            </Select>

            <TextField
                id="date_start"
                label="From"
                type="date"
                placeholder="yyyy-mm-dd"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => {
                    // console.log(e.target.value);
                    setDateStart(e.target.value);
                }}
            />
            <TextField
                id="date_end"
                label="To"
                type="date"
                placeholder="yyyy-mm-dd"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => {
                    // console.log(e.target.value);
                    setDateEnd(e.target.value);
                }}
            />

            <TextField
                id="cost_low"
                label="cost_low"
                placeholder="(ex 13.45)"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => {
                    // console.log(e.target.value);
                    setCostLow(e.target.value);
                }}
            />
            <TextField
                id="cost_high"
                label="cost_high"
                placeholder="(ex 30.20)"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => {
                    // console.log(e.target.value);
                    setCostHigh(e.target.value);
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
                      fetchServices();
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
                {visits.length} events found
              </Typography>
            }
        </div>
        <div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>nfc_id</TableCell>
                      <TableCell align="center">area_name</TableCell>
                      <TableCell align="center">from</TableCell>
                      <TableCell align="center">to</TableCell>
                      {visits.length > 0 && visits[0].amount &&
                        <>
                          <TableCell align="center">charge amount</TableCell>
                          <TableCell align="center">charge description</TableCell>
                        </>
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {visits.map((visit) => (
                      <TableRow key={visit.nfc_id + " " + visit.area_name + " " + visit._from}>
                        <TableCell component="th" scope="row">
                          {visit.nfc_id}
                        </TableCell>
                        <TableCell align="center">{visit.area_name}</TableCell>
                        <TableCell align="center">{visit._from}</TableCell>
                        <TableCell align="center">{visit._to}</TableCell>
                        {visit.amount &&
                          <>
                            <TableCell align="center">{visit.amount}</TableCell>
                            <TableCell align="center">{visit.charge_description}</TableCell>
                          </>
                        }
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