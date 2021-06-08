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

const SalesView = () => {
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
        <>
        <div>
          <h3
            type="text"
            className="text-body"
            style={{ 
                fontFamily: "Roboto",
                }}>
              Sales per Service:
          </h3>
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
        </>
    ) ;
}

export default SalesView;