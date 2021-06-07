import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ServiceList from '../components/ServiceList';
import Visits from "../components/Visits";
import Trace from "../components/Trace";
import CheckCovid from "../components/CheckCovid";

export default function Home() {

  return (
    <Container maxWidth="md">

      <div>
        <h1
          type="text"
          className="text-body"
          style={{ 
            fontFamily: "Roboto", 
            marginTop:"100px",
            marginBottom:"50px"}}>
          Welcome to our Hotel
        </h1>
      </div>

      <div>
          <h3
            type="text"
            className="text-body"
            style={{ 
                fontFamily: "Roboto", 
                marginTop:"100px",
                marginBottom:"50px"}}>
              Our services:
          </h3>
      </div>      
      <ServiceList />
      <Visits/>
      <Trace/>
      <CheckCovid/>

    </Container>
    );
  }


