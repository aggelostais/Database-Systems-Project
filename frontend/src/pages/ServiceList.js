import React, { useState, useEffect } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';


const ServiceList = () => {

    const [services, setServices] = useState({});

    useEffect(() => {
        fetchServices();
    }, []);
    
    const fetchServices = async () => {
        const res = await axios.get(`http://localhost:4000/services`);
    
        setServices(res.data);
    }
    
    const renderedServices = Object.values(services).map(service => {
        return (
            <Typography variant="body1" fontWeigh="bold" fontSize="14" component="p" key={service.service_id}>
                <ArrowForwardIosIcon style={{fontSize:'small'}}/> 
                {service.description}
            </Typography>
        );
    });

    return (
        <>

            {renderedServices}
        </>
    ) ;
}

export default ServiceList;