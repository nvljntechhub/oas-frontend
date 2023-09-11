import { Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import AppointmentTable from './AppointmentTable';

const AppointmentManagement = () => {
  return (
    <>
      <Helmet>
        <title>Appointments</title>
      </Helmet>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} mb={4}>
          <Typography variant="h3">Appointment</Typography>
        </Grid>
        <Grid item xs={12}>
          <AppointmentTable />
        </Grid>
      </Grid>
    </>
  );
};

export default AppointmentManagement;
