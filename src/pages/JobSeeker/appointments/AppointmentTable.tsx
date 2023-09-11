import {
  DeleteTwoTone,
  EditTwoTone,
  MoreVertTwoTone
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

export interface Props {
  editClick: (appointmentDetails: AppointmentDetails) => void;
  renderValue: number;
}

const AppointmentTable = (props: Props) => {
  const { editClick, renderValue } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [appointments, setAppointments] = useState<AppointmentDetails[]>();
  const [currentAppointment, setCurrentAppointment] =
    useState<AppointmentDetails>();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAcceptDeclineOpen, setIsAcceptDeclineOpen] = useState(false);

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

  const handleUpdate = () => {
    if (currentAppointment) editClick(currentAppointment);
    handleClose();
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
    console.log(currentAppointment);

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
                  <TableCell>Consultant</TableCell>
                  <TableCell>Job Seeker</TableCell>
                  <TableCell>Appointment Time</TableCell>
                  <TableCell align="center">Accepted Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments?.map((appointment) => {
                  return (
                    <TableRow key={appointment.appointment.id}>
                      <TableCell>
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
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {appointment?.jobSeeker?.firstName +
                            ' ' +
                            appointment?.jobSeeker?.lastName}
                        </Typography>
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
                      <TableCell>
                        <div>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleClick(event, appointment)}
                          >
                            <MoreVertTwoTone />
                          </IconButton>
                          <Menu
                            id="long-menu"
                            MenuListProps={{
                              'aria-labelledby': 'long-button'
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                          >
                            <MenuItem onClick={() => handleUpdate()}>
                              <EditTwoTone fontSize="small" />
                              <Typography
                                variant="body1"
                                sx={{
                                  textAlign: 'left',
                                  ml: 1
                                }}
                              >
                                Update
                              </Typography>
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setIsConfirmOpen(true);
                                handleClose();
                              }}
                            >
                              <DeleteTwoTone />
                              <Typography
                                variant="body1"
                                sx={{
                                  textAlign: 'left',
                                  ml: 1
                                }}
                              >
                                Delete
                              </Typography>
                            </MenuItem>
                          </Menu>
                        </div>
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
