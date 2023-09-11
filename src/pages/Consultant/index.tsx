import { Grid } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Dashboard from './Dashboard';

type Props = {};

const ConsultantDashboard = (props: Props) => {
  return (
    <>
      <Helmet>
        <title> Dashboard</title>
      </Helmet>
      <Grid container>
        <Dashboard />
      </Grid>
    </>
  );
};

export default ConsultantDashboard;
