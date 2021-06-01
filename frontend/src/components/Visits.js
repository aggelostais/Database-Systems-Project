import React, { useState, useEffect } from 'react';
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
  }));

const Visits = () => {
    const classes = useStyles();

    const [visits, setVisits] = useState({});
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
            <Typography variant="body2" component="p" key={visit.nfc_id + visit._from}>
                <ArrowForwardIosIcon style={{fontSize:'small'}}/> 
                {visit._from + visit._to}
            </Typography>
        );
    });

    return (
        <>
        <div>
          <h3
            type="text"
            className="text-body"
            style={{ 
                fontFamily: "Roboto",
                }}>
              Search for visits:
          </h3>
          <FormControl 
            className={classes.formControl}
            style={{ 
              marginTop: "10px",
              marginLeft: "30px",
              marginRight: "30px",
              width:"450px" }}>
            <InputLabel htmlFor="grouped-select">Service</InputLabel>

            <Select 
              defaultValue=''
              id="grouped-select"
              style={{
                width: 400,
              }}
              onChange={(e) => {setService(e.target.value)}}
            >
                <MenuItem value={1}>room booking</MenuItem>
                <MenuItem value={2}>restaurant service</MenuItem>
                <MenuItem value={3}>bar service</MenuItem>
                <MenuItem value={4}>hair salon service</MenuItem>
                <MenuItem value={5}>gym service</MenuItem>
                <MenuItem value={6}>sauna service</MenuItem>
                <MenuItem value={7}>conference room service</MenuItem>
            </Select>

            <TextField
                id="date_start"
                label="From"
                type="date"
                defaultValue="yyyy-mm-dd"
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
                defaultValue="yyyy-mm-dd"
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
                marginBottom: "10px" , 
                marginLeft: "30px",
                marginRight: "10px",
                fontWeight: "bold",
                textTransform: 'none' 
              }}
              onClick={(e) => {
                e.preventDefault();
                fetchServices();
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
        </div>
        <div
            style={{
                    maxHeight: "30vh",
                    overflowX: "hidden",
                    overflowY: "scroll",
                }}
            >
            {renderedVisits}
        </div>
        </>
    ) ;
}

export default Visits;