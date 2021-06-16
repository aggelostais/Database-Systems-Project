import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
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

  export default function SalesPerService() {
    const classes = useStyles();

    const [sales, setSales] = useState([]);

    useEffect(() => {
      fetchSales();
    }, []);
    
    const fetchSales = async () => {
        let route = `http://localhost:4000/salesView`;

        const res = await axios.get(route);
    
        setSales(res.data);
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
                Sales per Service
            </h2>
        </div>

        <div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Service Description</TableCell>
                      <TableCell align="center">Sales</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sales.map((sale) => (
                      <TableRow key={sale.description}>
                        <TableCell component="th" scope="row">
                          {sale.description}
                        </TableCell>
                        <TableCell align="center">{sale.sales}</TableCell>
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