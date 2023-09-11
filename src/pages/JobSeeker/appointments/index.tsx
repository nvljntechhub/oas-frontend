import { Button, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { AddCircleTwoTone } from '@mui/icons-material';
import { actions, colorCodes } from 'src/utils/properties';
import { useState } from 'react';
import AddEditAppointment from './AddEditAppointment';
import { AppointmentDetails } from 'src/interfaces/appointment.interface';
import AppointmentTable from './AppointmentTable';

const AppointmentManagement = () => {
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] =
    useState<AppointmentDetails>();
  const [renderValue, setRenderValue] = useState(0);
  const [action, setAction] = useState('');

  const addAppointment = () => {
    setAction(actions.ADD);
    setIsAddEditOpen(true);
  };

  const editAppointment = (appointmentDetails: AppointmentDetails) => {
    setAppointmentDetails(appointmentDetails);
    setAction(actions.Edit);
    setIsAddEditOpen(true);
  };

  const handleClose = () => {
    setIsAddEditOpen(false);
    setRenderValue(renderValue + 1);
  };

  return (
    <>
      <Helmet>
        <title>Appointments</title>
      </Helmet>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} mb={4}>
          <Typography variant="h3">Appointment</Typography>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Button
            sx={{
              mt: { xs: 2, md: 0 },
              mb: 4,
              height: 50,
              borderRadius: '4px',
              background: colorCodes.MIDNIGHT,
              color: colorCodes.WHITE,
              '&:hover': { background: colorCodes.TUFTS_BLUE }
            }}
            variant="contained"
            disableRipple
            startIcon={<AddCircleTwoTone />}
            onClick={addAppointment}
          >
            Add Appointment
          </Button>
        </Grid>
        <Grid item xs={12}>
          <AppointmentTable
            editClick={(appointmentDetails) =>
              editAppointment(appointmentDetails)
            }
            renderValue={renderValue}
          />
        </Grid>
      </Grid>
      {isAddEditOpen && (
        <AddEditAppointment
          onClose={handleClose}
          action={action}
          open={isAddEditOpen}
          appointmentDetails={appointmentDetails}
          renderValue={renderValue}
        />
      )}
    </>
  );
};

export default AppointmentManagement;
