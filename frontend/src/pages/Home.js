import React from "react";
import Container from '@material-ui/core/Container';
import ServiceList from "./ServiceList"

export default function Home() {

  return (
    <Container maxWidth="md">

      <div>
        <h1
          type="text"
          className="text-body"
          style={{ 
            marginTop:"100px",
            marginBottom:"50px"}}>
          Welcome to our Hotel!
        </h1>
        <h2
          type="text"
          className="text-body">
            Our Services:
            <ServiceList></ServiceList>
        </h2>
      
      </div>
 
    </Container>
    );
  }


