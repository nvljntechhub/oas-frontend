import {
  DeleteTwoTone,
  EditTwoTone,
  MoreVertTwoTone,
  SearchTwoTone
} from '@mui/icons-material';
import {
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Chip
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Confirm from 'src/components/Confirm';
import { AppointmentDetails } from 'src/interfaces/appointment.interface';
import {
  acceptAppointment,
  declineAppointment,
  deleteAppointment,
  listAppointment
} from 'src/services/appointment.service';
import { getTimeFormat } from 'src/utils/function.util';
import AcceptOrDecline from './AcceptDecline';
import { NavLink as RouterLink } from 'react-router-dom';

export interface Props {}

const AppointmentTable = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [appointments, setAppointments] = useState<AppointmentDetails[]>();
  const [currentAppointment, setCurrentAppointment] =
    useState<AppointmentDetails>();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAcceptDeclineOpen, setIsAcceptDeclineOpen] = useState(false);
  const [renderValue, setRenderValue] = useState(0);

  //Menu States
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    appointmentDetails: AppointmentDetails
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentAppointment(appointmentDetails);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClose = () => {
    setIsAcceptDeclineOpen(false);
  };

  useEffect(() => {
    list();
  }, [renderValue]);

  const list = async () => {
    listAppointment().then(
      (response: any) => {
        console.log('response', response);

        setAppointments(response);
        // setcount(response.total);
      },
      (error) => {
        // const errmsg = errorHandler(error);
        // if (error.response.data) {
        //   enqueueSnackbar(errorMessages.SESSION_EXPIRED, {
        //     variant: 'info'
        //   });
        //   localStorage.clear();
        //   navigate(routeURL.LOGIN);
        // } else if (error.data) {
        //   enqueueSnackbar(errmsg, {
        //     variant: 'error'
        //   });
        // }
      }
    );
  };

  const handleAccept = () => {
    console.log(currentAppointment);

    acceptAppointment(currentAppointment?.appointment.id).then(
      (response: any) => {
        setIsConfirmOpen(false);
        list();
        enqueueSnackbar(response.Status, { variant: 'success' });
      },
      (error) => {
        console.log('error', error);
      }
    );
  };

  const handleDecline = () => {
    declineAppointment(currentAppointment?.appointment.id).then(
      (response: any) => {
        setIsConfirmOpen(false);
        list();
        enqueueSnackbar(response.Status, { variant: 'success' });
      },
      (error) => {
        console.log('error', error);
      }
    );
  };

  const handleDelete = async () => {
    deleteAppointment(currentAppointment?.appointment.id).then(
      (response: any) => {
        setIsConfirmOpen(false);
        list();
        enqueueSnackbar(response.Status, { variant: 'success' });
      },
      (error) => {
        console.log('error', error);
      }
    );
  };

  return (
    <>
      <>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Consultant</TableCell>
                  <TableCell align="center">Job Seeker</TableCell>
                  <TableCell>Appointment Time</TableCell>
                  <TableCell align="center">Accepted Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments?.map((appointment) => {
                  return (
                    <TableRow key={appointment.appointment.id}>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {appointment?.consultant?.firstName +
                            ' ' +
                            appointment?.consultant?.lastName}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: '#000000'
                            },
                            color: '#ffffff',
                            background: '#959595',
                            // height: 50,
                            // width: '54px'
                            borderRadius: 2,
                            fontSize: '15px',
                            width: '200px'
                          }}
                          component={RouterLink}
                          to="appointment/job-seeker/view"
                        >
                          {appointment?.jobSeeker?.firstName +
                            ' ' +
                            appointment?.jobSeeker?.lastName}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {getTimeFormat(
                          appointment?.appointment.appointmentTime,
                          'datetime'
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={
                            appointment?.appointment.isAccepted
                              ? 'Accepted'
                              : appointment?.appointment.isDeclined
                              ? 'Declined'
                              : 'Pending'
                          }
                          color={
                            appointment?.appointment.isAccepted
                              ? 'success'
                              : appointment?.appointment.isDeclined
                              ? 'error'
                              : 'info'
                          }
                          onClick={() => {
                            if (
                              !appointment?.appointment.isDeclined &&
                              !appointment?.appointment.isAccepted
                            ) {
                              setCurrentAppointment(appointment);
                              setIsAcceptDeclineOpen(true);
                            } else if (appointment?.appointment.isAccepted) {
                              enqueueSnackbar(
                                'Cannot edit accepted appointment',
                                {
                                  variant: 'info'
                                }
                              );
                            } else {
                              enqueueSnackbar(
                                'Cannot edit declined appointment',
                                {
                                  variant: 'info'
                                }
                              );
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            {/* <TablePagination
              component="div"
              count={count}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={pageOptions}
            /> */}
          </Box>
          <Confirm
            open={isConfirmOpen}
            onClose={onClose}
            type="Delete"
            onSubmit={handleDelete}
          />
          <AcceptOrDecline
            open={isAcceptDeclineOpen}
            onClose={onClose}
            type="Accept"
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        </Card>
      </>
    </>
  );
};

export default AppointmentTable;
